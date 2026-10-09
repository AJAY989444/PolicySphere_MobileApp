import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ReportCategory } from '../../types/package5';
import { COLORS } from '../../constants/colors';

interface Props {
  selectedCategory: ReportCategory;
  onSelectCategory: (cat: ReportCategory) => void;
}

const CATEGORIES: ReportCategory[] = [
  'Sales',
  'Renewals',
  'Claims',
  'Fraud',
  'Commission',
  'Tax80D',
  'Operational',
];

export const ReportFilterBar: React.FC<Props> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
          onPress={() => onSelectCategory(cat)}
        >
          <Text style={[styles.text, selectedCategory === cat && styles.textSelected]}>
            {cat} Reports
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingVertical: 10 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  text: { color: COLORS.textSecondary, fontSize: 12 },
  textSelected: { color: '#FFFFFF', fontWeight: '700' },
});
