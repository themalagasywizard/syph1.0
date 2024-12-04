import type { UserSettings } from '../services/settingsService';

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  notifications: true,
  language: 'en',
  timezone: 'UTC',
  salesMethodology: 'SPIN',
  monthlyCallGoal: 200,
  monthlyRevenueGoal: 100000,
  coachingIntensity: 'balanced',
  tipFrequency: 'daily',
  enableAICoaching: true,
  customBranding: {
    enabled: false
  }
};

export function mergeWithDefaults(settings: Partial<UserSettings>): UserSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    customBranding: {
      ...DEFAULT_SETTINGS.customBranding,
      ...(settings.customBranding || {})
    }
  };
}