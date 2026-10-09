import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { APITrafficLog } from '../../types/package6';
import { COLORS } from '../../constants/colors';

interface Props {
  logs: APITrafficLog[];
}

export const APIInspectorConsole: React.FC<Props> = ({ logs }) => {
  return (
    <View style={styles.consoleContainer}>
      <Text style={styles.consoleTitle}>💻 Real-Time API Traffic & Interceptor Log</Text>
      <ScrollView style={styles.logList}>
        {logs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <View style={styles.headerRow}>
              <View style={styles.protoBadge}>
                <Text style={styles.protoText}>{log.protocol} {log.method}</Text>
              </View>
              <Text style={styles.statusText}>HTTP {log.status} ({log.latencyMs}ms)</Text>
            </View>

            <Text style={styles.urlText}>{log.url}</Text>
            {log.idempotencyKey && (
              <Text style={styles.idempText}>X-Idempotency-Key: {log.idempotencyKey}</Text>
            )}

            <View style={styles.payloadBox}>
              <Text style={styles.payloadText} numberOfLines={2}>{log.responsePayload}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  consoleContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  consoleTitle: { color: COLORS.accent, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  logList: { maxHeight: 220 },
  logItem: { backgroundColor: '#1E293B', padding: 10, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#334155' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  protoBadge: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  protoText: { color: COLORS.primaryLight, fontSize: 10, fontWeight: '700' },
  statusText: { color: COLORS.accent, fontSize: 11, fontWeight: '700' },
  urlText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 4, fontFamily: 'Platform' },
  idempText: { color: COLORS.warning, fontSize: 10, marginTop: 2 },
  payloadBox: { backgroundColor: '#0F172A', padding: 6, borderRadius: 4, marginTop: 4 },
  payloadText: { color: COLORS.textSecondary, fontSize: 10, fontFamily: 'Platform' },
});
