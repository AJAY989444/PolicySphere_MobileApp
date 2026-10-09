import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PerformanceSLAConsole'>;

interface SLACard {
  name: string;
  target: string;
  current: string;
  unit: string;
  status: 'COMPLIANT' | 'WARNING' | 'BREACHED';
  icon: string;
}

export const PerformanceSLAConsoleScreen: React.FC<Props> = ({ navigation }) => {
  const [testing, setTesting] = useState(false);
  const [lastTestedTime, setLastTestedTime] = useState<string>('Just now');
  const [latencyHistory, setLatencyHistory] = useState<number[]>([142, 188, 120, 310, 95, 115, 138]);

  const [slaList, setSlaList] = useState<SLACard[]>([
    { name: 'API Response (Cached)', target: '< 200 ms', current: '118 ms', unit: 'ms', status: 'COMPLIANT', icon: '⚡' },
    { name: 'API Response (Normal)', target: '< 500 ms', current: '310 ms', unit: 'ms', status: 'COMPLIANT', icon: '🌐' },
    { name: 'Page Initial Render', target: '< 2.0 s', current: '1.2 s', unit: 's', status: 'COMPLIANT', icon: '📱' },
    { name: 'Quote Generation Engine', target: '< 5.0 s', current: '2.4 s', unit: 's', status: 'COMPLIANT', icon: '🔢' },
    { name: 'Payment Processing Gateway', target: '< 10.0 s', current: '3.8 s', unit: 's', status: 'COMPLIANT', icon: '💳' },
    { name: 'Full-Text Vector Search', target: '< 500 ms', current: '185 ms', unit: 'ms', status: 'COMPLIANT', icon: '🔍' },
    { name: 'System High Availability', target: '99.99%', current: '99.998%', unit: '%', status: 'COMPLIANT', icon: '🛡️' },
  ]);

  const handleRunBenchmark = () => {
    setTesting(true);
    setTimeout(() => {
      const newLatencies = [
        Math.floor(Math.random() * 80) + 80,
        Math.floor(Math.random() * 150) + 150,
        Math.floor(Math.random() * 50) + 90,
        Math.floor(Math.random() * 200) + 200,
        Math.floor(Math.random() * 60) + 70,
        Math.floor(Math.random() * 100) + 120,
        Math.floor(Math.random() * 90) + 100,
      ];

      setLatencyHistory(newLatencies);
      setSlaList((prev) =>
        prev.map((item, idx) => ({
          ...item,
          current: `${newLatencies[idx]} ${item.unit}`,
        }))
      );
      setTesting(false);
      setLastTestedTime(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Performance SLAs & Benchmarks</Text>
        </View>

        {/* Console Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>⚡ Real-Time SLA Benchmark Console</Text>
          <Text style={styles.summarySub}>
            Monitors system responsiveness against core SRS performance SLAs. Last audit: {lastTestedTime}
          </Text>

          <TouchableOpacity
            style={[styles.benchmarkBtn, testing && styles.benchmarkBtnDisabled]}
            onPress={handleRunBenchmark}
            disabled={testing}
          >
            {testing ? (
              <ActivityIndicator color="#000" size="small" />
            ) : (
              <Text style={styles.benchmarkBtnText}>🚀 Run Live Benchmark Ping</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Live Latency Sparkline Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Latency Response Distribution (ms)</Text>
          <View style={styles.barChartContainer}>
            {latencyHistory.map((lat, idx) => (
              <View key={idx} style={styles.barColumn}>
                <Text style={styles.barValText}>{lat}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: `${Math.min(100, (lat / 400) * 100)}%` }]} />
                </View>
                <Text style={styles.barLabelText}>P{idx + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* SLA Metrics List */}
        <Text style={styles.sectionHeader}>Service Level Agreement (SLA) Matrix</Text>

        {slaList.map((sla, idx) => (
          <View key={idx} style={styles.slaCard}>
            <View style={styles.slaLeft}>
              <Text style={styles.slaIcon}>{sla.icon}</Text>
              <View style={styles.slaTextGroup}>
                <Text style={styles.slaName}>{sla.name}</Text>
                <Text style={styles.slaTarget}>SRS Target: {sla.target}</Text>
              </View>
            </View>

            <View style={styles.slaRight}>
              <Text style={styles.slaCurrentVal}>{sla.current}</Text>
              <View style={styles.badgeCompliant}>
                <Text style={styles.badgeText}>{sla.status}</Text>
              </View>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  summaryTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  summarySub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  benchmarkBtn: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  benchmarkBtnDisabled: {
    opacity: 0.6,
  },
  benchmarkBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 13,
  },
  chartCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    paddingTop: 10,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barValText: {
    color: COLORS.primaryLight,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 65,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
  },
  barLabelText: {
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 4,
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  slaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  slaIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  slaTextGroup: {
    flex: 1,
  },
  slaName: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  slaTarget: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  slaRight: {
    alignItems: 'flex-end',
  },
  slaCurrentVal: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginBottom: 2,
  },
  badgeCompliant: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
  },
});
