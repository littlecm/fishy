import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Bell, Clock, Trash2, CircleHelp as HelpCircle, ExternalLink } from 'lucide-react-native';

export default function SettingsScreen() {
  const { colors, theme, setTheme, isDark } = useTheme();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>
          APPEARANCE
        </Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setTheme('light')}
          >
            <View style={styles.settingLeft}>
              <Sun size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Light Mode</Text>
            </View>
            <View style={[
              styles.radioButton, 
              theme === 'light' && { borderColor: colors.primary }
            ]}>
              {theme === 'light' && (
                <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
              )}
            </View>
          </TouchableOpacity>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setTheme('dark')}
          >
            <View style={styles.settingLeft}>
              <Moon size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <View style={[
              styles.radioButton, 
              theme === 'dark' && { borderColor: colors.primary }
            ]}>
              {theme === 'dark' && (
                <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
              )}
            </View>
          </TouchableOpacity>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setTheme('system')}
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingText, { color: colors.text }]}>System Default</Text>
            </View>
            <View style={[
              styles.radioButton, 
              theme === 'system' && { borderColor: colors.primary }
            ]}>
              {theme === 'system' && (
                <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>
          NOTIFICATIONS
        </Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Test Reminders</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={true ? colors.primary : colors.secondaryText}
              ios_backgroundColor={colors.border}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Clock size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Auto-Start Timers</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={true ? colors.primary : colors.secondaryText}
              ios_backgroundColor={colors.border}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>
          DATA
        </Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Trash2 size={20} color={colors.error} />
              <Text style={[styles.settingText, { color: colors.error }]}>Clear Test History</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>
          ABOUT
        </Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <ExternalLink size={16} color={colors.secondaryText} />
          </TouchableOpacity>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={[styles.settingText, { color: colors.text }]}>Version</Text>
            </View>
            <Text style={[styles.versionText, { color: colors.secondaryText }]}>1.0.0</Text>
          </View>
        </View>
      </View>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  settingCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  versionText: {
    fontSize: 14,
  },
});