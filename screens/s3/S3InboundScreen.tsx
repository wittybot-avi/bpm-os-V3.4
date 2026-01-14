/**
 * S3 Inbound Receipt Screen
 * Updated for FLOW-003 MES Pilot.
 */

import React, { useState } from 'react';
import { InboundReceipt } from '../../components/InboundReceipt';
import { InboundFlowWizard } from '../../flows/inbound/ui/InboundFlowWizard';
import { Wand2, X } from 'lucide-react';
import { NavView } from '../../types';

interface S3InboundScreenProps {
  onNavigate?: (view: NavView) => void;
}

export const S3InboundScreen: React.FC<S3InboundScreenProps> = (props) => {
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
          {showWizard ? 'Exit Wizard' : 'Start Inbound Wizard'}
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {showWizard ? (
          <InboundFlowWizard onExit={() => setShowWizard(false)} />
        ) : (
          <InboundReceipt {...props} />
        )}
      </div>
    </div>
  );
};
