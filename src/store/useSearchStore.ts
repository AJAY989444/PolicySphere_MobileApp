import { create } from 'zustand';
import { SearchResultItem } from '../types/package4';
import { searchService } from '../services/searchService';

interface SearchState {
  query: string;
  results: SearchResultItem[];
  isSearching: boolean;
  searchHistory: string[];
  setQuery: (q: string) => void;
  performSearch: (q: string) => Promise<void>;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  searchHistory: ['Health Insurance 80D', 'Apollo Hospital', 'Zero Dep Motor', 'Term Life 2 Cr'],
  setQuery: (query) => set({ query }),
  performSearch: async (q: string) => {
    set({ query: q, isSearching: true });
    if (!q.trim()) {
      set({ results: [], isSearching: false });
      return;
    }
    const results = await searchService.search(q);
    const history = Array.from(new Set([q, ...get().searchHistory])).slice(0, 8);
    set({ results, isSearching: false, searchHistory: history });
  },
  clearSearch: () => set({ query: '', results: [] }),
}));
