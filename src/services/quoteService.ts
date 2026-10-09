import { CalculatedQuote, QuoteInputParameters } from '../types/package1';

const MOCK_INSURERS = [
  { id: 'ins-1', name: 'Star Health & Allied', logo: '⭐', csr: 98.4, solvency: 2.2, hospitals: 14200 },
  { id: 'ins-2', name: 'HDFC ERGO General', logo: '🛡️', csr: 97.9, solvency: 2.4, hospitals: 12800 },
  { id: 'ins-3', name: 'ICICI Lombard', logo: '🏛️', csr: 98.1, solvency: 2.1, hospitals: 13500 },
  { id: 'ins-4', name: 'Care Health Insurance', logo: '❤️', csr: 96.8, solvency: 1.9, hospitals: 11000 },
  { id: 'ins-5', name: 'Niva Bupa Health', logo: '💧', csr: 97.5, solvency: 2.0, hospitals: 10500 },
  { id: 'ins-6', name: 'Bajaj Allianz', logo: '🦅', csr: 98.0, solvency: 2.3, hospitals: 12000 },
];

export class QuoteService {
  public async generateQuotes(params: QuoteInputParameters): Promise<CalculatedQuote[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Base multiplier rule algorithm
        const basePrice = Math.round((params.sumInsured * 0.012) + (params.age * 120));
        const riskFactor = params.tobaccoUser ? 1.25 : 1.0;
        const addOnMultiplier = 1 + (params.selectedAddOns.length * 0.08);

        const quotes: CalculatedQuote[] = MOCK_INSURERS.map((ins, idx) => {
          const insurerPriceVariance = 1 + ((idx - 2) * 0.06);
          const rawBase = Math.round(basePrice * riskFactor * insurerPriceVariance);
          const addOnsCost = Math.round(rawBase * (addOnMultiplier - 1));
          
          let ncbDiscount = 0;
          if (params.vehicleDetails && params.vehicleDetails.ncbPercentage > 0) {
            ncbDiscount = Math.round(rawBase * (params.vehicleDetails.ncbPercentage / 100));
          }

          const taxable = rawBase + addOnsCost - ncbDiscount;
          const gstAmount = Math.round(taxable * 0.18);
          const finalPremium = taxable + gstAmount;

          return {
            id: `qte-${ins.id}-${Date.now()}`,
            insurerId: ins.id,
            insurerName: ins.name,
            insurerLogo: ins.logo,
            planName: idx % 2 === 0 ? 'Optima Secure Super' : 'Comprehensive Complete Shield',
            claimSettlementRatio: ins.csr,
            solvencyRatio: ins.solvency,
            cashlessHospitalsCount: ins.hospitals,
            basePremium: rawBase,
            addOnsCost,
            ncbDiscount,
            gstAmount,
            finalPremium,
            roomRentLimit: idx % 2 === 0 ? 'Single Private AC Room (No Capping)' : 'Shared Room / Up to 1% SI',
            copayPercentage: idx === 3 ? 10 : 0,
            waitingPeriodMonths: idx % 3 === 0 ? 24 : 36,
            diseaseExclusions: ['Cataract (24m)', 'Joint Replacement (36m)'],
            taxBenefit: 'Section 80D',
            features: [
              'Cashless Anywhere in 4 hours',
              'Restore Benefit up to 100%',
              'Annual Health Checkup included',
              'No Claim Bonus multiplier up to 100%',
            ],
          };
        });

        resolve(quotes);
      }, 400);
    });
  }
}

export const quoteService = new QuoteService();
