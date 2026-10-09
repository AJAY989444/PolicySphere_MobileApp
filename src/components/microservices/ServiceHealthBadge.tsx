import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceHealthStatus, CircuitBreakerState } from '../../types/package6';
import { COLORS } from '../../constants/colors';

interface Props {
  health: ServiceHealthStatus;
  circuitBreaker: CircuitBreakerState;
}

export const ServiceHealthBadge: React.FC<Props> = ({ health, circuitBreaker }) => {
  const getHealthColor = () => {
    switch (health) {
      case 'Healthy':
        return COLORS.accent;
      case 'Degraded':
        return COLORS.warning;
      case 'Down':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: getHealthColor() }]}>
        <Text style={styles.badgeText}>{health}</Text>
      </View>
      <Text style={styles.cbText}>CB: {circuitBreaker}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'flex-end', gap: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  cbText: { color: COLORS.textSecondary, fontSize: 9 },
});
