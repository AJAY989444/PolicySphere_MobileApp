import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RiskLevel } from '../../types/package4';
import { COLORS } from '../../constants/colors';

interface Props {
  riskScore: number;
  riskLevel: RiskLevel;
  flagsCount: number;
}

export const FraudAlertBanner: React.FC<Props> = ({ riskScore, riskLevel, flagsCount }) => {
  const getBannerColor = () => {
    switch (riskLevel) {
      case 'High':
      case 'Critical':
        return COLORS.error;
      case 'Medium':
        return COLORS.warning;
      case 'Low':
      default:
        return COLORS.accent;
    }
  };

  return (
    <View style={[styles.banner, { borderColor: getBannerColor() }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>AI Risk Evaluation Radar Score</Text>
        <View style={[styles.scoreBadge, { backgroundColor: getBannerColor() }]}>
          <Text style={styles.scoreText}>{riskScore} / 100</Text>
        </View>
      </View>

      <Text style={styles.subText}>
        Risk Classification: <Text style={{ color: getBannerColor(), fontWeight: '700' }}>{riskLevel} Risk</Text> ({flagsCount} security rule flags triggered)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700' },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  scoreText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  subText: { color: COLORS.textSecondary, fontSize: 11, marginTop: 4 },
});
