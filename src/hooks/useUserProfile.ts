import { useState, useEffect } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import type { UserProfile } from '../services/settingsService';

export function useUserProfile() {
  const { getUserProfile, updateUserProfile } = useDatabase();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load profile'));
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    try {
      await updateUserProfile(updates);
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile
  };
}