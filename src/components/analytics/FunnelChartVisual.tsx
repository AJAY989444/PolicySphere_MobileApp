import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FunnelStage } from '../../types/package5';
import { COLORS } from '../../constants/colors';

interface Props {
  stages: FunnelStage[];
}

export const FunnelChartVisual: React.FC<Props> = ({ stages }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 User Conversion Funnel (Search → Issued)</Text>
      {stages.map((stg, idx) => (
        <View key={stg.stageName} style={styles.stageRow}>
          <View style={styles.labelRow}>
            <Text style={styles.stageName}>
              {idx + 1}. {stg.stageName}
            </Text>
            <Text style={styles.stageStats}>
              {stg.usersCount.toLocaleString('en-IN')} Users ({stg.conversionPercent}%)
            </Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${stg.conversionPercent}%` },
                idx === 0 && { backgroundColor: COLORS.info },
                idx === 1 && { backgroundColor: COLORS.primaryLight },
                idx === 2 && { backgroundColor: COLORS.warning },
                idx === 3 && { backgroundColor: '#8B5CF6' },
                idx === 4 && { backgroundColor: COLORS.accent },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 14 },
  stageRow: { marginBottom: 12 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  stageName: { color: COLORS.textPrimary, fontSize: 12, fontWeight: '600' },
  stageStats: { color: COLORS.accent, fontSize: 11, fontWeight: '700' },
  track: { height: 12, backgroundColor: '#0F172A', borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6 },
});
