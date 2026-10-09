import { create } from 'zustand';
import { InsuranceClaim, ClaimType } from '../types/package3';
import { claimsService } from '../services/claimsService';

interface ClaimsState {
  claims: InsuranceClaim[];
  selectedClaim: InsuranceClaim | null;
  isLoading: boolean;
  loadClaims: () => Promise<void>;
  setSelectedClaim: (claim: InsuranceClaim | null) => void;
  intimateClaim: (
    policyNumber: string,
    categoryName: string,
    claimType: ClaimType,
    claimedAmount: number,
    incidentDate: string,
    hospitalOrDetails: string
  ) => Promise<InsuranceClaim>;
}

export const useClaimsStore = create<ClaimsState>((set, get) => ({
  claims: [],
  selectedClaim: null,
  isLoading: false,
  loadClaims: async () => {
    set({ isLoading: true });
    const claims = await claimsService.getActiveClaims();
    set({ claims, isLoading: false });
  },
  setSelectedClaim: (selectedClaim) => set({ selectedClaim }),
  intimateClaim: async (policyNumber, categoryName, claimType, claimedAmount, incidentDate, hospitalOrDetails) => {
    const newClaim = await claimsService.intimateClaim(
      policyNumber,
      categoryName,
      claimType,
      claimedAmount,
      incidentDate,
      hospitalOrDetails
    );
    set({ claims: [newClaim, ...get().claims] });
    return newClaim;
  },
}));
