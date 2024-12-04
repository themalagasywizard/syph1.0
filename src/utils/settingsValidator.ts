import { z } from 'zod';

export const userSettingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  notifications: z.boolean(),
  language: z.string(),
  timezone: z.string(),
  salesMethodology: z.string(),
  monthlyCallGoal: z.number().min(0),
  monthlyRevenueGoal: z.number().min(0),
  coachingIntensity: z.string(),
  tipFrequency: z.string(),
  enableAICoaching: z.boolean(),
  customBranding: z.object({
    enabled: z.boolean(),
    logo: z.string().optional(),
    primaryColor: z.string().optional()
  }).optional()
});

export type ValidatedUserSettings = z.infer<typeof userSettingsSchema>;

export function validateSettings(settings: unknown): ValidatedUserSettings {
  return userSettingsSchema.parse(settings);
}