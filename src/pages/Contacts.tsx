import { useState } from 'react';
import { useProspects } from '../hooks/useProspects';
import ContactList from '../components/crm/ContactList';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Contacts() {
  const { prospects, loading, error } = useProspects();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    total: prospects?.length || 0,
    leads: prospects?.filter(p => p.lead_status === 'lead').length || 0,
    prospects: prospects?.filter(p => p.lead_status === 'prospect').length || 0,
    customers: prospects?.filter(p => p.lead_status === 'customer').length || 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error loading contacts: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Contacts</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Leads</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.leads}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Prospects</p>
          <p className="text-2xl font-bold text-blue-600">{stats.prospects}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="text-2xl font-bold text-green-600">{stats.customers}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search contacts..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contact List */}
      <ContactList prospects={prospects} searchQuery={searchQuery} />
    </div>
  );
}