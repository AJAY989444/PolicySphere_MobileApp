import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuditLogEvent } from '../../types/package7';
import { COLORS } from '../../constants/colors';

interface Props {
  event: AuditLogEvent;
}

export const AuditTimelineItem: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.actionBadge}>
          <Text style={styles.actionText}>{event.action}</Text>
        </View>
        <Text style={styles.timeText}>{event.timestamp}</Text>
      </View>

      <Text style={styles.detailsText}>{event.details}</Text>

      <View style={styles.actorRow}>
        <Text style={styles.actorText}>Actor: {event.actorPersona} ({event.actorUserId})</Text>
        <Text style={styles.ipText}>IP: {event.ipAddress}</Text>
      </View>

      <View style={styles.hashBox}>
        <Text style={styles.hashLabel}>SHA-256 Hash:</Text>
        <Text style={styles.hashText} numberOfLines={1}>{event.sha256Hash}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionBadge: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  actionText: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '700' },
  timeText: { color: '#64748B', fontSize: 10 },
  detailsText: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '600', marginTop: 6 },
  actorRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  actorText: { color: COLORS.accent, fontSize: 11 },
  ipText: { color: COLORS.textSecondary, fontSize: 11 },
  hashBox: { backgroundColor: '#0F172A', padding: 6, borderRadius: 4, marginTop: 8 },
  hashLabel: { color: COLORS.warning, fontSize: 9, fontWeight: '700' },
  hashText: { color: COLORS.textSecondary, fontSize: 10, fontFamily: 'Platform' },
});
