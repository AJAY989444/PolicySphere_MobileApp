import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { HeaderBanner } from '../components/header/HeaderBanner';
import { DomainFilterBar } from '../components/categories/DomainFilterBar';
import { CategoryCard } from '../components/categories/CategoryCard';
import { CategoryDetailModal } from '../components/categories/CategoryDetailModal';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../constants/typography';
import { InsuranceCategory } from '../types/categories';
import { categoriesService } from '../services/categoriesService';
import { useCategoriesStore } from '../store/useCategoriesStore';

export const CategoriesCatalogScreen: React.FC = () => {
  const [categories, setCategories] = useState<InsuranceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const {
    selectedDomain,
    searchQuery,
    bookmarkedCategoryIds,
    selectedCategory,
    setSelectedDomain,
    setSearchQuery,
    toggleBookmark,
    setSelectedCategory,
  } = useCategoriesStore();

  useEffect(() => {
    categoriesService.getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const filteredCategories = categories.filter((cat) => {
    const matchesDomain = selectedDomain === 'All' || cat.domain === selectedDomain;
    const matchesQuery =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !showBookmarksOnly || bookmarkedCategoryIds.includes(cat.id);

    return matchesDomain && matchesQuery && matchesBookmark;
  });

  return (
    <View style={styles.container}>
      <HeaderBanner />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.headerTitleRow}>
            <View>
              <Text style={styles.screenTitle}>Insurance Categories</Text>
              <Text style={styles.screenSubtitle}>
                {categories.length} Categories across 5 Macro Domains
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.bookmarkToggle, showBookmarksOnly && styles.bookmarkToggleActive]}
              onPress={() => setShowBookmarksOnly(!showBookmarksOnly)}
            >
              <Text style={[styles.bookmarkToggleText, showBookmarksOnly && styles.bookmarkToggleTextActive]}>
                ★ {bookmarkedCategoryIds.length} Saved
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search 24 categories (e.g., Cyber, Floater, Travel)..."
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

        {/* Domain Filter Pills */}
        <DomainFilterBar selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />

        {/* Categories List */}
        {loading ? (
          <LoadingState message="Loading 24 insurance categories..." />
        ) : filteredCategories.length === 0 ? (
          <EmptyState
            title="No Categories Found"
            description="Try changing the domain filter tab, clearing search query, or disabling saved filter."
          />
        ) : (
          filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isBookmarked={bookmarkedCategoryIds.includes(cat.id)}
              onPress={(selected) => setSelectedCategory(selected)}
              onToggleBookmark={toggleBookmark}
            />
          ))
        )}
      </ScrollView>

      <CategoryDetailModal
        category={selectedCategory}
        visible={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
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
  headerSection: {
    marginBottom: 14,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bookmarkToggle: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookmarkToggleActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: COLORS.warning,
  },
  bookmarkToggleText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  bookmarkToggleTextActive: {
    color: COLORS.warning,
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
});
