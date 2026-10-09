import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { CalculatedQuote } from '../../types/package1';

interface QuoteCardProps {
  quote: CalculatedQuote;
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onSelectBuy: (quote: CalculatedQuote) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isSelectedForCompare,
  onToggleCompare,
  onSelectBuy,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.insurerTitleGroup}>
          <Text style={styles.insurerLogo}>{quote.insurerLogo}</Text>
          <View>
            <Text style={styles.insurerName}>{quote.insurerName}</Text>
            <Text style={styles.planName}>{quote.planName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.compareCheckbox, isSelectedForCompare && styles.compareCheckboxActive]}
          onPress={() => onToggleCompare(quote.id)}
        >
          <Text style={[styles.compareText, isSelectedForCompare && styles.compareTextActive]}>
            {isSelectedForCompare ? '✓ Compare' : '+ Compare'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsBar}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{quote.claimSettlementRatio}%</Text>
          <Text style={styles.metricLabel}>Claim Ratio</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{quote.cashlessHospitalsCount.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>Hospitals</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{quote.solvencyRatio}x</Text>
          <Text style={styles.metricLabel}>Solvency</Text>
        </View>
      </View>

      <Text style={styles.featureLine} numberOfLines={1}>
        ⚡ {quote.roomRentLimit}
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Annual Premium (incl. GST)</Text>
          <Text style={styles.priceValue}>₹{quote.finalPremium.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={() => onSelectBuy(quote)}>
          <Text style={styles.buyButtonText}>Select Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  insurerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insurerLogo: {
    fontSize: 26,
    marginRight: 10,
  },
  insurerName: {
    ...TYPOGRAPHY.h3,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  planName: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
  },
  compareCheckbox: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  compareCheckboxActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  compareText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  compareTextActive: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  metricsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  metricLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  metricDivider: {
    width: 1,
    height: 18,
    backgroundColor: COLORS.border,
  },
  featureLine: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  priceValue: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    color: COLORS.primaryLight,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buyButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
