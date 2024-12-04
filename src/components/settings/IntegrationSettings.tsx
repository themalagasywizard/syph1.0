import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import { useCRMContext } from '../../contexts/CRMContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  CircleStackIcon,
} from '@heroicons/react/24/solid';

export default function IntegrationSettings() {
  const { contacts: internalContacts } = useCRMContext();

  return (
    <div className="space-y-6">
      {/* Internal CRM Status */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CircleStackIcon className="h-6 w-6 text-blue-500" />
            <div>
              <Title>Internal CRM</Title>
              <p className="text-sm text-gray-500">Built-in contact management system</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span className="text-green-700">Active</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            {internalContacts?.length || 0} contacts stored locally
          </p>
        </div>
      </Card>
    </div>
  );
}