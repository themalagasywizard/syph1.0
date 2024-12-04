import { Dialog } from '@headlessui/react';
import ContactInfo from './ContactInfo';
import EditContactForm from './EditContactForm';
import type { Prospect } from '../../types/prospect';

interface ContactDetailModalProps {
  prospect: Prospect;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function ContactDetailModal({ 
  prospect,
  isEditing,
  onClose,
  onEdit 
}: ContactDetailModalProps) {
  if (!prospect) return null;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
          {isEditing ? (
            <EditContactForm prospect={prospect} onClose={onClose} />
          ) : (
            <ContactInfo prospect={prospect} onEdit={onEdit} onClose={onClose} />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}