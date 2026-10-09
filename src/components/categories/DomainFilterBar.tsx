import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { MacroDomain } from '../../types/categories';

const DOMAINS: MacroDomain[] = [
  'All',
  'Health & Wellness',
  'Life & Wealth',
  'Motor & Mobility',
  'Property & Specialty',
  'Business & Corporate',
];

interface DomainFilterBarProps {
  selectedDomain: MacroDomain;
  onSelectDomain: (domain: MacroDomain) => void;
}

export const DomainFilterBar: React.FC<DomainFilterBarProps> = ({
  selectedDomain,
  onSelectDomain,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {DOMAINS.map((domain) => {
        const isSelected = selectedDomain === domain;
        return (
          <TouchableOpacity
            key={domain}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelectDomain(domain)}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
              {domain}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  pillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});
