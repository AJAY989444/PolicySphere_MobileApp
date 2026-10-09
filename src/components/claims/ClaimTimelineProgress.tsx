import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClaimStage } from '../../types/package3';
import { COLORS } from '../../constants/colors';

const STAGES: ClaimStage[] = [
  'Intimated',
  'Documents Uploaded',
  'Under Verification',
  'Surveyor Assigned',
  'Approved',
  'Settled',
];

interface Props {
  currentStage: ClaimStage;
  timeline: Array<{ stage: ClaimStage; timestamp: string; note: string }>;
}

export const ClaimTimelineProgress: React.FC<Props> = ({ currentStage, timeline }) => {
  const currentStageIndex = STAGES.indexOf(currentStage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Claim Resolution Lifecycle (8-Stage Tracker)</Text>
      {STAGES.map((stage, idx) => {
        const isPassed = idx <= (currentStageIndex === -1 ? 0 : currentStageIndex);
        const isCurrent = idx === currentStageIndex;
        const eventInfo = timeline.find((t) => t.stage === stage);

        return (
          <View key={stage} style={styles.timelineRow}>
            <View style={styles.indicatorCol}>
              <View
                style={[
                  styles.circle,
                  isPassed && styles.circlePassed,
                  isCurrent && styles.circleCurrent,
                ]}
              >
                <Text style={styles.circleText}>{idx + 1}</Text>
              </View>
              {idx < STAGES.length - 1 && (
                <View style={[styles.line, isPassed && styles.linePassed]} />
              )}
            </View>
            <View style={styles.contentCol}>
              <Text style={[styles.stageName, isPassed && styles.stageNamePassed]}>
                {stage} {isCurrent ? '(Active Status)' : ''}
              </Text>
              {eventInfo ? (
                <View style={styles.detailsCard}>
                  <Text style={styles.timestamp}>{eventInfo.timestamp}</Text>
                  <Text style={styles.note}>{eventInfo.note}</Text>
                </View>
              ) : (
                <Text style={styles.pendingText}>Pending next SLA phase</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 32,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePassed: {
    backgroundColor: COLORS.accent,
  },
  circleCurrent: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  circleText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 32,
    backgroundColor: '#334155',
    marginVertical: 4,
  },
  linePassed: {
    backgroundColor: COLORS.accent,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  stageNamePassed: {
    color: COLORS.textPrimary,
  },
  detailsCard: {
    marginTop: 4,
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  pendingText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
    marginTop: 2,
  },
});
