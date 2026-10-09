import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAIStore } from '../store/useAIStore';
import { AIRecommendationCard } from '../components/ai/AIRecommendationCard';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'AIRecommendation'>;

export const AIRecommendationScreen: React.FC<Props> = ({ navigation }) => {
  const { recommendations, isLoading, loadRecommendations, calculatePrediction, predictedPremium } =
    useAIStore();

  const [age, setAge] = useState('32');
  const [sumInsured, setSumInsured] = useState('1000000');
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleRunPredictor = async () => {
    const a = parseInt(age, 10);
    const s = parseInt(sumInsured, 10);
    if (isNaN(a) || isNaN(s)) {
      Alert.alert('Invalid Inputs', 'Please provide numeric age and sum insured.');
      return;
    }
    setPredicting(true);
    await calculatePrediction('Health', a, s);
    setPredicting(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Engine & Matcher (Module 15)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* AI Banner */}
        <View style={styles.aiBanner}>
          <Text style={styles.bannerTitle}>🤖 Personalised Policy Recommendation Engine</Text>
          <Text style={styles.bannerSub}>
            Machine Learning algorithm evaluating 50+ risk factors, underwriting rules, and claim settlement probabilities.
          </Text>
        </View>

        {/* Dynamic Premium Predictor Card */}
        <View style={styles.predictorCard}>
          <Text style={styles.predictorTitle}>⚡ AI Premium Predictor & Risk Estimator</Text>
          <Text style={styles.predictorSub}>Calculate projected monthly premium based on age & coverage.</Text>

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.inputLabel}>Sum Insured (₹)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={sumInsured}
                onChangeText={setSumInsured}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.predictBtn} onPress={handleRunPredictor} disabled={predicting}>
            {predicting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.predictBtnText}>Calculate AI Predicted Premium</Text>
            )}
          </TouchableOpacity>

          {predictedPremium !== null && (
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>AI Projected Monthly Premium:</Text>
              <Text style={styles.resultVal}>₹{predictedPremium.toLocaleString('en-IN')}/mo</Text>
              <Text style={styles.confidenceText}>✓ 95% Underwriting Confidence Score</Text>
            </View>
          )}
        </View>

        {/* AI Matched Recommendations */}
        <Text style={styles.sectionTitle}>Top AI Recommended Policies ({recommendations.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          recommendations.map((rec) => (
            <AIRecommendationCard
              key={rec.id}
              item={rec}
              onSelect={() => {
                navigation.navigate('QuoteEngine', {
                  categoryName: `${rec.category} Insurance`,
                  categoryId: 'cat-1',
                });
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: { padding: 4 },
  backText: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600' },
  headerTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  aiBanner: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  bannerTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  bannerSub: { color: COLORS.borderLight, fontSize: 11, marginTop: 4, lineHeight: 16 },
  predictorCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  predictorTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 15 },
  predictorSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2, marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  inputLabel: { color: COLORS.textSecondary, fontSize: 11, marginBottom: 4 },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 8,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  predictBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  predictBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  resultBox: {
    marginTop: 12,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  resultLabel: { color: COLORS.textSecondary, fontSize: 11 },
  resultVal: { color: COLORS.accent, fontSize: 20, fontWeight: '800', marginTop: 2 },
  confidenceText: { color: COLORS.primaryLight, fontSize: 10, marginTop: 2 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 12 },
});
