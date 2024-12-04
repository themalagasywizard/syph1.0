import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { settingsService, type UserProfile, type UserSettings } from '../services/settingsService';

interface DatabaseContextType {
  createUserProfile: (data: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  getUserProfile: () => Promise<UserProfile | null>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();

  const createUserProfile = async (data: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
    if (!currentUser) throw new Error('No authenticated user');
    await settingsService.createUserProfile({
      ...data,
      id: currentUser.id
    });
  };

  const getUserProfile = async () => {
    if (!currentUser) return null;
    return settingsService.getUserProfile(currentUser.id);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No authenticated user');
    await settingsService.updateUserProfile(currentUser.id, data);
  };

  const updateUserSettings = async (settings: Partial<UserSettings>) => {
    if (!currentUser) throw new Error('No authenticated user');
    await settingsService.updateUserSettings(currentUser.id, settings);
  };

  return (
    <DatabaseContext.Provider value={{
      createUserProfile,
      getUserProfile,
      updateUserProfile,
      updateUserSettings,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}