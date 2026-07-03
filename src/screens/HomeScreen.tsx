import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {focusModes} from '../data/focusModes';
import type {SessionResult} from '../types';
import {FocusModeSelector} from '../components/FocusModeSelector';
import {FocusScreen} from './FocusScreen';
import {ResultScreen} from './ResultScreen';

type ScreenState = 'home' | 'focus' | 'result';

export function HomeScreen() {
  const [screen, setScreen] = useState<ScreenState>('home');
  const [selectedModeId, setSelectedModeId] = useState(focusModes[0].id);
  const [result, setResult] = useState<SessionResult | null>(null);

  const selectedMode = focusModes.find(mode => mode.id === selectedModeId) ?? focusModes[0];

  const startSession = () => {
    setScreen('focus');
  };

  const finishSession = (sessionResult: SessionResult) => {
    setResult(sessionResult);
    setScreen('result');
  };

  const restart = () => {
    setScreen('home');
  };

  if (screen === 'focus') {
    return (
      <FocusScreen
        mode={selectedMode}
        onStop={finishSession}
        onBackToHome={restart}
      />
    );
  }

  if (screen === 'result' && result) {
    return <ResultScreen result={result} onDone={restart} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Focus Cat</Text>
        <Text style={styles.subtitle}>
          Pick a focus mode, start a session, and count every distraction.
        </Text>

        <Text style={styles.sectionTitle}>Focus mode</Text>
        <FocusModeSelector
          modes={focusModes}
          selectedModeId={selectedModeId}
          onSelect={setSelectedModeId}
        />

        <Pressable style={styles.primaryButton} onPress={startSession}>
          <Text style={styles.primaryButtonText}>Start Focus</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F4F7FB'},
  container: {flex: 1, padding: 24, justifyContent: 'center', gap: 16},
  title: {fontSize: 38, fontWeight: '800', color: '#111827'},
  subtitle: {fontSize: 16, color: '#4B5563', lineHeight: 24},
  sectionTitle: {fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 8},
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButtonText: {color: '#FFFFFF', fontSize: 18, fontWeight: '700'},
});
