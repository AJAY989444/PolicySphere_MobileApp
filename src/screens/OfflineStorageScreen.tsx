import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useOfflineStore } from '../store/useOfflineStore';
import { OfflineSyncBanner } from '../components/offline/OfflineSyncBanner';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'OfflineStorage'>;

export const OfflineStorageScreen: React.FC<Props> = ({ navigation }) => {
  const { stats, queue, isLoading, isSyncing, loadOfflineData, syncQueue } = useOfflineStore();

  useEffect(() => {
    loadOfflineData();
  }, []);

  const handleSyncPress = async () => {
    await syncQueue();
    Alert.alert('Offline Sync Complete', 'All pending offline mutations synced with PolicySphere Cloud DB.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offline Engine (Module 24)</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Offline Storage Banner */}
        {stats && (
          <OfflineSyncBanner stats={stats} isSyncing={isSyncing} onSync={handleSyncPress} />
        )}

        {/* Local Storage Stats Grid */}
        {stats && (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Cached Policies</Text>
              <Text style={styles.statValue}>{stats.cachedPoliciesCount} Items</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Cached Quotes</Text>
              <Text style={styles.statValue}>{stats.cachedQuotesCount} Items</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Memory Allocated</Text>
              <Text style={styles.statValue}>{stats.totalAllocatedMB} MB</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Last Cloud Sync</Text>
              <Text style={[styles.statValue, { fontSize: 11, color: COLORS.accent }]}>
                {stats.lastSyncedTimestamp}
              </Text>
            </View>
          </View>
        )}

        {/* Mutation Sync Queue */}
        <Text style={styles.sectionTitle}>Offline Mutation Queue ({queue.length})</Text>

        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : queue.length === 0 ? (
          <Text style={styles.emptyText}>All offline requests are fully synced ✓</Text>
        ) : (
          queue.map((item) => (
            <View key={item.id} style={styles.queueCard}>
              <View style={styles.qHeader}>
                <Text style={styles.qType}>[{item.actionType}]</Text>
                <Text style={styles.qStatus}>{item.status}</Text>
              </View>

              <Text style={styles.qSummary}>{item.payloadSummary}</Text>
              <Text style={styles.qTime}>Queued at: {item.timestamp}</Text>
            </View>
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
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: { width: '48%', backgroundColor: '#1E293B', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#334155' },
  statLabel: { color: COLORS.textSecondary, fontSize: 11 },
  statValue: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '800', marginTop: 4 },
  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 10 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  queueCard: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  qHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  qType: { color: COLORS.accent, fontWeight: '700', fontSize: 11 },
  qStatus: { color: COLORS.warning, fontWeight: '700', fontSize: 11 },
  qSummary: { color: COLORS.textPrimary, fontSize: 13, marginTop: 4 },
  qTime: { color: '#64748B', fontSize: 10, marginTop: 4 },
});
