import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { ComparisonMatrixTable } from '../components/comparison/ComparisonMatrixTable';
import { EmptyState } from '../components/common/EmptyState';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { useQuoteStore } from '../store/useQuoteStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type ComparisonScreenProps = NativeStackScreenProps<RootStackParamList, 'Comparison'>;

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ navigation }) => {
  const { generatedQuotes, selectedComparisonQuoteIds, clearComparison } = useQuoteStore();

  const comparisonQuotes = generatedQuotes.filter((q) =>
    selectedComparisonQuoteIds.includes(q.id)
  );

  // If none explicitly checked, default to comparing first 3 quotes for demo matrix display
  const displayQuotes =
    comparisonQuotes.length > 0 ? comparisonQuotes : generatedQuotes.slice(0, 3);

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.screenTitle}>Policy Comparison Engine</Text>
            <Text style={styles.screenSubtitle}>
              Side-by-side comparison across Premiums, Limits, CSR & Tax Deductions
            </Text>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={clearComparison}>
            <Text style={styles.clearText}>Clear Matrix</Text>
          </TouchableOpacity>
        </View>

        {displayQuotes.length === 0 ? (
          <EmptyState
            title="No Quotes Selected for Comparison"
            description="Go to Quote Engine and select up to 4 plans using the '+ Compare' checkbox."
          />
        ) : (
          <>
            <ComparisonMatrixTable quotes={displayQuotes} />

            <View style={styles.ctaBox}>
              <Text style={styles.ctaTitle}>Ready to Proceed with Proposal?</Text>
              <Text style={styles.ctaSub}>
                Selected plan premiums are locked for 30 minutes. Proceed to eKYC document upload.
              </Text>
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => navigation.navigate('ProposalForm')}
              >
                <Text style={styles.proceedButtonText}>Proceed to Proposal Creation →</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scrollContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  clearButton: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clearText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: '700',
  },
  ctaBox: {
    backgroundColor: '#1E1B4B',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  ctaTitle: {
    ...TYPOGRAPHY.h3,
    color: '#A5B4FC',
    marginBottom: 4,
  },
  ctaSub: {
    ...TYPOGRAPHY.caption,
    color: '#C7D2FE',
    marginBottom: 12,
  },
  proceedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
