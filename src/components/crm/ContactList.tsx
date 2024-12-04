import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialerContext } from '../../contexts/DialerContext';
import { 
  PhoneIcon, 
  EnvelopeIcon,
  PencilIcon,
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import ContactForm from './ContactForm';
import ContactDetailModal from './ContactDetailModal';
import type { Prospect } from '../../types/prospect';

interface ContactListProps {
  prospects: Prospect[];
  searchQuery: string;
}

export default function ContactList({ prospects, searchQuery }: ContactListProps) {
  const navigate = useNavigate();
  const { startCall } = useDialerContext();
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortField, setSortField] = useState<keyof Prospect>('first_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleCall = (e: React.MouseEvent, prospect: Prospect) => {
    e.stopPropagation();
    if (prospect.primary_phone) {
      startCall({
        id: prospect.id,
        firstName: prospect.first_name,
        lastName: prospect.last_name,
        phone: { primary: prospect.primary_phone },
        company: prospect.company_name,
        email: prospect.email,
        title: prospect.job_title || ''
      });
      navigate('/dialer');
    }
  };

  const filteredProspects = prospects
    .filter(prospect => {
      if (!searchQuery) return true;
      
      const searchFields = [
        prospect.first_name,
        prospect.last_name,
        prospect.email,
        prospect.company_name,
        prospect.job_title
      ].map(field => field?.toLowerCase());
      
      return searchFields.some(field => field?.includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      return 0;
    });

  const handleSort = (field: keyof Prospect) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Contact
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('first_name')}
                  className="flex items-center space-x-1"
                >
                  <span>Name</span>
                  {sortField === 'first_name' && (
                    sortDirection === 'asc' ? 
                      <ChevronUpIcon className="h-4 w-4" /> : 
                      <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  onClick={() => handleSort('company_name')}
                  className="flex items-center space-x-1"
                >
                  <span>Company</span>
                  {sortField === 'company_name' && (
                    sortDirection === 'asc' ? 
                      <ChevronUpIcon className="h-4 w-4" /> : 
                      <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Contact
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProspects.map((prospect) => (
              <tr
                key={prospect.id}
                onClick={() => setSelectedProspect(prospect)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {prospect.first_name[0]}{prospect.last_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {prospect.first_name} {prospect.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {prospect.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prospect.company_name}</div>
                  <div className="text-sm text-gray-500">{prospect.job_title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    prospect.lead_status === 'lead' ? 'bg-yellow-100 text-yellow-800' :
                    prospect.lead_status === 'prospect' ? 'bg-blue-100 text-blue-800' :
                    prospect.lead_status === 'customer' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {prospect.lead_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {prospect.updated_at ? new Date(prospect.updated_at).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                    <button 
                      className="p-1 text-gray-400 hover:text-gray-500"
                      title="Send email"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={(e) => handleCall(e, prospect)}
                      className="p-1 text-gray-400 hover:text-green-500"
                      title="Call contact"
                      disabled={!prospect.primary_phone}
                    >
                      <PhoneIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProspect(prospect);
                        setIsEditing(true);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-500"
                      title="Edit contact"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Form Modal */}
      {showAddForm && (
        <ContactForm
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* Contact Detail Modal */}
      {selectedProspect && (
        <ContactDetailModal
          prospect={selectedProspect}
          isEditing={isEditing}
          onClose={() => {
            setSelectedProspect(null);
            setIsEditing(false);
          }}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}