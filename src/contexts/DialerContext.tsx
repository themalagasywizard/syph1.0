import { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { Contact } from '../types';
import { mockDialerService } from '../services/mockDialerService';

interface CallState {
  status: 'idle' | 'dialing' | 'connected' | 'ended';
  startTime: number | null;
  duration: string;
  isMuted: boolean;
}

interface CallLog {
  type: string;
  date: string;
  duration: string;
  notes: string;
  outcome: string;
  nextSteps: string;
  followUp?: {
    date: string;
    type: string;
  };
}

interface DialerContextType {
  isCallActive: boolean;
  currentCall: Contact | null;
  lastCall: Contact | null;
  callQueue: Contact[];
  callState: CallState;
  startCall: (contact: Contact) => Promise<void>;
  endCall: (callLog?: CallLog) => Promise<void>;
  toggleMute: () => Promise<void>;
}

const DialerContext = createContext<DialerContextType | undefined>(undefined);

export function DialerProvider({ children }: { children: ReactNode }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentCall, setCurrentCall] = useState<Contact | null>(null);
  const [lastCall, setLastCall] = useState<Contact | null>(null);
  const [callQueue] = useState<Contact[]>([]);
  const [callState, setCallState] = useState<CallState>({
    status: 'idle',
    startTime: null,
    duration: '00:00',
    isMuted: false
  });

  const timerRef = useRef<number>();

  const startCall = useCallback(async (contact: Contact) => {
    try {
      setIsCallActive(true);
      setCurrentCall(contact);
      setCallState({
        status: 'dialing',
        startTime: Date.now(),
        duration: '00:00',
        isMuted: false
      });

      await mockDialerService.makeCall(contact.phone.primary);

      setCallState(prev => ({
        ...prev,
        status: 'connected'
      }));

      timerRef.current = window.setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: mockDialerService.getCallDuration()
        }));
      }, 1000);
    } catch (error) {
      console.error('Error starting call:', error);
      setCallState(prev => ({
        ...prev,
        status: 'idle'
      }));
      setIsCallActive(false);
    }
  }, []);

  const endCall = useCallback(async (callLog?: CallLog) => {
    try {
      await mockDialerService.endCall();

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (currentCall && callLog) {
        const history = currentCall.history || { calls: [], emails: [], meetings: [] };
        
        const newCall = {
          date: new Date(),
          duration: parseInt(callState.duration.split(':')[0]) * 60 + parseInt(callState.duration.split(':')[1]),
          outcome: callLog.outcome,
          notes: callLog.notes
        };

        const updatedCall = {
          ...currentCall,
          history: {
            ...history,
            calls: [newCall, ...history.calls]
          },
          engagement: {
            ...currentCall.engagement,
            lastContactedAt: new Date(),
            nextFollowUp: callLog.followUp ? new Date(callLog.followUp.date) : undefined
          }
        };

        setLastCall(updatedCall);
        setCurrentCall(updatedCall);
      }

      setCallState(prev => ({
        ...prev,
        status: 'ended',
        isMuted: false
      }));
      setIsCallActive(false);
    } catch (error) {
      console.error('Error ending call:', error);
    }
  }, [currentCall, callState.duration]);

  const toggleMute = useCallback(async () => {
    try {
      if (callState.isMuted) {
        await mockDialerService.unmute();
      } else {
        await mockDialerService.mute();
      }
      
      setCallState(prev => ({
        ...prev,
        isMuted: !prev.isMuted
      }));
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }, [callState.isMuted]);

  return (
    <DialerContext.Provider
      value={{
        isCallActive,
        currentCall,
        lastCall,
        callQueue,
        callState,
        startCall,
        endCall,
        toggleMute,
      }}
    >
      {children}
    </DialerContext.Provider>
  );
}

export function useDialerContext() {
  const context = useContext(DialerContext);
  if (context === undefined) {
    throw new Error('useDialerContext must be used within a DialerProvider');
  }
  return context;
}

export type { Contact, CallState, DialerContextType, CallLog };