import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { ENV } from '../../config/env';
import { RootStackParamList } from '../../navigation/RootNavigator';

export const HeaderBanner: React.FC = () => {
  let navigation: NativeStackNavigationProp<RootStackParamList> | null = null;
  try {
    navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  } catch (e) {
    // Fallback if rendered outside NavigationContainer
  }

  const handleGoHome = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.navigate('Marketplace');
    }
  };

  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <TouchableOpacity style={styles.logoGroup} onPress={handleGoHome} activeOpacity={0.8}>
          <Text style={styles.logoText}>PolicySphere</Text>
          <View style={styles.envBadge}>
            <Text style={styles.envText}>{ENV.envName.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>

        {navigation && navigation.canGoBack() && (
          <View style={styles.navActionsRow}>
            <TouchableOpacity style={styles.navButton} onPress={handleGoBack}>
              <Text style={styles.navButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, styles.homeButton]} onPress={handleGoHome}>
              <Text style={styles.navButtonText}>🏠 Marketplace</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.subtitle}>Digital Insurance Marketplace</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    color: COLORS.primaryLight,
    letterSpacing: 0.5,
    marginRight: 8,
  },
  envBadge: {
    backgroundColor: COLORS.accentDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  envText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  navActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  homeButton: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryLight,
  },
  navButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
