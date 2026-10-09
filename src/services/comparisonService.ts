import { CalculatedQuote } from '../types/package1';

export interface ComparisonAttributeRow {
  attributeKey: string;
  attributeName: string;
  categoryGroup: 'Financials' | 'Coverage Limits' | 'Insurer Track Record' | 'Features & Exclusions';
  values: { [quoteId: string]: string | number | boolean };
  isHighlightDifference: boolean;
}

export class ComparisonService {
  public generateComparisonMatrix(quotes: CalculatedQuote[]): ComparisonAttributeRow[] {
    if (quotes.length === 0) return [];

    const matrixRows: ComparisonAttributeRow[] = [
      {
        attributeKey: 'finalPremium',
        attributeName: 'Annual Premium (incl. 18% GST)',
        categoryGroup: 'Financials',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `₹${q.finalPremium.toLocaleString('en-IN')}/yr` }), {}),
        isHighlightDifference: true,
      },
      {
        attributeKey: 'basePremium',
        attributeName: 'Base Premium',
        categoryGroup: 'Financials',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `₹${q.basePremium.toLocaleString('en-IN')}` }), {}),
        isHighlightDifference: false,
      },
      {
        attributeKey: 'taxBenefit',
        attributeName: 'Tax Deduction',
        categoryGroup: 'Financials',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: q.taxBenefit }), {}),
        isHighlightDifference: false,
      },
      {
        attributeKey: 'roomRentLimit',
        attributeName: 'Room Rent Limit',
        categoryGroup: 'Coverage Limits',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: q.roomRentLimit }), {}),
        isHighlightDifference: true,
      },
      {
        attributeKey: 'copayPercentage',
        attributeName: 'Co-Payment Requirement',
        categoryGroup: 'Coverage Limits',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: q.copayPercentage > 0 ? `${q.copayPercentage}% Co-pay` : 'Zero Co-pay' }), {}),
        isHighlightDifference: true,
      },
      {
        attributeKey: 'waitingPeriodMonths',
        attributeName: 'Pre-existing Disease Waiting',
        categoryGroup: 'Coverage Limits',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `${q.waitingPeriodMonths} Months` }), {}),
        isHighlightDifference: true,
      },
      {
        attributeKey: 'claimSettlementRatio',
        attributeName: 'Claim Settlement Ratio (CSR)',
        categoryGroup: 'Insurer Track Record',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `${q.claimSettlementRatio}%` }), {}),
        isHighlightDifference: false,
      },
      {
        attributeKey: 'solvencyRatio',
        attributeName: 'IRDAI Solvency Ratio',
        categoryGroup: 'Insurer Track Record',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `${q.solvencyRatio}x` }), {}),
        isHighlightDifference: false,
      },
      {
        attributeKey: 'cashlessHospitalsCount',
        attributeName: 'Cashless Network Hospitals',
        categoryGroup: 'Insurer Track Record',
        values: quotes.reduce((acc, q) => ({ ...acc, [q.id]: `${q.cashlessHospitalsCount.toLocaleString()} Hospitals` }), {}),
        isHighlightDifference: true,
      },
    ];

    return matrixRows;
  }
}

export const comparisonService = new ComparisonService();
