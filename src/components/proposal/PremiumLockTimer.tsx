import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

interface PremiumLockTimerProps {
  expiryTimestamp: number;
}

export const PremiumLockTimer: React.FC<PremiumLockTimerProps> = ({ expiryTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(Math.max(0, Math.floor((expiryTimestamp - Date.now()) / 1000)));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiryTimestamp - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>🔒 Premium Guaranteed & Locked</Text>
        <Text style={styles.subtitle}>Rate guaranteed against insurer price revisions</Text>
      </View>
      <View style={styles.timerBadge}>
        <Text style={styles.timerText}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1B4B',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4338CA',
    marginBottom: 16,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.bodyMedium,
    color: '#A5B4FC',
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: '#C7D2FE',
  },
  timerBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  timerText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
});
