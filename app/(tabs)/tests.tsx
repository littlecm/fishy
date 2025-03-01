import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Clock, ChevronRight } from 'lucide-react-native';

// Define test types
const testTypes = [
  {
    id: 'ammonia',
    name: 'Ammonia',
    description: 'Measures toxic ammonia levels in your aquarium',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    duration: 300, // 5 minutes in seconds
    steps: [
      'Fill the test tube to the 5ml mark with aquarium water',
      'Add 8 drops of Ammonia Test Solution #1',
      'Add 8 drops of Ammonia Test Solution #2',
      'Cap the tube and shake vigorously for 5 seconds',
      'Wait 5 minutes for the color to develop',
      'Compare the color to the chart to determine ammonia level'
    ]
  },
  {
    id: 'nitrite',
    name: 'Nitrite',
    description: 'Measures nitrite levels, which can be harmful to fish',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    duration: 300, // 5 minutes in seconds
    steps: [
      'Fill the test tube to the 5ml mark with aquarium water',
      'Add 5 drops of Nitrite Test Solution',
      'Cap the tube and shake vigorously for 5 seconds',
      'Wait 5 minutes for the color to develop',
      'Compare the color to the chart to determine nitrite level'
    ]
  },
  {
    id: 'nitrate',
    name: 'Nitrate',
    description: 'Measures nitrate levels, important for plant growth',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    duration: 300, // 5 minutes in seconds
    steps: [
      'Fill the test tube to the 5ml mark with aquarium water',
      'Add 10 drops of Nitrate Test Solution #1',
      'Cap the tube and invert several times to mix',
      'Vigorously shake the Nitrate Test Solution #2 for 30 seconds',
      'Add 10 drops of Nitrate Test Solution #2',
      'Cap the tube and shake vigorously for 1 minute',
      'Wait 5 minutes for the color to develop',
      'Compare the color to the chart to determine nitrate level'
    ]
  },
  {
    id: 'ph',
    name: 'pH',
    description: 'Measures the acidity or alkalinity of your aquarium water',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    duration: 60, // 1 minute in seconds
    steps: [
      'Fill the test tube to the 5ml mark with aquarium water',
      'Add 3 drops of pH Test Solution',
      'Cap the tube and shake to mix',
      'Wait 1 minute for the color to develop',
      'Compare the color to the chart to determine pH level'
    ]
  },
  {
    id: 'high-range-ph',
    name: 'High Range pH',
    description: 'For measuring pH levels above 7.6',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    duration: 60, // 1 minute in seconds
    steps: [
      'Fill the test tube to the 5ml mark with aquarium water',
      'Add 5 drops of High Range pH Test Solution',
      'Cap the tube and shake to mix',
      'Wait 1 minute for the color to develop',
      'Compare the color to the chart to determine pH level'
    ]
  }
];

export default function TestsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }]}>Water Test Kit</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Select a test to begin the process with guided instructions and timers
      </Text>
      
      {testTypes.map((test) => (
        <TouchableOpacity
          key={test.id}
          style={[styles.testCard, { backgroundColor: colors.card }]}
          onPress={() => router.push({
            pathname: '/test/[id]',
            params: { id: test.id }
          })}
        >
          <Image source={{ uri: test.image }} style={styles.testImage} />
          <View style={styles.testInfo}>
            <Text style={[styles.testName, { color: colors.text }]}>{test.name}</Text>
            <Text 
              style={[styles.testDescription, { color: colors.secondaryText }]}
              numberOfLines={2}
            >
              {test.description}
            </Text>
            <View style={styles.testMeta}>
              <View style={styles.duration}>
                <Clock size={14} color={colors.secondaryText} />
                <Text style={[styles.durationText, { color: colors.secondaryText }]}>
                  {Math.floor(test.duration / 60)} min
                </Text>
              </View>
            </View>
          </View>
          <ChevronRight size={20} color={colors.secondaryText} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  testCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  testImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  testInfo: {
    flex: 1,
    padding: 12,
  },
  testName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    marginLeft: 4,
  },
});