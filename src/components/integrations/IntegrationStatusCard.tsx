import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThirdPartyIntegration } from '../../types/package6';
import { COLORS } from '../../constants/colors';

interface Props {
  item: ThirdPartyIntegration;
}

export const IntegrationStatusCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.providerName}>{item.providerName}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.apiStatus}</Text>
        </View>
      </View>

      <Text style={styles.categoryText}>Category: {item.category}</Text>

      <View style={styles.footer}>
        <Text style={styles.authText}>Auth: {item.authMethod}</Text>
        <Text style={styles.latencyText}>Latency: {item.latencyMs}ms</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  providerName: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14, flex: 1 },
  badge: { backgroundColor: '#064E3B', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { color: COLORS.accent, fontSize: 10, fontWeight: '700' },
  categoryText: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#334155' },
  authText: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '600' },
  latencyText: { color: COLORS.warning, fontSize: 11, fontWeight: '600' },
});
