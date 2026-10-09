import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { InsuranceCategory } from '../../types/categories';

interface CategoryCardProps {
  category: InsuranceCategory;
  isBookmarked: boolean;
  onPress: (cat: InsuranceCategory) => void;
  onToggleBookmark: (id: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isBookmarked,
  onPress,
  onToggleBookmark,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(category)} activeOpacity={0.85}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.icon}>{category.iconSymbol}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.codeText}>{category.code}</Text>
            <Text style={styles.nameText}>{category.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onToggleBookmark(category.id)}
          style={styles.bookmarkButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.bookmarkIcon, isBookmarked && styles.bookmarkIconActive]}>
            {isBookmarked ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.descriptionText} numberOfLines={2}>
        {category.description}
      </Text>

      <View style={styles.infoRow}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{category.domain}</Text>
        </View>
        {category.taxBenefit && (
          <View style={styles.taxBadge}>
            <Text style={styles.taxText}>{category.taxBenefit}</Text>
          </View>
        )}
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.coverageText}>
          Coverage: <Text style={styles.coverageValue}>{category.coverageRange}</Text>
        </Text>
        <Text style={styles.insurerCountText}>{category.activeInsurersCount} Insurers</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 26,
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
  bookmarkButton: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 22,
    color: COLORS.textSecondary,
  },
  bookmarkIconActive: {
    color: COLORS.warning,
  },
  descriptionText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagBadge: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  taxBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  taxText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  coverageText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  coverageValue: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  insurerCountText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
});
