import { supabase } from '../config/supabaseClient';
import { DEFAULT_SETTINGS, mergeWithDefaults } from '../utils/settingsDefaults';
import { validateSettings } from '../utils/settingsValidator';
import { profileService } from './profileService';

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
  salesMethodology: string;
  monthlyCallGoal: number;
  monthlyRevenueGoal: number;
  coachingIntensity: string;
  tipFrequency: string;
  enableAICoaching: boolean;
  customBranding?: {
    enabled: boolean;
    logo?: string;
    primaryColor?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  settings: UserSettings;
  created_at?: string;
  updated_at?: string;
}

export const settingsService = {
  async createUserProfile(profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          ...profile,
          settings: DEFAULT_SETTINGS
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          const newProfile = {
            id: userId,
            name: userData.user?.user_metadata?.name || '',
            email: userData.user?.email || '',
            role: 'user',
            settings: DEFAULT_SETTINGS
          };

          await this.createUserProfile(newProfile);
          return newProfile;
        }
        throw error;
      }

      return {
        ...profile,
        settings: mergeWithDefaults(profile.settings)
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async updateUserSettings(userId: string, newSettings: Partial<UserSettings>): Promise<void> {
    try {
      const { data: profile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('settings')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      const currentSettings = profile?.settings || DEFAULT_SETTINGS;
      const mergedSettings = mergeWithDefaults({
        ...currentSettings,
        ...newSettings
      });

      // Validate merged settings
      validateSettings(mergedSettings);

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          settings: mergedSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }
};