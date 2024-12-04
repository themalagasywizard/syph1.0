import { useState } from 'react';
import UserSettings from '../components/settings/UserSettings';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <UserSettings />
      </div>
    </div>
  );
}