import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import type { UserSettings } from '../services/settingsService';

export function useSettings() {
  const { getUserProfile, updateUserSettings } = useDatabase();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await getUserProfile();
      if (profile) {
        setSettings(profile.settings);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
    } finally {
      setLoading(false);
    }
  }, [getUserProfile]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      setError(null);
      await updateUserSettings(newSettings);
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
    } catch (err) {
      console.error('Error updating settings:', err);
      const error = err instanceof Error ? err : new Error('Failed to update settings');
      setError(error);
      throw error;
    }
  };

  const resetError = () => setError(null);

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetError,
    reloadSettings: loadSettings
  };
}