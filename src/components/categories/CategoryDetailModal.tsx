import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { InsuranceCategory } from '../../types/categories';

interface CategoryDetailModalProps {
  category: InsuranceCategory | null;
  visible: boolean;
  onClose: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  visible,
  onClose,
}) => {
  if (!category) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.icon}>{category.iconSymbol}</Text>
              <View style={styles.titleTextContainer}>
                <Text style={styles.codeText}>{category.code}</Text>
                <Text style={styles.titleText}>{category.name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Category Overview</Text>
            <Text style={styles.bodyText}>{category.description}</Text>

            <View style={styles.metaBox}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Macro Domain:</Text>
                <Text style={styles.metaValue}>{category.domain}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Coverage Scale:</Text>
                <Text style={styles.metaHighlight}>{category.coverageRange}</Text>
              </View>
              {category.taxBenefit && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Tax Deduction:</Text>
                  <Text style={styles.taxHighlight}>{category.taxBenefit}</Text>
                </View>
              )}
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Empaneled Insurers:</Text>
                <Text style={styles.metaValue}>{category.activeInsurersCount} Insurer Partners</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Key Product Benefits</Text>
            {category.keyBenefits.map((benefit, idx) => (
              <Text key={idx} style={styles.bulletItem}>
                • {benefit}
              </Text>
            ))}

            <Text style={styles.sectionLabel}>Required Parameters for Instant Quote</Text>
            <View style={styles.tagContainer}>
              {category.requiredQuoteFields.map((field, idx) => (
                <View key={idx} style={styles.fieldTag}>
                  <Text style={styles.fieldText}>📝 {field}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Popular Add-ons & Riders</Text>
            <View style={styles.tagContainer}>
              {category.popularAddOns.map((addon, idx) => (
                <View key={idx} style={styles.addonTag}>
                  <Text style={styles.addonText}>➕ {addon}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Explore {category.name} Quotes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    marginRight: 10,
  },
  titleTextContainer: {
    flex: 1,
  },
  codeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  titleText: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 6,
  },
  closeText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollBody: {
    marginVertical: 12,
  },
  sectionLabel: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginTop: 14,
    marginBottom: 6,
  },
  bodyText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  metaBox: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  metaLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  metaValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  metaHighlight: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  taxHighlight: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.accent,
    fontWeight: '700',
  },
  bulletItem: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    marginVertical: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  fieldTag: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
  },
  addonTag: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  addonText: {
    ...TYPOGRAPHY.caption,
    color: '#A5B4FC',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
