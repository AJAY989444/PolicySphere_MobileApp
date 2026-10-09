import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { ObjectiveKPIOverview } from '../../types/objectives';

interface KPIStatSummaryProps {
  overview: ObjectiveKPIOverview;
}

export const KPIStatSummary: React.FC<KPIStatSummaryProps> = ({ overview }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>System Goals & Architecture Metrics</Text>
      <View style={styles.gridContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{overview.totalObjectives}</Text>
          <Text style={styles.statLabel}>Core Objectives</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{overview.availabilitySLA}</Text>
          <Text style={styles.statLabel}>Target Uptime</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{overview.averageResponseSLA}</Text>
          <Text style={styles.statLabel}>API Response SLA</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{overview.digitalIssuanceTarget}</Text>
          <Text style={styles.statLabel}>Policy Issuance</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryLight,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
