import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import type {SessionResult} from '../types';

type Props = {
  result: SessionResult;
  onDone: () => void;
};

export function ResultScreen({result, onDone}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Session complete</Text>
        <Text style={styles.subtitle}>{result.modeLabel}</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total duration</Text>
          <Text style={styles.cardValue}>{result.durationMinutes} min</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total distractions</Text>
          <Text style={styles.cardValue}>{result.distractions}</Text>
        </View>

        <Pressable style={styles.button} onPress={onDone}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F8FAFC'},
  container: {flex: 1, padding: 24, justifyContent: 'center', gap: 16},
  title: {fontSize: 34, fontWeight: '800', color: '#111827'},
  subtitle: {fontSize: 18, color: '#4B5563'},
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardLabel: {fontSize: 14, color: '#6B7280', marginBottom: 6},
  cardValue: {fontSize: 28, fontWeight: '800', color: '#111827'},
  button: {
    marginTop: 8,
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {color: '#FFFFFF', fontSize: 18, fontWeight: '700'},
});
