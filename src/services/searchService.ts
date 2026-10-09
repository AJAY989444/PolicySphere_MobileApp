import { SearchResultItem } from '../types/package4';

const MOCK_SEARCH_DATABASE: SearchResultItem[] = [
  {
    id: 's1',
    type: 'Category',
    title: 'Health Insurance & Family Floater',
    subtitle: '14,200+ Cashless Hospitals • Tax 80D',
    badgeText: 'Category',
    targetRoute: 'QuoteEngine',
    targetParams: { categoryId: 'cat-1', categoryName: 'Health Insurance' },
  },
  {
    id: 's2',
    type: 'Policy',
    title: 'HDFC ERGO Optima Secure',
    subtitle: 'Health • 4X Coverage Multiplier',
    badgeText: 'Popular',
    targetRoute: 'QuoteEngine',
    targetParams: { categoryId: 'cat-1', categoryName: 'Health Insurance' },
  },
  {
    id: 's3',
    type: 'Policy',
    title: 'ICICI Pru iProtect Smart',
    subtitle: 'Term Life • 99.1% Settlement Ratio',
    badgeText: 'Top Rated',
    targetRoute: 'QuoteEngine',
    targetParams: { categoryId: 'cat-5', categoryName: 'Term Life Insurance' },
  },
  {
    id: 's4',
    type: 'Hospital',
    title: 'Apollo Speciality Hospital, New Delhi',
    subtitle: 'Cashless Network Hospital • 24x7 TPA Desk',
    badgeText: 'Cashless',
    targetRoute: 'ClaimsManagement',
  },
  {
    id: 's5',
    type: 'FAQ',
    title: 'How to download Section 80D Tax Exemption Certificate?',
    subtitle: 'Knowledge Base • 2 min read',
    badgeText: 'Help',
    targetRoute: 'SupportCenter',
  },
  {
    id: 's6',
    type: 'Claim',
    title: 'Cashless Hospital Claim Intimation (CLM-HLT-99201)',
    subtitle: 'Active Claim • Status: Approved (₹62,500)',
    badgeText: 'Active Claim',
    targetRoute: 'ClaimsManagement',
  },
];

export class SearchService {
  private database: SearchResultItem[] = MOCK_SEARCH_DATABASE;

  public async search(query: string): Promise<SearchResultItem[]> {
    if (!query.trim()) return [];
    const qLower = query.toLowerCase().trim();

    return new Promise((resolve) => {
      setTimeout(() => {
        // Typo tolerance / synonym handling
        const results = this.database.filter((item) => {
          const title = item.title.toLowerCase();
          const sub = item.subtitle.toLowerCase();
          return (
            title.includes(qLower) ||
            sub.includes(qLower) ||
            (qLower.includes('helth') && title.includes('health')) ||
            (qLower.includes('car') && title.includes('motor')) ||
            (qLower.includes('tax') && sub.includes('80d'))
          );
        });
        resolve(results);
      }, 150);
    });
  }
}

export const searchService = new SearchService();
