import { createContext, useContext, ReactNode } from 'react';
import { useCRM } from '../hooks/useCRM';
import type { Contact } from '../lib/db';

interface CRMContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => Promise<string>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<number>;
  deleteContact: (id: string) => Promise<void>;
  getContact: (id: string) => Promise<Contact | undefined>;
  searchContacts: (query: string) => Promise<Contact[]>;
  getContactsByStatus: (status: Contact['status']) => Promise<Contact[]>;
  getHighPriorityContacts: () => Promise<Contact[]>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const crm = useCRM();

  return (
    <CRMContext.Provider value={crm}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRMContext() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRMContext must be used within a CRMProvider');
  }
  return context;
}