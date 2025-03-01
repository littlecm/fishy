import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Filter, TrendingUp } from 'lucide-react-native';

// Mock data for test history
const mockHistory = [
  {
    id: '1',
    date: 'May 15, 2025',
    time: '10:30 AM',
    tests: [
      { name: 'Ammonia', value: '0.0 ppm', status: 'good' },
      { name: 'Nitrite', value: '0.0 ppm', status: 'good' },
      { name: 'Nitrate', value: '5.0 ppm', status: 'good' },
      { name: 'pH', value: '7.2', status: 'good' }
    ]
  },
  {
    id: '2',
    date: 'May 8, 2025',
    time: '9:45 AM',
    tests: [
      { name: 'Ammonia', value: '0.25 ppm', status: 'warning' },
      { name: 'Nitrite', value: '0.0 ppm', status: 'good' },
      { name: 'Nitrate', value: '10.0 ppm', status: 'good' },
      { name: 'pH', value: '7.0', status: 'good' }
    ]
  },
  {
    id: '3',
    date: 'May 1, 2025',
    time: '11:15 AM',
    tests: [
      { name: 'Ammonia', value: '0.5 ppm', status: 'danger' },
      { name: 'Nitrite', value: '0.25 ppm', status: 'warning' },
      { name: 'Nitrate', value: '20.0 ppm', status: 'warning' },
      { name: 'pH', value: '6.8', status: 'good' }
    ]
  }
];

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.error;
      default:
        return colors.text;
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Test History</Text>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.card }]}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Filter size={18} color={colors.primary} />
          <Text style={[styles.filterText, { color: colors.primary }]}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.trendsButton, { backgroundColor: colors.primary }]}
      >
        <TrendingUp size={18} color="#fff" />
        <Text style={styles.trendsText}>View Trends</Text>
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {mockHistory.map((entry) => (
          <View 
            key={entry.id} 
            style={[styles.historyCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.historyHeader}>
              <View style={styles.dateContainer}>
                <Calendar size={16} color={colors.secondaryText} />
                <Text style={[styles.dateText, { color: colors.secondaryText }]}>
                  {entry.date} • {entry.time}
                </Text>
              </View>
            </View>
            
            <View style={styles.testResults}>
              {entry.tests.map((test, index) => (
                <View key={index} style={styles.testResult}>
                  <Text style={[styles.testName, { color: colors.text }]}>
                    {test.name}
                  </Text>
                  <Text 
                    style={[
                      styles.testValue, 
                      { color: getStatusColor(test.status) }
                    ]}
                  >
                    {test.value}
                  </Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.viewDetailsButton, { borderColor: colors.border }]}
            >
              <Text style={[styles.viewDetailsText, { color: colors.primary }]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  trendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  trendsText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  contentContainer: {
    padding: 16,
  },
  historyCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyHeader: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
  },
  testResults: {
    padding: 16,
  },
  testResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  testName: {
    fontWeight: '500',
  },
  testValue: {
    fontWeight: '600',
  },
  viewDetailsButton: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 12,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontWeight: '600',
  },
});