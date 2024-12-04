import Dexie, { type Table } from 'dexie';
import type { Contact } from '../types';

class CRMDatabase extends Dexie {
  contacts!: Table<Contact>;

  constructor() {
    super('crm');
    
    this.version(1).stores({
      contacts: '++id, firstName, lastName, company, status, createdAt'
    });

    this.contacts.hook('creating', (primKey, obj) => {
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
      return obj;
    });

    this.contacts.hook('updating', (modifications) => {
      modifications.updatedAt = new Date();
      return modifications;
    });
  }

  async addContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const id = await this.contacts.add({
        ...contact,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as Contact);
      return id;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  }

  async updateContact(id: string, updates: Partial<Contact>) {
    try {
      const count = await this.contacts.where('id').equals(id).modify(updates);
      return count;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  async deleteContact(id: string) {
    try {
      await this.contacts.where('id').equals(id).delete();
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }

  async getContact(id: string) {
    try {
      return await this.contacts.where('id').equals(id).first();
    } catch (error) {
      console.error('Error getting contact:', error);
      throw error;
    }
  }

  async searchContacts(query: string) {
    try {
      const searchTerm = query.toLowerCase();
      return await this.contacts
        .filter(contact => 
          contact.firstName.toLowerCase().includes(searchTerm) ||
          contact.lastName.toLowerCase().includes(searchTerm) ||
          contact.company.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm)
        )
        .toArray();
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw error;
    }
  }

  async getContactsByStatus(status: Contact['status']) {
    try {
      return await this.contacts.where('status').equals(status).toArray();
    } catch (error) {
      console.error('Error getting contacts by status:', error);
      throw error;
    }
  }

  async getHighPriorityContacts() {
    try {
      return await this.contacts
        .filter(contact => contact.tags.includes('high-priority'))
        .toArray();
    } catch (error) {
      console.error('Error getting high priority contacts:', error);
      throw error;
    }
  }
}

const db = new CRMDatabase();

export { db };