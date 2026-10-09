import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SystemLogEntry } from '../../types/package7';
import { COLORS } from '../../constants/colors';

interface Props {
  logs: SystemLogEntry[];
}

export const StructuredLogViewer: React.FC<Props> = ({ logs }) => {
  const getLevelColor = (level: SystemLogEntry['level']) => {
    switch (level) {
      case 'SECURITY':
        return '#EC4899';
      case 'ERROR':
        return COLORS.error;
      case 'WARN':
        return COLORS.warning;
      case 'INFO':
      default:
        return COLORS.accent;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {logs.map((log) => (
        <View key={log.id} style={styles.logCard}>
          <View style={styles.header}>
            <View style={[styles.badge, { backgroundColor: getLevelColor(log.level) }]}>
              <Text style={styles.badgeText}>{log.level}</Text>
            </View>
            <Text style={styles.moduleText}>[{log.sourceModule}]</Text>
            <Text style={styles.timeText}>{log.timestamp}</Text>
          </View>

          <Text style={styles.msgText}>{log.message}</Text>
          <Text style={styles.jsonText}>{JSON.stringify(log.metaData)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logCard: { backgroundColor: '#0F172A', borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#334155' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  moduleText: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '700' },
  timeText: { color: '#64748B', fontSize: 10, marginLeft: 'auto' },
  msgText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 4, fontWeight: '600' },
  jsonText: { color: COLORS.textSecondary, fontSize: 10, fontFamily: 'Platform', marginTop: 2 },
});
