export type MacroDomain =
  | 'All'
  | 'Health & Wellness'
  | 'Life & Wealth'
  | 'Motor & Mobility'
  | 'Property & Specialty'
  | 'Business & Corporate';

export interface InsuranceCategory {
  id: string;
  code: string;
  name: string;
  domain: Exclude<MacroDomain, 'All'>;
  description: string;
  iconSymbol: string;
  coverageRange: string;
  taxBenefit?: string; // e.g. 'Section 80D', 'Section 80C'
  activeInsurersCount: number;
  popularAddOns: string[];
  requiredQuoteFields: string[];
  keyBenefits: string[];
}
