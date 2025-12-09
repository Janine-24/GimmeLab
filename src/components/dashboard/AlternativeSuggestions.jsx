import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const AlternativeSuggestions = ({ maintenanceItems, getAlternatives }) => {
  if (maintenanceItems.length === 0) return null;

  // Just grab the first maintenance item for demo purposes
  const targetItem = maintenanceItems[0]; 
  const alternatives = getAlternatives(targetItem.id);

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-holo-300 rounded-2xl p-6 shadow-lg mt-6">
      <div className="flex items-center gap-2 mb-4 text-holo-500">
        <ArrowRightLeft size={20} />
        <h3 className="font-bold text-slate-700">Optimization Suggestions</h3>
      </div>
      
      <p className="text-sm text-slate-500 mb-3">
        <span className="font-semibold text-slate-800">{targetItem.name}</span> is flagged for maintenance. Consider redirecting students to:
      </p>

      <div className="grid gap-2">
        {alternatives.length > 0 ? alternatives.map(alt => (
          <div key={alt.id} className="flex items-center justify-between p-3 bg-holo-50/50 border border-holo-200 rounded-xl hover:bg-holo-100 transition cursor-pointer">
            <span className="text-sm font-medium text-slate-700">{alt.name}</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-md font-bold">Available</span>
          </div>
        )) : (
          <div className="text-sm text-slate-400 italic">No direct alternatives found in inventory.</div>
        )}
      </div>
    </div>
  );
};

export default AlternativeSuggestions;