import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DisasterRecovery'>;

interface BackupSnapshot {
  id: string;
  timestamp: string;
  type: 'Incremental WAL' | 'Full Snapshot';
  size: string;
  region: string;
  checksum: string;
}

export const DisasterRecoveryScreen: React.FC<Props> = ({ navigation }) => {
  const [failoverStep, setFailoverStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activePrimary, setActivePrimary] = useState<'Mumbai (ap-south-1)' | 'Singapore (ap-southeast-1)'>(
    'Mumbai (ap-south-1)'
  );

  const [snapshots] = useState<BackupSnapshot[]>([
    { id: 'snap-8891', timestamp: '10 mins ago', type: 'Incremental WAL', size: '42 MB', region: 'ap-southeast-1', checksum: 'sha256-e3b0c44...' },
    { id: 'snap-8890', timestamp: '15 mins ago', type: 'Incremental WAL', size: '38 MB', region: 'ap-southeast-1', checksum: 'sha256-8f4b2a...' },
    { id: 'snap-8889', timestamp: 'Today, 00:00 UTC', type: 'Full Snapshot', size: '1.42 GB', region: 'ap-southeast-1', checksum: 'sha256-9a1c3d...' },
  ]);

  const handleStartFailover = () => {
    setIsSimulating(true);
    setFailoverStep(1); // Detect outage

    setTimeout(() => {
      setFailoverStep(2); // Promote Standby DB
    }, 1200);

    setTimeout(() => {
      setFailoverStep(3); // Update DNS Route53 Health Checks
    }, 2400);

    setTimeout(() => {
      setFailoverStep(4); // Completed
      setIsSimulating(false);
      const newRegion = activePrimary.includes('Mumbai') ? 'Singapore (ap-southeast-1)' : 'Mumbai (ap-south-1)';
      setActivePrimary(newRegion);

      const msg = 'Simulated Disaster Failover Completed in 3.6s! Traffic rerouted to standby region: ' + newRegion;
      if (Platform.OS === 'web') {
        alert(msg);
      } else {
        Alert.alert('Disaster Recovery Complete', msg);
      }
    }, 3600);
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
          <Text style={styles.headerTitle}>Disaster Recovery & Continuity</Text>
        </View>

        {/* DR Objectives Card */}
        <View style={styles.drCard}>
          <Text style={styles.drTitle}>🛡️ RPO & RTO Business Continuity Targets</Text>
          <Text style={styles.drSub}>Cross-region automated replication and rapid failover SLA guarantees</Text>

          <View style={styles.targetGrid}>
            <View style={styles.targetItem}>
              <Text style={styles.targetHeader}>RPO Target</Text>
              <Text style={styles.targetVal}>{'< 5 Minutes'}</Text>
              <Text style={styles.targetActual}>Live: 2.1 Mins</Text>
            </View>

            <View style={styles.targetItem}>
              <Text style={styles.targetHeader}>RTO Target</Text>
              <Text style={styles.targetVal}>{'< 30 Minutes'}</Text>
              <Text style={styles.targetActual}>Live: 4.8 Mins</Text>
            </View>

            <View style={styles.targetItem}>
              <Text style={styles.targetHeader}>Backup Sync</Text>
              <Text style={styles.targetVal}>Streaming WAL</Text>
              <Text style={styles.targetActual}>Lag: 420 ms</Text>
            </View>
          </View>
        </View>

        {/* Primary/Standby Status */}
        <View style={styles.regionCard}>
          <Text style={styles.regionTitle}>🌐 Multi-Region High-Availability Status</Text>

          <View style={styles.regionRow}>
            <Text style={styles.regionLabel}>Active Primary Datacenter:</Text>
            <View style={styles.badgeActive}>
              <Text style={styles.badgeActiveText}>{activePrimary}</Text>
            </View>
          </View>

          <View style={styles.regionRow}>
            <Text style={styles.regionLabel}>Warm Standby Replica:</Text>
            <Text style={styles.standbyVal}>
              {activePrimary.includes('Mumbai') ? 'Singapore (ap-southeast-1)' : 'Mumbai (ap-south-1)'}
            </Text>
          </View>

          {/* Failover Action Button */}
          <TouchableOpacity
            style={[styles.failoverBtn, isSimulating && styles.failoverBtnDisabled]}
            onPress={handleStartFailover}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.failoverBtnText}>⚠️ Simulate Cross-Region Failover</Text>
            )}
          </TouchableOpacity>

          {/* Simulation Progression Log */}
          {failoverStep > 0 && (
            <View style={styles.failoverLogCard}>
              <Text style={styles.failoverLogTitle}>Failover Progression Log:</Text>
              <Text style={[styles.stepItem, failoverStep >= 1 && styles.stepDone]}>
                {failoverStep >= 1 ? '✅' : '⏳'} 1. Primary region outage simulated (AWS Route53 health check fail)
              </Text>
              <Text style={[styles.stepItem, failoverStep >= 2 && styles.stepDone]}>
                {failoverStep >= 2 ? '✅' : '⏳'} 2. Promoting PostgreSQL Read-Replica to Primary Read/Write
              </Text>
              <Text style={[styles.stepItem, failoverStep >= 3 && styles.stepDone]}>
                {failoverStep >= 3 ? '✅' : '⏳'} 3. Re-pointing Anycast DNS Ingress & Envoy Sidecars
              </Text>
              <Text style={[styles.stepItem, failoverStep >= 4 && styles.stepDone]}>
                {failoverStep >= 4 ? '✅' : '⏳'} 4. Failover complete! System serving traffic from Standby region.
              </Text>
            </View>
          )}
        </View>

        {/* Daily Snapshots & Backups */}
        <Text style={styles.sectionHeader}>Immutable S3 Backup Snapshots</Text>

        {snapshots.map((snap) => (
          <View key={snap.id} style={styles.snapCard}>
            <View style={styles.snapHeader}>
              <Text style={styles.snapId}>{snap.id}</Text>
              <Text style={styles.snapType}>{snap.type}</Text>
            </View>
            <View style={styles.snapDetails}>
              <Text style={styles.snapMeta}>Region: {snap.region} • Size: {snap.size}</Text>
              <Text style={styles.snapMeta}>{snap.timestamp}</Text>
            </View>
            <Text style={styles.snapChecksum}>Checksum: {snap.checksum}</Text>
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
  drCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  drTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 4,
  },
  drSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  targetGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  targetItem: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  targetHeader: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  targetVal: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    fontSize: 12,
    marginVertical: 2,
  },
  targetActual: {
    ...TYPOGRAPHY.caption,
    color: '#34D399',
    fontSize: 9,
    fontWeight: '700',
  },
  regionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  regionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  regionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  regionLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  badgeActive: {
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeActiveText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
  },
  standbyVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  failoverBtn: {
    backgroundColor: '#991B1B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  failoverBtnDisabled: {
    opacity: 0.6,
  },
  failoverBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  failoverLogCard: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  failoverLogTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    fontSize: 11,
    marginBottom: 6,
  },
  stepItem: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginVertical: 2,
  },
  stepDone: {
    color: '#34D399',
    fontWeight: '600',
  },
  sectionHeader: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryLight,
    marginBottom: 12,
  },
  snapCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  snapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  snapId: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  snapType: {
    color: COLORS.primaryLight,
    fontSize: 11,
    fontWeight: '600',
  },
  snapDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  snapMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  snapChecksum: {
    ...TYPOGRAPHY.caption,
    color: COLORS.border,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
