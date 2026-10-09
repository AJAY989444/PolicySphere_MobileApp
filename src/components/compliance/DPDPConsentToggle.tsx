import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { DPDPConsentItem } from '../../types/package7';
import { COLORS } from '../../constants/colors';

interface Props {
  item: DPDPConsentItem;
  onToggle: (id: string) => void;
}

export const DPDPConsentToggle: React.FC<Props> = ({ item, onToggle }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            {item.isMandatory && <Text style={styles.reqBadge}>Mandatory</Text>}
          </View>
          <Text style={styles.purpose}>{item.purpose}</Text>
        </View>

        <Switch
          value={item.isGranted}
          onValueChange={() => onToggle(item.id)}
          disabled={item.isMandatory}
          trackColor={{ false: '#334155', true: COLORS.accent }}
          thumbColor="#FFFFFF"
        />
      </View>

      <Text style={styles.timestamp}>Consent Timestamp: {item.grantedTimestamp}</Text>
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
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 13, flex: 1 },
  reqBadge: { backgroundColor: COLORS.warning, color: '#FFFFFF', fontSize: 9, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  purpose: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4, lineHeight: 16 },
  timestamp: { color: '#64748B', fontSize: 10, marginTop: 8 },
});
