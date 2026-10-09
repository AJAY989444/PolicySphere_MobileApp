import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { PlatformObjective } from '../../types/objectives';

interface ObjectiveDetailModalProps {
  objective: PlatformObjective | null;
  visible: boolean;
  onClose: () => void;
}

export const ObjectiveDetailModal: React.FC<ObjectiveDetailModalProps> = ({
  objective,
  visible,
  onClose,
}) => {
  if (!objective) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.icon}>{objective.iconSymbol}</Text>
              <View>
                <Text style={styles.codeText}>{objective.code}</Text>
                <Text style={styles.titleText}>{objective.name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Overview & Purpose</Text>
            <Text style={styles.bodyText}>{objective.description}</Text>

            <Text style={styles.sectionLabel}>Target Metric & SLA</Text>
            <View style={styles.slaContainer}>
              <View style={styles.slaRow}>
                <Text style={styles.slaLabel}>Metric Name:</Text>
                <Text style={styles.slaValue}>{objective.sla.metricName}</Text>
              </View>
              <View style={styles.slaRow}>
                <Text style={styles.slaLabel}>Target SLA Value:</Text>
                <Text style={styles.slaValueHighlight}>{objective.sla.targetValue}</Text>
              </View>
              <View style={styles.slaRow}>
                <Text style={styles.slaLabel}>System Status:</Text>
                <Text style={styles.statusOptimal}>{objective.sla.currentStatus}</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>Sub-Capabilities & Features</Text>
            <View style={styles.tagContainer}>
              {objective.featuresList.map((feature, idx) => (
                <View key={idx} style={styles.featureTag}>
                  <Text style={styles.featureText}>✓ {feature}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Target User Personas</Text>
            <View style={styles.tagContainer}>
              {objective.targetRoles.map((role, idx) => (
                <View key={idx} style={styles.roleTag}>
                  <Text style={styles.roleText}>{role}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Associated Microservices</Text>
            <View style={styles.serviceContainer}>
              {objective.associatedMicroservices.map((svc, idx) => (
                <View key={idx} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>⚙️ {svc}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Text style={styles.actionButtonText}>Close Modal</Text>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
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
    padding: 8,
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
  slaContainer: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  slaLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  slaValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  slaValueHighlight: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.accent,
    fontWeight: '700',
  },
  statusOptimal: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.accent,
    fontWeight: '700',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  featureTag: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
  },
  roleTag: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  roleText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  serviceTag: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  serviceText: {
    ...TYPOGRAPHY.caption,
    color: '#A5B4FC',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
