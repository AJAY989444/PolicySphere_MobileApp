import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaskedField } from '../../types/package7';
import { COLORS } from '../../constants/colors';

interface Props {
  field: MaskedField;
}

export const DataMaskingPreviewCard: React.FC<Props> = ({ field }) => {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.fieldName}>{field.fieldName}</Text>
        <View style={styles.encBadge}>
          <Text style={styles.encBadgeText}>🔒 {field.encryptionAlgorithm}</Text>
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.valText}>
          {showRaw ? field.rawValue : field.maskedValue}
        </Text>

        <TouchableOpacity style={styles.toggleBtn} onPress={() => setShowRaw(!showRaw)}>
          <Text style={styles.toggleText}>{showRaw ? '🙈 Mask' : '👁️ Reveal'}</Text>
        </TouchableOpacity>
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
  fieldName: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 13 },
  encBadge: { backgroundColor: COLORS.primaryDark, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  encBadgeText: { color: COLORS.primaryLight, fontSize: 10, fontWeight: '700' },
  valueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, backgroundColor: '#0F172A', padding: 8, borderRadius: 6 },
  valText: { color: COLORS.accent, fontSize: 13, fontFamily: 'Platform', fontWeight: '600' },
  toggleBtn: { backgroundColor: '#334155', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  toggleText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: '600' },
});
