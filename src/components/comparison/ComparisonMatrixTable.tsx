import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { CalculatedQuote } from '../../types/package1';
import { comparisonService } from '../../services/comparisonService';

interface ComparisonMatrixTableProps {
  quotes: CalculatedQuote[];
}

export const ComparisonMatrixTable: React.FC<ComparisonMatrixTableProps> = ({ quotes }) => {
  const rows = comparisonService.generateComparisonMatrix(quotes);

  if (quotes.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator style={styles.tableScrollView}>
      <View style={styles.tableContainer}>
        {/* Header Row: Insurer Plans */}
        <View style={styles.tableHeaderRow}>
          <View style={styles.attributeColHeader}>
            <Text style={styles.headerLabelText}>Attribute Matrix</Text>
          </View>
          {quotes.map((q) => (
            <View key={q.id} style={styles.insurerColHeader}>
              <Text style={styles.insurerLogo}>{q.insurerLogo}</Text>
              <Text style={styles.insurerNameText}>{q.insurerName}</Text>
              <Text style={styles.planNameText}>{q.planName}</Text>
            </View>
          ))}
        </View>

        {/* Matrix Data Rows */}
        {rows.map((row, idx) => (
          <View
            key={idx}
            style={[styles.tableDataRow, row.isHighlightDifference && styles.highlightRow]}
          >
            <View style={styles.attributeColCell}>
              <Text style={styles.attributeNameText}>{row.attributeName}</Text>
            </View>
            {quotes.map((q) => (
              <View key={q.id} style={styles.insurerColCell}>
                <Text style={styles.cellValueText}>{String(row.values[q.id] || '-')}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableScrollView: {
    marginVertical: 12,
  },
  tableContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  attributeColHeader: {
    width: 150,
    padding: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  headerLabelText: {
    ...TYPOGRAPHY.h3,
    fontSize: 13,
    color: COLORS.primaryLight,
  },
  insurerColHeader: {
    width: 140,
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  insurerLogo: {
    fontSize: 24,
    marginBottom: 4,
  },
  insurerNameText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  planNameText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  tableDataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  highlightRow: {
    backgroundColor: 'rgba(30, 58, 138, 0.25)',
  },
  attributeColCell: {
    width: 150,
    padding: 10,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  attributeNameText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  insurerColCell: {
    width: 140,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  cellValueText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
