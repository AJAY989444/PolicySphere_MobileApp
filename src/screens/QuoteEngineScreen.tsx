import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { PersonaSwitcher } from '../components/roles/PersonaSwitcher';
import { QuoteCard } from '../components/quotes/QuoteCard';
import { LoadingState } from '../components/common/LoadingState';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { quoteService } from '../services/quoteService';
import { useQuoteStore } from '../store/useQuoteStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type QuoteEngineScreenProps = NativeStackScreenProps<RootStackParamList, 'QuoteEngine'>;

export const QuoteEngineScreen: React.FC<QuoteEngineScreenProps> = ({ route, navigation }) => {
  const categoryName = route?.params?.categoryName || 'Health Insurance';

  const {
    quoteParams,
    generatedQuotes,
    selectedComparisonQuoteIds,
    setQuoteParams,
    setGeneratedQuotes,
    toggleComparisonQuote,
  } = useQuoteStore();

  const [loading, setLoading] = useState(false);

  const fetchQuotes = () => {
    setLoading(true);
    quoteService.generateQuotes(quoteParams).then((results) => {
      setGeneratedQuotes(results);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchQuotes();
  }, [quoteParams.sumInsured, quoteParams.age, quoteParams.tobaccoUser]);

  return (
    <View style={styles.container}>
      <HeaderBanner />
      <PersonaSwitcher />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Risk Input Wizard Bar */}
        <View style={styles.wizardCard}>
          <Text style={styles.wizardTitle}>Quote Engine • {categoryName}</Text>
          <Text style={styles.wizardSubtitle}>Dynamic Underwriting & Insurer Pricing Rules</Text>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age (Years)</Text>
              <TextInput
                style={styles.textInput}
                value={String(quoteParams.age)}
                keyboardType="number-pad"
                onChangeText={(val) => setQuoteParams({ age: Number(val) || 30 })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.textInput}
                value={quoteParams.pincode}
                keyboardType="number-pad"
                onChangeText={(pincode) => setQuoteParams({ pincode })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sum Insured (Lakhs)</Text>
              <TextInput
                style={styles.textInput}
                value={String(quoteParams.sumInsured / 100000)}
                keyboardType="number-pad"
                onChangeText={(val) => setQuoteParams({ sumInsured: (Number(val) || 10) * 100000 })}
              />
            </View>
          </View>
        </View>

        {/* Floating Comparison Header */}
        {selectedComparisonQuoteIds.length > 0 && (
          <View style={styles.compareFloatBar}>
            <Text style={styles.compareCountText}>
              {selectedComparisonQuoteIds.length} Plans Selected for Comparison
            </Text>
            <TouchableOpacity
              style={styles.launchCompareButton}
              onPress={() => navigation.navigate('Comparison')}
            >
              <Text style={styles.launchCompareText}>Compare Now →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Generated Quotes List */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Calculated Quotes ({generatedQuotes.length} Insurers)</Text>
          <TouchableOpacity onPress={fetchQuotes}>
            <Text style={styles.recalcText}>🔄 Recalculate</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <LoadingState message="Calculating real-time quotes across 28+ insurers..." />
        ) : (
          generatedQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isSelectedForCompare={selectedComparisonQuoteIds.includes(quote.id)}
              onToggleCompare={toggleComparisonQuote}
              onSelectBuy={(selectedQuote) => {
                navigation.navigate('ProposalForm');
              }}
            />
          ))
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
  wizardCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  wizardTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  wizardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 8,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
  },
  compareFloatBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1B4B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  compareCountText: {
    ...TYPOGRAPHY.caption,
    color: '#A5B4FC',
    fontWeight: '700',
  },
  launchCompareButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  launchCompareText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  recalcText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
});
