import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AIRecommendation } from '../../types/package4';
import { COLORS } from '../../constants/colors';

interface Props {
  item: AIRecommendation;
  onSelect: (item: AIRecommendation) => void;
}

export const AIRecommendationCard: React.FC<Props> = ({ item, onSelect }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badgeRow}>
          <View style={styles.matchScoreBadge}>
            <Text style={styles.matchScoreText}>🤖 {item.matchScore}% AI Match</Text>
          </View>
          <View style={styles.riskBadge}>
            <Text style={styles.riskBadgeText}>{item.riskRating}</Text>
          </View>
        </View>
        <Text style={styles.policyName}>{item.policyName}</Text>
        <Text style={styles.insurerName}>{item.insurerName}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Cover</Text>
          <Text style={styles.statVal}>{item.coverageAmount}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Starting at</Text>
          <Text style={styles.statVal}>₹{item.monthlyPremium}/mo</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>TPA Approval Prob.</Text>
          <Text style={[styles.statVal, { color: COLORS.accent }]}>{item.claimProbabilityScore}%</Text>
        </View>
      </View>

      {/* Rationale Bullet Points */}
      <View style={styles.rationaleBox}>
        <Text style={styles.rationaleTitle}>Why AI Recommends This Policy:</Text>
        {item.rationale.map((r, idx) => (
          <Text key={idx} style={styles.rationaleItem}>
            • {r}
          </Text>
        ))}
      </View>

      {/* Plain English Policy Explainer */}
      <View style={styles.explainerBox}>
        <Text style={styles.explainerTitle}>💡 Plain-English Fine Print Summary</Text>
        <Text style={styles.explainerText}>{item.plainEnglishSummary}</Text>
      </View>

      <TouchableOpacity style={styles.selectBtn} onPress={() => onSelect(item)}>
        <Text style={styles.selectBtnText}>Select & Get Instant Quote →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  cardHeader: { marginBottom: 12 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  matchScoreBadge: {
    backgroundColor: COLORS.accentDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScoreText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  riskBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  riskBadgeText: { color: COLORS.textSecondary, fontSize: 11 },
  policyName: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700' },
  insurerName: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  statItem: { alignItems: 'center' },
  statLabel: { color: COLORS.textSecondary, fontSize: 10 },
  statVal: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 },
  rationaleBox: { marginBottom: 12 },
  rationaleTitle: { color: COLORS.primaryLight, fontSize: 12, fontWeight: '700', marginBottom: 4 },
  rationaleItem: { color: COLORS.textPrimary, fontSize: 12, marginBottom: 2 },
  explainerBox: {
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.warning,
    marginBottom: 14,
  },
  explainerTitle: { color: COLORS.warning, fontSize: 11, fontWeight: '700' },
  explainerText: { color: COLORS.textPrimary, fontSize: 12, marginTop: 4, lineHeight: 17 },
  selectBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
});
