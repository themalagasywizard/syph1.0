import { PhoneIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Contact } from '../../lib/db';

interface LastActivityPanelProps {
  lastCall: Contact | null;
}

export default function LastActivityPanel({ lastCall }: LastActivityPanelProps) {
  if (!lastCall || !lastCall.history?.calls.length) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No recent activity
      </div>
    );
  }

  const lastInteraction = lastCall.history.calls[0];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Last Activity</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{lastCall.firstName} {lastCall.lastName}</p>
              <p className="text-sm text-gray-500">{lastCall.company}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            lastInteraction.outcome.toLowerCase().includes('positive')
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {lastInteraction.outcome}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            Duration: {Math.floor(lastInteraction.duration / 60)}:{(lastInteraction.duration % 60).toString().padStart(2, '0')}
          </div>
          <p className="text-sm">{lastInteraction.notes}</p>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          {lastInteraction.date.toLocaleString()}
        </div>
      </div>
    </div>
  );
}