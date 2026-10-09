import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { KPIStatSummary } from '../components/objectives/KPIStatSummary';
import { ObjectiveCard } from '../components/objectives/ObjectiveCard';
import { ObjectiveDetailModal } from '../components/objectives/ObjectiveDetailModal';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { ObjectiveCategory, PlatformObjective } from '../types/objectives';
import { objectivesService } from '../services/objectivesService';
import { useObjectivesStore } from '../store/useObjectivesStore';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type ObjectivesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Objectives'>;

interface ObjectivesDashboardScreenProps {
  navigation: ObjectivesNavigationProp;
}

const CATEGORIES: ObjectiveCategory[] = [
  'All',
  'Core Aggregation',
  'AI & Automation',
  'Customer Experience',
  'Operations & Enterprise',
];

export const ObjectivesDashboardScreen: React.FC<ObjectivesDashboardScreenProps> = ({ navigation }) => {
  const [objectives, setObjectives] = useState<PlatformObjective[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    selectedCategory,
    searchQuery,
    selectedObjective,
    setSelectedCategory,
    setSearchQuery,
    setSelectedObjective,
  } = useObjectivesStore();

  const overview = objectivesService.getKPIOverview();

  useEffect(() => {
    objectivesService.getObjectives().then((data) => {
      setObjectives(data);
      setLoading(false);
    });
  }, []);

  const filteredObjectives = objectives.filter((obj) => {
    const matchesCategory = selectedCategory === 'All' || obj.category === selectedCategory;
    const matchesQuery =
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Platform System Objectives</Text>
          <Text style={styles.screenSubtitle}>
            13 Architectural & Business Goals driving PolicySphere enterprise insurance engine.
          </Text>
          <TouchableOpacity
            style={styles.navCategoryButton}
            onPress={() => navigation.navigate('Categories')}
            activeOpacity={0.8}
          >
            <Text style={styles.navCategoryButtonText}>Browse 24 Insurance Categories →</Text>
          </TouchableOpacity>
        </View>

        <KPIStatSummary overview={overview} />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search objectives, codes, or microservices..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearch}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* List of Objectives */}
        {loading ? (
          <LoadingState message="Fetching system objectives..." />
        ) : filteredObjectives.length === 0 ? (
          <EmptyState
            title="No Objectives Match Filter"
            description="Try adjusting your search keyword or switching category tab."
          />
        ) : (
          filteredObjectives.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onPress={(selected) => setSelectedObjective(selected)}
            />
          ))
        )}
      </ScrollView>

      <ObjectiveDetailModal
        objective={selectedObjective}
        visible={!!selectedObjective}
        onClose={() => setSelectedObjective(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  scrollContent: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  navCategoryButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  navCategoryButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryLight,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.bodyMedium,
  },
  clearSearch: {
    padding: 6,
  },
  clearText: {
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  filterBar: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryLight,
  },
  filterText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});
