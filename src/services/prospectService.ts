import { supabase } from '../config/supabaseClient';
import type { Prospect } from '../types/prospect';

export const prospectService = {
  async createProspect(prospect: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .insert({
          first_name: prospect.first_name,
          last_name: prospect.last_name,
          job_title: prospect.job_title,
          department: prospect.department,
          company_name: prospect.company_name,
          industry: prospect.industry,
          company_size: prospect.company_size,
          primary_phone: prospect.primary_phone,
          secondary_phone: prospect.secondary_phone,
          email: prospect.email,
          linkedin_profile: prospect.linkedin_profile,
          location: prospect.location,
          city: prospect.city,
          state_province: prospect.state_province,
          country: prospect.country,
          timezone: prospect.timezone,
          lead_status: prospect.lead_status,
          lead_source: prospect.lead_source,
          competitors: prospect.competitors,
          tags: prospect.tags
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating prospect:', error);
      throw error;
    }
  },

  async updateProspect(id: string, updates: Partial<Prospect>): Promise<void> {
    try {
      const { error } = await supabase
        .from('prospects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating prospect:', error);
      throw error;
    }
  },

  async deleteProspect(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting prospect:', error);
      throw error;
    }
  },

  async getProspect(id: string): Promise<Prospect> {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting prospect:', error);
      throw error;
    }
  },

  async getAllProspects(): Promise<Prospect[]> {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting prospects:', error);
      throw error;
    }
  },

  async searchProspects(query: string): Promise<Prospect[]> {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .or(`
          first_name.ilike.%${query}%,
          last_name.ilike.%${query}%,
          company_name.ilike.%${query}%,
          email.ilike.%${query}%
        `);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching prospects:', error);
      throw error;
    }
  },

  async getProspectsByStatus(status: string): Promise<Prospect[]> {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .eq('lead_status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting prospects by status:', error);
      throw error;
    }
  }
};