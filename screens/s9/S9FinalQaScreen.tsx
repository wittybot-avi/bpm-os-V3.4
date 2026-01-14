/**
 * S9 Battery Registry Screen
 * Updated to include the Final QA Flow Wizard (FLOW-004).
 */

import React, { useState } from 'react';
import { BatteryRegistry } from '../../components/BatteryRegistry';
import { FinalQaWizard } from '../../flows/finalQa/ui/FinalQaWizard';
import { Wand2, X } from 'lucide-react';
import { NavView } from '../../types';

interface S9FinalQaScreenProps {
  onNavigate?: (view: NavView) => void;
}

export const S9FinalQaScreen: React.FC<S9FinalQaScreenProps> = (props) => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-end gap-2 shrink-0">
        <button 
          onClick={() => setShowWizard(!showWizard)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold border transition-all ${
            showWizard 
              ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
              : 'bg-white border-brand-200 text-brand-600 hover:bg-brand-50 shadow-sm'
          }`}
        >
          {showWizard ? <X size={16} /> : <Wand2 size={16} />}
          {showWizard ? 'Exit Wizard' : 'Start Final QA Flow'}
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {showWizard ? (
          <FinalQaWizard onExit={() => setShowWizard(false)} />
        ) : (
          <BatteryRegistry {...props} />
        )}
      </div>
    </div>
  );
};
