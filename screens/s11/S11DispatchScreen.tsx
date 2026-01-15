/**
 * S11 Finished Goods & Dispatch Screen
 * Wrapper for inventory tracking and Dispatch Flow (FLOW-005).
 */

import React, { useState } from 'react';
import { FinishedGoods } from '../../components/FinishedGoods';
import { DispatchWizard } from '../../flows/dispatch/ui/DispatchWizard';
import { Wand2, X } from 'lucide-react';
import { NavView } from '../../types';

interface S11DispatchScreenProps {
  onNavigate?: (view: NavView) => void;
}

export const S11DispatchScreen: React.FC<S11DispatchScreenProps> = (props) => {
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
          {showWizard ? 'Exit Wizard' : 'Start Dispatch Flow'}
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {showWizard ? (
          <DispatchWizard onExit={() => setShowWizard(false)} />
        ) : (
          <FinishedGoods {...props} />
        )}
      </div>
    </div>
  );
};
