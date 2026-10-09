import { create } from 'zustand';
import { CalculatedQuote, MarketplaceFilterState, QuoteInputParameters } from '../types/package1';

interface QuoteState {
  quoteParams: QuoteInputParameters;
  generatedQuotes: CalculatedQuote[];
  selectedComparisonQuoteIds: string[];
  filterState: MarketplaceFilterState;
  setQuoteParams: (params: Partial<QuoteInputParameters>) => void;
  setGeneratedQuotes: (quotes: CalculatedQuote[]) => void;
  toggleComparisonQuote: (quoteId: string) => void;
  clearComparison: () => void;
  setFilterState: (filters: Partial<MarketplaceFilterState>) => void;
}

export const INITIAL_FILTERS: MarketplaceFilterState = {
  minPremium: 0,
  maxPremium: 100000,
  minCoverage: 5,
  maxWaitingPeriodMonths: 48,
  minClaimRatio: 90,
  minInsurerRating: 3.5,
  roomRentLimit: 'All',
  copayPreference: 'All',
  diseaseCoverageFilter: 'All',
  cashlessHospitalsOnly: false,
};

export const INITIAL_PARAMS: QuoteInputParameters = {
  categoryId: 'cat-1',
  categoryName: 'Health Insurance',
  age: 32,
  gender: 'Male',
  pincode: '110001',
  occupation: 'Professional / Salaried',
  sumInsured: 1000000, // ₹10 Lakh
  tobaccoUser: false,
  existingConditions: [],
  selectedAddOns: ['Consumables Cover', 'Restore Benefit'],
};

export const useQuoteStore = create<QuoteState>((set) => ({
  quoteParams: INITIAL_PARAMS,
  generatedQuotes: [],
  selectedComparisonQuoteIds: [],
  filterState: INITIAL_FILTERS,
  setQuoteParams: (newParams) =>
    set((state) => ({ quoteParams: { ...state.quoteParams, ...newParams } })),
  setGeneratedQuotes: (generatedQuotes) => set({ generatedQuotes }),
  toggleComparisonQuote: (quoteId) =>
    set((state) => {
      const current = state.selectedComparisonQuoteIds;
      if (current.includes(quoteId)) {
        return { selectedComparisonQuoteIds: current.filter((id) => id !== quoteId) };
      }
      if (current.length >= 4) {
        return state; // Max 4 comparison items limit
      }
      return { selectedComparisonQuoteIds: [...current, quoteId] };
    }),
  clearComparison: () => set({ selectedComparisonQuoteIds: [] }),
  setFilterState: (newFilters) =>
    set((state) => ({ filterState: { ...state.filterState, ...newFilters } })),
}));
