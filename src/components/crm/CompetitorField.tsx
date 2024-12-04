import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Competitor } from '../../lib/db';

interface CompetitorFieldProps {
  competitors: Competitor[];
  onChange: (competitors: Competitor[]) => void;
}

export default function CompetitorField({ competitors, onChange }: CompetitorFieldProps) {
  const [newCompetitor, setNewCompetitor] = useState<Competitor>({
    name: '',
    strengths: [],
    weaknesses: [],
    pricing: '',
    marketShare: '',
    keyFeatures: []
  });

  const handleAddCompetitor = () => {
    if (newCompetitor.name) {
      onChange([...competitors, { ...newCompetitor }]);
      setNewCompetitor({
        name: '',
        strengths: [],
        weaknesses: [],
        pricing: '',
        marketShare: '',
        keyFeatures: []
      });
    }
  };

  const handleRemoveCompetitor = (index: number) => {
    const updatedCompetitors = competitors.filter((_, i) => i !== index);
    onChange(updatedCompetitors);
  };

  const handleUpdateCompetitor = (index: number, field: keyof Competitor, value: any) => {
    const updatedCompetitors = [...competitors];
    if (field === 'strengths' || field === 'weaknesses' || field === 'keyFeatures') {
      updatedCompetitors[index][field] = value.split('\n').filter(Boolean);
    } else {
      updatedCompetitors[index][field] = value;
    }
    onChange(updatedCompetitors);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Competitors</h3>
        <button
          type="button"
          onClick={handleAddCompetitor}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          <PlusIcon className="h-4 w-4 inline mr-1" />
          Add Competitor
        </button>
      </div>

      {/* New Competitor Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <input
          type="text"
          value={newCompetitor.name}
          onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
          placeholder="Competitor name"
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Strengths</label>
            <textarea
              value={newCompetitor.strengths.join('\n')}
              onChange={(e) => setNewCompetitor({
                ...newCompetitor,
                strengths: e.target.value.split('\n').filter(Boolean)
              })}
              placeholder="One strength per line"
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Weaknesses</label>
            <textarea
              value={newCompetitor.weaknesses.join('\n')}
              onChange={(e) => setNewCompetitor({
                ...newCompetitor,
                weaknesses: e.target.value.split('\n').filter(Boolean)
              })}
              placeholder="One weakness per line"
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Existing Competitors */}
      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={competitor.name}
                onChange={(e) => handleUpdateCompetitor(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveCompetitor(index)}
                className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Strengths</label>
                <textarea
                  value={competitor.strengths.join('\n')}
                  onChange={(e) => handleUpdateCompetitor(index, 'strengths', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weaknesses</label>
                <textarea
                  value={competitor.weaknesses.join('\n')}
                  onChange={(e) => handleUpdateCompetitor(index, 'weaknesses', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}