import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { MarketplaceFilterState } from '../../types/package1';

interface MarketplaceFilterDrawerProps {
  visible: boolean;
  filters: MarketplaceFilterState;
  onApply: (filters: Partial<MarketplaceFilterState>) => void;
  onReset: () => void;
  onClose: () => void;
}

export const MarketplaceFilterDrawer: React.FC<MarketplaceFilterDrawerProps> = ({
  visible,
  filters,
  onApply,
  onReset,
  onClose,
}) => {
  const [localFilters, setLocalFilters] = React.useState<MarketplaceFilterState>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.drawerCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters (SRS Marketplace)</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Cashless Hospitals Toggle */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleTextGroup}>
                <Text style={styles.filterLabel}>Cashless Hospitals Only</Text>
                <Text style={styles.filterSub}>Only insurers with cashless desk network</Text>
              </View>
              <Switch
                value={localFilters.cashlessHospitalsOnly}
                onValueChange={(val) =>
                  setLocalFilters({ ...localFilters, cashlessHospitalsOnly: val })
                }
                thumbColor={COLORS.primaryLight}
              />
            </View>

            {/* Room Rent Limit */}
            <Text style={styles.sectionTitle}>Room Rent Limit</Text>
            <View style={styles.pillContainer}>
              {['All', 'No Capping', 'Single AC Room', 'Shared Room'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.filterPill,
                    localFilters.roomRentLimit === opt && styles.filterPillActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, roomRentLimit: opt })}
                >
                  <Text
                    style={[
                      styles.pillText,
                      localFilters.roomRentLimit === opt && styles.pillTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Co-Payment Preference */}
            <Text style={styles.sectionTitle}>Co-Payment Preference</Text>
            <View style={styles.pillContainer}>
              {['All', 'Zero Co-Pay', '10% Co-Pay', '20% Co-Pay'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.filterPill,
                    localFilters.copayPreference === opt && styles.filterPillActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, copayPreference: opt })}
                >
                  <Text
                    style={[
                      styles.pillText,
                      localFilters.copayPreference === opt && styles.pillTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Minimum Claim Settlement Ratio */}
            <Text style={styles.sectionTitle}>Minimum Claim Ratio (CSR)</Text>
            <View style={styles.pillContainer}>
              {[90, 95, 97, 98].map((csr) => (
                <TouchableOpacity
                  key={csr}
                  style={[
                    styles.filterPill,
                    localFilters.minClaimRatio === csr && styles.filterPillActive,
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, minClaimRatio: csr })}
                >
                  <Text
                    style={[
                      styles.pillText,
                      localFilters.minClaimRatio === csr && styles.pillTextActive,
                    ]}
                  >
                    ≥ {csr}% CSR
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.resetButton} onPress={onReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                onApply(localFilters);
                onClose();
              }}
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  drawerCard: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  closeText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollBody: {
    marginVertical: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  toggleTextGroup: {
    flex: 1,
  },
  filterLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  filterSub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 14,
    color: COLORS.primaryLight,
    marginTop: 14,
    marginBottom: 8,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterPill: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  pillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  pillTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 8,
    marginRight: 8,
  },
  resetText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  applyText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
