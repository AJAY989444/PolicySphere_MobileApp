import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StorageStats } from '../../types/package6';
import { COLORS } from '../../constants/colors';

interface Props {
  stats: StorageStats;
  isSyncing: boolean;
  onSync: () => void;
}

export const OfflineSyncBanner: React.FC<Props> = ({ stats, isSyncing, onSync }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.infoCol}>
        <Text style={styles.title}>💾 Local Storage & Offline Engine</Text>
        <Text style={styles.subText}>
          {stats.usedMemoryMB} MB / {stats.totalAllocatedMB} MB • {stats.pendingSyncQueueCount} queued items pending sync
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.syncBtn, isSyncing && styles.btnDisabled]}
        onPress={onSync}
        disabled={isSyncing || stats.pendingSyncQueueCount === 0}
      >
        {isSyncing ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.syncText}>
            {stats.pendingSyncQueueCount > 0 ? 'Sync Queue' : 'Synced ✓'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  infoCol: { flex: 1, marginRight: 10 },
  title: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  subText: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  syncBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  btnDisabled: { opacity: 0.5 },
  syncText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});
