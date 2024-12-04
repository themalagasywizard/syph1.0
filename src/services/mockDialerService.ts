interface MockCall {
  id: string;
  status: 'idle' | 'dialing' | 'connected' | 'ended';
  startTime: number | null;
  duration: number;
  isMuted: boolean;
}

class MockDialerService {
  private activeCall: MockCall | null = null;
  private timer: number | null = null;

  async makeCall(phoneNumber: string): Promise<void> {
    if (!phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      throw new Error('Invalid phone number format');
    }

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.activeCall = {
      id: crypto.randomUUID(),
      status: 'connected',
      startTime: Date.now(),
      duration: 0,
      isMuted: false
    };

    // Start duration timer
    this.timer = window.setInterval(() => {
      if (this.activeCall) {
        this.activeCall.duration = Math.floor((Date.now() - this.activeCall.startTime!) / 1000);
      }
    }, 1000);
  }

  async endCall(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    if (this.activeCall) {
      this.activeCall.status = 'ended';
      this.activeCall = null;
    }
  }

  async mute(): Promise<void> {
    if (this.activeCall) {
      this.activeCall.isMuted = true;
    }
  }

  async unmute(): Promise<void> {
    if (this.activeCall) {
      this.activeCall.isMuted = false;
    }
  }

  isCallActive(): boolean {
    return this.activeCall?.status === 'connected';
  }

  getCallDuration(): string {
    if (!this.activeCall) return '00:00';
    const minutes = Math.floor(this.activeCall.duration / 60);
    const seconds = this.activeCall.duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  cleanup(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.activeCall = null;
  }
}

export const mockDialerService = new MockDialerService();