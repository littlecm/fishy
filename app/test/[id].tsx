import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Play, Pause, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Define test types (same as in tests.tsx)
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

export default function TestScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState('');
  
  const test = testTypes.find(t => t.id === id);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!test) {
      router.replace('/tests');
      return;
    }
    
    // Find the step that requires waiting
    const waitStepIndex = test.steps.findIndex(step => step.toLowerCase().includes('wait'));
    if (waitStepIndex !== -1) {
      // Set the timer duration for that step
      if (currentStep === waitStepIndex) {
        setTimeRemaining(test.duration);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [test, currentStep]);
  
  const startTimer = () => {
    setTimerRunning(true);
    
    // Trigger haptic feedback on non-web platforms
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setTimerRunning(false);
          
          // Trigger haptic feedback on non-web platforms
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTimerRunning(false);
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };
  
  const nextStep = () => {
    if (!test) return;
    
    if (currentStep < test.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      
      // If timer was running, stop it
      if (timerRunning && timerRef.current) {
        clearInterval(timerRef.current);
        setTimerRunning(false);
      }
    } else {
      // Test completed
      setTestCompleted(true);
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // Trigger haptic feedback on non-web platforms
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      
      // If timer was running, stop it
      if (timerRunning && timerRef.current) {
        clearInterval(timerRef.current);
        setTimerRunning(false);
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const saveResult = () => {
    if (!testResult) {
      Alert.alert('Error', 'Please enter a test result');
      return;
    }
    
    // Here you would save the result to your storage
    // For now, we'll just navigate back
    router.replace('/tests');
  };
  
  if (!test) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Test not found</Text>
      </View>
    );
  }
  
  const currentStepText = test.steps[currentStep];
  const isTimerStep = currentStepText.toLowerCase().includes('wait');
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{test.name} Test</Text>
        <View style={styles.placeholder} />
      </View>
      
      {!testCompleted ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: colors.primary,
                    width: `${((currentStep + 1) / test.steps.length) * 100}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: colors.secondaryText }]}>
              Step {currentStep + 1} of {test.steps.length}
            </Text>
          </View>
          
          <View style={[styles.stepCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.stepText, { color: colors.text }]}>
              {currentStepText}
            </Text>
            
            {isTimerStep && (
              <View style={styles.timerContainer}>
                <View style={[styles.timer, { borderColor: colors.border }]}>
                  <Text style={[styles.timerText, { color: colors.text }]}>
                    {formatTime(timeRemaining)}
                  </Text>
                </View>
                
                <View style={styles.timerControls}>
                  {!timerRunning ? (
                    <TouchableOpacity 
                      style={[styles.timerButton, { backgroundColor: colors.success }]}
                      onPress={startTimer}
                      disabled={timeRemaining === 0}
                    >
                      <Play size={24} color="#fff" />
                      <Text style={styles.timerButtonText}>Start</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.timerButton, { backgroundColor: colors.warning }]}
                      onPress={pauseTimer}
                    >
                      <Pause size={24} color="#fff" />
                      <Text style={styles.timerButtonText}>Pause</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
          
          <View style={styles.navigation}>
            {currentStep > 0 && (
              <TouchableOpacity 
                style={[styles.navButton, { borderColor: colors.border }]}
                onPress={prevStep}
              >
                <Text style={[styles.navButtonText, { color: colors.text }]}>Previous</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.navButton, 
                styles.primaryButton,
                { backgroundColor: colors.primary }
              ]}
              onPress={nextStep}
              disabled={isTimerStep && timeRemaining > 0 && !timerRunning}
            >
              <Text style={styles.primaryButtonText}>
                {currentStep < test.steps.length - 1 ? 'Next' : 'Complete'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.completedCard, { backgroundColor: colors.card }]}>
            <CheckCircle2 size={64} color={colors.success} />
            <Text style={[styles.completedTitle, { color: colors.text }]}>
              Test Completed!
            </Text>
            <Text style={[styles.completedSubtitle, { color: colors.secondaryText }]}>
              Compare your test tube color to the chart and record your result.
            </Text>
            
            <View style={styles.resultInputContainer}>
              <Text style={[styles.resultLabel, { color: colors.text }]}>
                {test.name} Result:
              </Text>
              
              <View style={styles.resultOptions}>
                {test.id === 'ammonia' && (
                  <>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                      ]}
                      onPress={() => setTestResult('0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.success }]}>0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0.25' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                      ]}
                      onPress={() => setTestResult('0.25')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.warning }]}>0.25 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0.5' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                      ]}
                      onPress={() => setTestResult('0.5')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.warning }]}>0.5 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '1.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('1.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>1.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '2.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('2.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>2.0 ppm</Text>
                    </TouchableOpacity>
                  </>
                )}
                
                {test.id === 'nitrite' && (
                  <>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                      ]}
                      onPress={() => setTestResult('0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.success }]}>0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0.25' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                      ]}
                      onPress={() => setTestResult('0.25')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.warning }]}>0.25 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0.5' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                      ]}
                      onPress={() => setTestResult('0.5')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.warning }]}>0.5 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '1.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('1.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>1.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '5.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('5.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>5.0 ppm</Text>
                    </TouchableOpacity>
                  </>
                )}
                
                {test.id === 'nitrate' && (
                  <>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '0' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                      ]}
                      onPress={() => setTestResult('0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.success }]}>0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '5.0' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                      ]}
                      onPress={() => setTestResult('5.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.success }]}>5.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '10.0' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                      ]}
                      onPress={() => setTestResult('10.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.success }]}>10.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '20.0' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                      ]}
                      onPress={() => setTestResult('20.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.warning }]}>20.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '40.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('40.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>40.0 ppm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.resultOption, 
                        testResult === '80.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                      ]}
                      onPress={() => setTestResult('80.0')}
                    >
                      <Text style={[styles.resultOptionText, { color: colors.error }]}>80.0 ppm</Text>
                    </TouchableOpacity>
                  </>
                )}
                
                {(test.id === 'ph' || test.id === 'high-range-ph') && (
                  <>
                    {test.id === 'ph' ? (
                      <>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '6.0' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                          ]}
                          onPress={() => setTestResult('6.0')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.warning }]}>6.0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '6.4' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                          ]}
                          onPress={() => setTestResult('6.4')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.warning }]}>6.4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '6.8' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                          ]}
                          onPress={() => setTestResult('6.8')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.success }]}>6.8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '7.2' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                          ]}
                          onPress={() => setTestResult('7.2')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.success }]}>7.2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '7.6' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                          ]}
                          onPress={() => setTestResult('7.6')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.success }]}>7.6</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '7.4' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                          ]}
                          onPress={() => setTestResult('7.4')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.success }]}>7.4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '7.8' && { backgroundColor: colors.success + '30', borderColor: colors.success }
                          ]}
                          onPress={() => setTestResult('7.8')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.success }]}>7.8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '8.2' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                          ]}
                          onPress={() => setTestResult('8.2')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.warning }]}>8.2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '8.6' && { backgroundColor: colors.warning + '30', borderColor: colors.warning }
                          ]}
                          onPress={() => setTestResult('8.6')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.warning }]}>8.6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[
                            styles.resultOption, 
                            testResult === '9.0' && { backgroundColor: colors.error + '30', borderColor: colors.error }
                          ]}
                          onPress={() => setTestResult('9.0')}
                        >
                          <Text style={[styles.resultOptionText, { color: colors.error }]}>9.0</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </View>
            </View>
            
            {testResult && (
              <View style={styles.resultFeedback}>
                <AlertCircle size={20} color={
                  testResult === '0' || 
                  (test.id === 'ph' && ['6.8', '7.2', '7.6'].includes(testResult)) ||
                  (test.id === 'high-range-ph' && ['7.4', '7.8'].includes(testResult)) ||
                  (test.id === 'nitrate' && ['5.0', '10.0'].includes(testResult))
                    ? colors.success 
                    : colors.warning
                } />
                <Text style={[
                  styles.resultFeedbackText, 
                  { 
                    color: testResult === '0' || 
                    (test.id === 'ph' && ['6.8', '7.2', '7.6'].includes(testResult)) ||
                    (test.id === 'high-range-ph' && ['7.4', '7.8'].includes(testResult)) ||
                    (test.id === 'nitrate' && ['5.0', '10.0'].includes(testResult))
                      ? colors.success 
                      : colors.warning
                  }
                ]}>
                  {testResult === '0' || 
                   (test.id === 'ph' && ['6.8', '7.2', '7.6'].includes(testResult)) ||
                   (test.id === 'high-range-ph' && ['7.4', '7.8'].includes(testResult)) ||
                   (test.id === 'nitrate' && ['5.0', '10.0'].includes(testResult))
                    ? 'Your water parameters are in the ideal range.' 
                    : 'Your water parameters need attention.'}
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.saveButton,
              { backgroundColor: colors.primary }
            ]}
            onPress={saveResult}
          >
            <Text style={styles.saveButtonText}>Save Result</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  stepCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
  },
  navButtonText: {
    fontWeight: '600',
  },
  primaryButton: {
    flex: 2,
    borderWidth: 0,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  completedCard: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  completedSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  resultInputContainer: {
    width: '100%',
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  resultOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  resultOption: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  resultOptionText: {
    fontWeight: '600',
  },
  resultFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  resultFeedbackText: {
    marginLeft: 8,
    fontSize: 14,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});