import { PhoneIcon, EnvelopeIcon, MapPinIcon, TagIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Prospect } from '../../types/prospect';

interface ContactInfoProps {
  prospect: Prospect;
  onEdit: () => void;
  onClose: () => void;
}

export default function ContactInfo({ prospect, onEdit, onClose }: ContactInfoProps) {
  if (!prospect?.first_name || !prospect?.last_name) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          Contact information unavailable
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {prospect.first_name[0]}{prospect.last_name[0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{`${prospect.first_name} ${prospect.last_name}`}</h2>
            {prospect.job_title && <p className="text-gray-600">{prospect.job_title}</p>}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              {prospect.email && (
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`mailto:${prospect.email}`} className="text-blue-600 hover:underline">
                    {prospect.email}
                  </a>
                </div>
              )}
              {prospect.primary_phone && (
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${prospect.primary_phone}`} className="text-blue-600 hover:underline">
                    {prospect.primary_phone}
                  </a>
                </div>
              )}
              {(prospect.city || prospect.state_province || prospect.country) && (
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    {prospect.city && <p>{prospect.city}</p>}
                    {prospect.state_province && <p>{prospect.state_province}</p>}
                    {prospect.country && <p>{prospect.country}</p>}
                    {prospect.timezone && (
                      <p className="text-sm text-gray-500">{prospect.timezone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Company Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div className="space-y-3">
              <p className="font-medium">{prospect.company_name}</p>
              {prospect.industry && (
                <p className="text-sm text-gray-600">Industry: {prospect.industry}</p>
              )}
              {prospect.company_size && (
                <p className="text-sm text-gray-600">Size: {prospect.company_size}</p>
              )}
              {prospect.linkedin_profile && (
                <a
                  href={prospect.linkedin_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          </section>
        </div>

        {/* Lead Information */}
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  prospect.lead_status === 'lead' ? 'bg-yellow-100 text-yellow-800' :
                  prospect.lead_status === 'prospect' ? 'bg-blue-100 text-blue-800' :
                  prospect.lead_status === 'customer' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {prospect.lead_status}
                </span>
              </div>
              {prospect.lead_source && (
                <div>
                  <p className="text-sm font-medium">Source</p>
                  <p className="text-sm text-gray-600">{prospect.lead_source}</p>
                </div>
              )}
            </div>
          </section>

          {/* Tags */}
          {prospect.tags && (
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {prospect.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Competitors */}
        {prospect.competitors && prospect.competitors.length > 0 && (
          <div>
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Competitors</h3>
              <div className="space-y-3">
                {prospect.competitors.map((competitor, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{competitor.name}</p>
                    {competitor.pros && (
                      <p className="text-sm text-green-600 mt-1">Pros: {competitor.pros}</p>
                    )}
                    {competitor.cons && (
                      <p className="text-sm text-red-600 mt-1">Cons: {competitor.cons}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}