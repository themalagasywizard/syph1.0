import { useState, useEffect, useCallback } from 'react';
import { prospectService } from '../services/prospectService';
import type { Prospect } from '../types/prospect';

export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProspects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await prospectService.getAllProspects();
      setProspects(data);
    } catch (err) {
      console.error('Error loading prospects:', err);
      setError(err instanceof Error ? err : new Error('Failed to load prospects'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProspects();
  }, [loadProspects]);

  const addProspect = async (prospect: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const id = await prospectService.createProspect(prospect);
      const newProspect = await prospectService.getProspect(id);
      setProspects(prev => [newProspect, ...prev]);
      return id;
    } catch (err) {
      console.error('Error adding prospect:', err);
      throw err;
    }
  };

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      await prospectService.updateProspect(id, updates);
      setProspects(prev => 
        prev.map(p => p.id === id ? { ...p, ...updates } : p)
      );
    } catch (err) {
      console.error('Error updating prospect:', err);
      throw err;
    }
  };

  const deleteProspect = async (id: string) => {
    try {
      await prospectService.deleteProspect(id);
      setProspects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting prospect:', err);
      throw err;
    }
  };

  const searchProspects = async (query: string) => {
    try {
      setLoading(true);
      const results = await prospectService.searchProspects(query);
      return results;
    } catch (err) {
      console.error('Error searching prospects:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    prospects,
    loading,
    error,
    addProspect,
    updateProspect,
    deleteProspect,
    searchProspects,
    reloadProspects: loadProspects
  };
}