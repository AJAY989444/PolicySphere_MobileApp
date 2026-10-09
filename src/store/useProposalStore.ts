import { create } from 'zustand';
import { ProposalDetails } from '../types/package2';
import { proposalService } from '../services/proposalService';

interface ProposalState {
  proposal: ProposalDetails;
  setProposal: (details: Partial<ProposalDetails>) => void;
  updateProposer: (proposer: Partial<ProposalDetails['proposer']>) => void;
  updateMedical: (med: Partial<ProposalDetails['medicalDeclaration']>) => void;
  updateNominee: (nominee: Partial<ProposalDetails['nominee']>) => void;
}

export const useProposalStore = create<ProposalState>((set) => ({
  proposal: proposalService.getProposal(),
  setProposal: (newDetails) =>
    set((state) => ({ proposal: { ...state.proposal, ...newDetails } })),
  updateProposer: (newProposer) =>
    set((state) => ({
      proposal: {
        ...state.proposal,
        proposer: { ...state.proposal.proposer, ...newProposer },
      },
    })),
  updateMedical: (newMed) =>
    set((state) => ({
      proposal: {
        ...state.proposal,
        medicalDeclaration: { ...state.proposal.medicalDeclaration, ...newMed },
      },
    })),
  updateNominee: (newNominee) =>
    set((state) => ({
      proposal: {
        ...state.proposal,
        nominee: { ...state.proposal.nominee, ...newNominee },
      },
    })),
}));
