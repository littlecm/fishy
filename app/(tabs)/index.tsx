import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { Droplets, TrendingUp, CircleAlert as AlertCircle, Info } from 'lucide-react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1520302519846-3208dcb8e1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.headerImage}
        />
        <View style={[styles.headerOverlay, { backgroundColor: colors.background + '99' }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Aquarium Test Kit
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
            Monitor your aquarium water parameters
          </Text>
        </View>
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={() => router.push('/tests')}
        >
          <Droplets size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.text }]}>Run Tests</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={() => router.push('/history')}
        >
          <TrendingUp size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.text }]}>View Trends</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <View style={styles.infoHeader}>
          <Info size={20} color={colors.info} />
          <Text style={[styles.infoTitle, { color: colors.text }]}>Water Quality Tips</Text>
        </View>
        <Text style={[styles.infoText, { color: colors.secondaryText }]}>
          Regular testing is essential for maintaining a healthy aquarium. Test your water parameters at least once a week, and after any changes to your tank.
        </Text>
      </View>
      
      <View style={[styles.alertCard, { backgroundColor: colors.card }]}>
        <View style={styles.alertHeader}>
          <AlertCircle size={20} color={colors.warning} />
          <Text style={[styles.alertTitle, { color: colors.text }]}>Parameter Guidelines</Text>
        </View>
        <View style={styles.parameterList}>
          <View style={styles.parameterItem}>
            <Text style={[styles.parameterName, { color: colors.text }]}>Ammonia:</Text>
            <Text style={[styles.parameterValue, { color: colors.success }]}>0 ppm</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={[styles.parameterName, { color: colors.text }]}>Nitrite:</Text>
            <Text style={[styles.parameterValue, { color: colors.success }]}>0 ppm</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={[styles.parameterName, { color: colors.text }]}>Nitrate:</Text>
            <Text style={[styles.parameterValue, { color: colors.success }]}>{"< 20 ppm"}</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={[styles.parameterName, { color: colors.text }]}>pH:</Text>
            <Text style={[styles.parameterValue, { color: colors.success }]}>6.5 - 7.5</Text>
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
  header: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontWeight: '500',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoText: {
    lineHeight: 22,
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  parameterList: {
    marginTop: 8,
  },
  parameterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  parameterName: {
    fontWeight: '500',
  },
  parameterValue: {
    fontWeight: '600',
  },
});