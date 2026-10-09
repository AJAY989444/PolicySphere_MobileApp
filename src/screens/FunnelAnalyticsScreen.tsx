import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { FunnelChartVisual } from '../components/analytics/FunnelChartVisual';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'FunnelAnalytics'>;

export const FunnelAnalyticsScreen: React.FC<Props> = ({ navigation }) => {
  const { funnelStages, kpis, isLoading, loadAnalyticsData } = useAnalyticsStore();

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Funnel & Platform Analytics (Module 32)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* KPI Dashboard Cards */}
        {kpis && (
          <View style={styles.kpiGrid}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Daily Active Users (DAU)</Text>
              <Text style={styles.kpiValue}>{kpis.dailyActiveUsers.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Monthly Active (MAU)</Text>
              <Text style={styles.kpiValue}>{kpis.monthlyActiveUsers.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Total Premium Volume</Text>
              <Text style={[styles.kpiValue, { color: COLORS.accent }]}>
                ₹{(kpis.totalPremiumCollected / 10000000).toFixed(2)} Cr
              </Text>
            </View>

            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Retention Rate / NPS</Text>
              <Text style={[styles.kpiValue, { color: COLORS.primaryLight }]}>
                {kpis.retentionRate}% / {kpis.npsScore}
              </Text>
            </View>
          </View>
        )}

        {/* Visual Conversion Funnel Chart */}
        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : (
          <FunnelChartVisual stages={funnelStages} />
        )}

        {/* Customer Lifetime Value & Health */}
        {kpis && (
          <View style={styles.healthCard}>
            <Text style={styles.healthTitle}>🌱 Customer Lifetime Value (CLV) & Churn Risk</Text>
            <Text style={styles.healthText}>
              • Average CLV per Customer: ₹{kpis.averageCLV.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.healthText}>
              • Claims Settlement Ratio: {kpis.claimsRatio}% (Industry Leader)
            </Text>
            <Text style={styles.healthText}>• Churn Risk Probability: 2.1% (Low Churn Risk)</Text>
          </View>
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
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  kpiCard: { width: '48%', backgroundColor: '#1E293B', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#334155' },
  kpiLabel: { color: COLORS.textSecondary, fontSize: 11 },
  kpiValue: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', marginTop: 4 },
  healthCard: { backgroundColor: '#1E293B', borderRadius: 12, padding: 14, marginTop: 16, borderWidth: 1, borderColor: '#334155' },
  healthTitle: { color: COLORS.accent, fontWeight: '700', fontSize: 14, marginBottom: 6 },
  healthText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 4 },
});
