import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LeadStage } from '../../types/package4';
import { COLORS } from '../../constants/colors';

interface Props {
  stage: LeadStage;
}

export const LeadStatusBadge: React.FC<Props> = ({ stage }) => {
  const getBadgeColor = () => {
    switch (stage) {
      case 'New Lead':
        return COLORS.info;
      case 'Requirement Analysis':
        return COLORS.warning;
      case 'Quote Sent':
        return COLORS.primaryLight;
      case 'Underwriting':
        return '#8B5CF6';
      case 'Converted':
        return COLORS.accent;
      case 'Lost':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
      <Text style={styles.text}>{stage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
