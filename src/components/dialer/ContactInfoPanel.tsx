import { Contact } from '../../types';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface ContactInfoPanelProps {
  contact: Contact;
}

export default function ContactInfoPanel({ contact }: ContactInfoPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">Contact Information</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Info */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-medium">
                  {contact.firstName[0]}{contact.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                <p className="text-sm text-gray-500">{contact.title}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span>{contact.phone.primary}</span>
            </div>
            <div className="flex items-center text-sm">
              <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span>{contact.email}</span>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Company Information</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span>{contact.company}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span>{contact.location.city}, {contact.location.state}</span>
            </div>
          </div>
        </section>

        {/* Tags */}
        {contact.tags && contact.tags.length > 0 && (
          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}