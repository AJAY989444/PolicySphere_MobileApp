import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

const STEPS = [
  'Search',
  'Compare',
  'Select',
  'Proposal',
  'KYC',
  'Payment',
  'Issued',
];

interface PurchaseWorkflowStepsProps {
  currentStepIndex: number; // 0 to 6
}

export const PurchaseWorkflowSteps: React.FC<PurchaseWorkflowStepsProps> = ({ currentStepIndex }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <View style={styles.stepRow}>
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <View key={step} style={styles.stepGroup}>
              <View
                style={[
                  styles.circle,
                  isDone && styles.circleDone,
                  isCurrent && styles.circleCurrent,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    (isDone || isCurrent) && styles.circleTextActive,
                  ]}
                >
                  {isDone ? '✓' : idx + 1}
                </Text>
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  isCurrent && styles.stepLabelCurrent,
                ]}
              >
                {step}
              </Text>
              {idx < STEPS.length - 1 && (
                <View style={[styles.line, isDone && styles.lineDone]} />
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  stepGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  circleDone: {
    backgroundColor: COLORS.accentDark,
    borderColor: COLORS.accent,
  },
  circleCurrent: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  circleText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  circleTextActive: {
    color: COLORS.textPrimary,
  },
  stepLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  stepLabelCurrent: {
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  line: {
    width: 16,
    height: 2,
    backgroundColor: COLORS.border,
    marginRight: 8,
  },
  lineDone: {
    backgroundColor: COLORS.accent,
  },
});
