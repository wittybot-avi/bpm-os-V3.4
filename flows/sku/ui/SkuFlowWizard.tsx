/**
 * SKU Flow Wizard (FLOW-001)
 * A standardized step-wizard for SKU creation lifecycle.
 * Uses local state for Phase B validation.
 * @foundation V34-S1-FLOW-001-PP-03
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  RotateCcw, 
  Save, 
  User, 
  ChevronRight, 
  AlertTriangle, 
  ShieldCheck,
  XCircle,
  FileText
} from 'lucide-react';
import { FlowShell, FlowStep, FlowFooter } from '../../../components/flow';
import { 
  getAllowedSkuActions, 
  isActionAllowed, 
  nextStateOnSubmit, 
  nextStateOnReview, 
  nextStateOnApprove,
  SkuDraft,
  SkuFlowRole
} from '../index';
import { 
  WizardModel, 
  createDefaultWizardModel, 
  resolveStepFromState 
} from './skuFlowWizardModel';

interface SkuFlowWizardProps {
  onExit: () => void;
}

export const SkuFlowWizard: React.FC<SkuFlowWizardProps> = ({ onExit }) => {
  const [model, setModel] = useState<WizardModel>(createDefaultWizardModel());

  const roles: SkuFlowRole[] = ["Maker", "Checker", "Approver"];

  const handleUpdateDraft = (field: keyof SkuDraft, value: any) => {
    setModel(m => ({
      ...m,
      draft: { ...m.draft, [field]: value }
    }));
  };

  const handleRoleChange = (role: SkuFlowRole) => {
    setModel(m => ({ ...m, role }));
  };

  const handleSubmit = () => {
    const newState = nextStateOnSubmit();
    setModel(m => ({
      ...m,
      state: newState,
      step: resolveStepFromState(newState)
    }));
  };

  const handleReview = (decision: "SEND_BACK" | "FORWARD") => {
    const newState = nextStateOnReview(decision);
    setModel(m => ({
      ...m,
      state: newState,
      step: resolveStepFromState(newState)
    }));
  };

  const handleApprove = (decision: "APPROVE" | "REJECT") => {
    const newState = nextStateOnApprove(decision);
    setModel(m => ({
      ...m,
      state: newState,
      step: resolveStepFromState(newState)
    }));
  };

  const handleReset = () => {
    setModel(createDefaultWizardModel());
  };

  // Role Switcher for Demo
  const RoleSwitcher = (
    <div className="flex bg-slate-200 p-1 rounded-md">
      {roles.map(r => (
        <button 
          key={r}
          onClick={() => handleRoleChange(r)}
          className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
            model.role === r 
            ? 'bg-white text-brand-600 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {r.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const Summary = () => (
    <div className="bg-slate-50 p-4 rounded border border-slate-200 grid grid-cols-2 gap-x-6 gap-y-4 text-sm shadow-inner">
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">SKU Code</label>
        <div className="font-mono font-bold text-slate-700">{model.draft.skuCode || '--'}</div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">SKU Name</label>
        <div className="font-medium text-slate-800">{model.draft.skuName || '--'}</div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">Chemistry</label>
        <div className="font-medium text-slate-700">{model.draft.chemistry || '--'}</div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold text-slate-400">Form Factor</label>
        <div className="font-medium text-slate-700">{model.draft.formFactor || '--'}</div>
      </div>
    </div>
  );

  return (
    <FlowShell 
      title="SKU Flow Wizard (FLOW-001)" 
      subtitle="Maker-Checker-Approver Lifecycle"
      rightSlot={RoleSwitcher}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1">
          {model.step === "DRAFT" && (
            <FlowStep 
              stepTitle="Define SKU Specifications" 
              stepHint="Specify technical parameters for the new battery pack profile."
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">SKU Code</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="e.g. BP-LFP-48V-V2"
                    value={model.draft.skuCode}
                    onChange={e => handleUpdateDraft('skuCode', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">SKU Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="e.g. Standard 48V LFP Module"
                    value={model.draft.skuName}
                    onChange={e => handleUpdateDraft('skuName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Chemistry</label>
                  <select 
                    className="w-full border border-slate-300 rounded p-2 text-sm outline-none bg-white"
                    value={model.draft.chemistry}
                    onChange={e => handleUpdateDraft('chemistry', e.target.value)}
                  >
                    <option value="">Select Chemistry...</option>
                    <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                    <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                    <option value="LTO">LTO (Lithium Titanate)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase">Form Factor</label>
                  <select 
                    className="w-full border border-slate-300 rounded p-2 text-sm outline-none bg-white"
                    value={model.draft.formFactor}
                    onChange={e => handleUpdateDraft('formFactor', e.target.value)}
                  >
                    <option value="">Select Form Factor...</option>
                    <option value="Pouch">Pouch Cell</option>
                    <option value="Prismatic">Prismatic</option>
                    <option value="Cylindrical">Cylindrical</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <label className="block text-xs font-bold text-slate-600 uppercase">Notes / Instructions</label>
                <textarea 
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  rows={3}
                  value={model.draft.notes}
                  onChange={e => handleUpdateDraft('notes', e.target.value)}
                />
              </div>
            </FlowStep>
          )}

          {model.step === "REVIEW" && (
            <FlowStep 
              stepTitle="Technical Review (Checker)" 
              stepHint="Verify that specs align with engineering standards."
            >
              <Summary />
              <div className="space-y-2 mt-6">
                <label className="block text-xs font-bold text-slate-600 uppercase">Reviewer Comments</label>
                <textarea 
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  rows={3}
                  placeholder="Mandatory for send-back..."
                  value={model.comment}
                  onChange={e => setModel(m => ({ ...m, comment: e.target.value }))}
                />
              </div>
              {!isActionAllowed(model.role, model.state, "REVIEW_FORWARD") && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded flex gap-2 text-amber-800 text-xs mt-4">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>Switch role to <strong>Checker</strong> to act on this step.</span>
                </div>
              )}
            </FlowStep>
          )}

          {model.step === "APPROVE" && (
            <FlowStep 
              stepTitle="Final Approval (Approver)" 
              stepHint="Authorize this SKU for active manufacturing use."
            >
              <Summary />
              {model.comment && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
                  <span className="font-bold">Checker Comment:</span> {model.comment}
                </div>
              )}
              <div className="space-y-2 mt-6">
                <label className="block text-xs font-bold text-slate-600 uppercase">Approval Statement</label>
                <textarea 
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  rows={3}
                  placeholder="Final remarks..."
                  value={model.rejectionReason}
                  onChange={e => setModel(m => ({ ...m, rejectionReason: e.target.value }))}
                />
              </div>
              {!isActionAllowed(model.role, model.state, "APPROVE_TO_ACTIVE") && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded flex gap-2 text-amber-800 text-xs mt-4">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>Switch role to <strong>Approver</strong> to act on this step.</span>
                </div>
              )}
            </FlowStep>
          )}

          {model.step === "PUBLISH" && (
            <FlowStep 
              stepTitle="SKU Released" 
              stepHint="The SKU profile is now active in the manufacturing ledger."
            >
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Registration Complete</h3>
                <p className="text-slate-500 max-w-sm mt-2">
                  SKU <strong>{model.draft.skuCode}</strong> has been successfully registered and is ready for S4 Batch Planning.
                </p>
                <div className="mt-8 w-full max-w-md">
                   <Summary />
                </div>
              </div>
            </FlowStep>
          )}
        </div>

        <FlowFooter 
          left={
            <button 
              onClick={onExit}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Close Wizard
            </button>
          }
          right={
            <div className="flex items-center gap-3">
              {model.step === "DRAFT" && (
                <>
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded border border-transparent transition-all"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={!isActionAllowed(model.role, model.state, "SUBMIT_FOR_REVIEW") || !model.draft.skuCode}
                    className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded font-bold text-sm hover:bg-brand-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Submit for Review <Send size={16} />
                  </button>
                </>
              )}

              {model.step === "REVIEW" && (
                <>
                  <button 
                    onClick={() => handleReview("SEND_BACK")}
                    disabled={!isActionAllowed(model.role, model.state, "REVIEW_SEND_BACK")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded font-bold text-sm hover:bg-red-50 disabled:opacity-50 transition-all"
                  >
                    <XCircle size={16} /> Send Back
                  </button>
                  <button 
                    onClick={() => handleReview("FORWARD")}
                    disabled={!isActionAllowed(model.role, model.state, "REVIEW_FORWARD")}
                    className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded font-bold text-sm hover:bg-brand-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Forward <ChevronRight size={16} />
                  </button>
                </>
              )}

              {model.step === "APPROVE" && (
                <>
                  <button 
                    onClick={() => handleApprove("REJECT")}
                    disabled={!isActionAllowed(model.role, model.state, "REJECT")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded font-bold text-sm hover:bg-red-50 disabled:opacity-50 transition-all"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button 
                    onClick={() => handleApprove("APPROVE")}
                    disabled={!isActionAllowed(model.role, model.state, "APPROVE_TO_ACTIVE")}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded font-bold text-sm hover:bg-green-700 disabled:opacity-50 transition-all shadow-sm"
                  >
                    Approve to Active <CheckCircle2 size={16} />
                  </button>
                </>
              )}

              {model.step === "PUBLISH" && (
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded font-bold text-sm hover:bg-brand-700 transition-all shadow-sm"
                >
                  Start New SKU <PlusIcon size={16} />
                </button>
              )}
            </div>
          }
        />
      </div>
    </FlowShell>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
