import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Contact } from '../lib/db';

export function useCRM() {
  // Initialize contacts query with error handling
  const contacts = useLiveQuery(
    () => db.contacts?.toArray(),
    [],
    []
  );
  
  const addContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => {
    try {
      const now = new Date();
      const userId = 'system'; // Replace with actual user ID when auth is implemented
      
      return await db.addContact({
        ...contact,
        createdBy: userId,
        updatedBy: userId
      });
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  };

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    try {
      const userId = 'system'; // Replace with actual user ID when auth is implemented
      return await db.updateContact(id, {
        ...contact,
        updatedBy: userId
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      return await db.deleteContact(id);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };

  const getContact = async (id: string) => {
    try {
      return await db.getContact(id);
    } catch (error) {
      console.error('Error getting contact:', error);
      throw error;
    }
  };

  const searchContacts = async (query: string) => {
    try {
      return await db.searchContacts(query);
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw error;
    }
  };

  const getContactsByStatus = async (status: Contact['status']) => {
    try {
      return await db.getContactsByStatus(status);
    } catch (error) {
      console.error('Error getting contacts by status:', error);
      throw error;
    }
  };

  const getHighPriorityContacts = async () => {
    try {
      return await db.getHighPriorityContacts();
    } catch (error) {
      console.error('Error getting high priority contacts:', error);
      throw error;
    }
  };

  return {
    contacts: contacts || [],
    addContact,
    updateContact,
    deleteContact,
    getContact,
    searchContacts,
    getContactsByStatus,
    getHighPriorityContacts,
  };
}