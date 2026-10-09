import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ScalabilityEngine'>;

export const ScalabilityEngineScreen: React.FC<Props> = ({ navigation }) => {
  const [rps, setRps] = useState<number>(25000);

  // Derived metrics based on simulated RPS traffic
  const requiredNodes = Math.ceil(rps / 2500);
  const redisMemory = (rps * 0.08).toFixed(1);
  const activeDbShards = rps > 30000 ? 16 : rps > 15000 ? 8 : 4;
  const cacheHitRatio = rps > 40000 ? 98.4 : 96.2;

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scalability & Load Engine</Text>
        </View>

        {/* Scalability Overview Banner */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>📈 10M+ Registered User High-Scale Architecture</Text>
          <Text style={styles.overviewSub}>
            Stateless horizontal scaling, distributed Redis cluster, PostgreSQL sharding & read-replicas
          </Text>

          <View style={styles.kpiGrid}>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>10,000,000+</Text>
              <Text style={styles.kpiLabel}>Registered Users</Text>
            </View>

            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>500,000</Text>
              <Text style={styles.kpiLabel}>Concurrent Users</Text>
            </View>

            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>50,000</Text>
              <Text style={styles.kpiLabel}>Peak RPS Cap</Text>
            </View>
          </View>
        </View>

        {/* Traffic Load Simulator */}
        <View style={styles.simulatorCard}>
          <Text style={styles.simTitle}>🎛️ Live Traffic Simulator (Requests Per Second)</Text>
          <Text style={styles.simSub}>Adjust load to visualize horizontal auto-scaling and database sharding</Text>

          <View style={styles.rpsGauge}>
            <Text style={styles.rpsGaugeValue}>{rps.toLocaleString()} RPS</Text>
            <Text style={styles.rpsGaugeLabel}>Current Simulated Traffic</Text>
          </View>

          <View style={styles.presetButtonsRow}>
            {[5000, 15000, 25000, 40000, 50000].map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[styles.presetBtn, rps === preset && styles.presetBtnActive]}
                onPress={() => setRps(preset)}
              >
                <Text style={[styles.presetBtnText, rps === preset && styles.presetBtnTextActive]}>
                  {preset / 1000}k
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dynamic Topology Output */}
        <Text style={styles.sectionHeader}>Auto-Scaled Provisioning Topology</Text>

        <View style={styles.topologyCard}>
          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>Stateless Microservice Nodes:</Text>
            <Text style={styles.topoValue}>{requiredNodes} Pod Instances</Text>
          </View>

          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>PostgreSQL Database Shards:</Text>
            <Text style={styles.topoValue}>{activeDbShards} Shards (Hash Partitioned)</Text>
          </View>

          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>Read Replicas (ClickHouse/RDS):</Text>
            <Text style={styles.topoValue}>{Math.ceil(activeDbShards * 1.5)} Replicas Active</Text>
          </View>

          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>Redis Cluster RAM Usage:</Text>
            <Text style={styles.topoValue}>{redisMemory} GB</Text>
          </View>

          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>Cache Hit Ratio:</Text>
            <Text style={styles.topoValue}>{cacheHitRatio}%</Text>
          </View>

          <View style={styles.topoRow}>
            <Text style={styles.topoLabel}>Multi-Region Routing:</Text>
            <Text style={styles.topoValue}>AWS Anycast Global Accelerator</Text>
          </View>
        </View>
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
  overviewCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  overviewTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  overviewSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  kpiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  kpiValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  kpiLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
  },
  simulatorCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  simTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  simSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  rpsGauge: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  rpsGaugeValue: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primaryLight,
    fontSize: 24,
  },
  rpsGaugeLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  presetButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  presetBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presetBtnActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  presetBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  presetBtnTextActive: {
    color: COLORS.primaryLight,
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  topologyCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topoLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  topoValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
