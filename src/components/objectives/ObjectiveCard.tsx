import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { PlatformObjective } from '../../types/objectives';

interface ObjectiveCardProps {
  objective: PlatformObjective;
  onPress: (obj: PlatformObjective) => void;
}

export const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ objective, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(objective)}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.icon}>{objective.iconSymbol}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.codeText}>{objective.code}</Text>
            <Text style={styles.nameText}>{objective.name}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{objective.sla.currentStatus}</Text>
        </View>
      </View>

      <Text style={styles.descriptionText} numberOfLines={2}>
        {objective.description}
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{objective.category}</Text>
        </View>
        <Text style={styles.slaText}>
          {objective.sla.metricName}: <Text style={styles.slaValue}>{objective.sla.targetValue}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  codeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  nameText: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '600',
  },
  descriptionText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  slaText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  slaValue: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});
