import React, {useEffect, useRef, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import type {FocusMode, SessionResult} from '../types';
import {CatPopup} from '../components/CatPopup';
import {DistractionCounter} from '../components/DistractionCounter';

type Props = {
  mode: FocusMode;
  onStop: (result: SessionResult) => void;
  onBackToHome: () => void;
};

export function FocusScreen({mode, onStop, onBackToHome}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(mode.durationMinutes * 60);
  const [distractions, setDistractions] = useState(0);
  const [showCatPopup, setShowCatPopup] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const distractionsRef = useRef(0);
  const sessionEndedRef = useRef(false);
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    distractionsRef.current = distractions;
  }, [distractions]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(current => {
        if (current <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          if (!sessionEndedRef.current) {
            sessionEndedRef.current = true;
            onStop({
              modeLabel: mode.label,
              durationMinutes: mode.durationMinutes,
              distractions: distractionsRef.current,
            });
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
        popupTimeoutRef.current = null;
      }
    };
  }, [mode.label, mode.durationMinutes, onStop]);

  const markDistracted = () => {
    setDistractions(current => current + 1);
    setShowCatPopup(true);
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    popupTimeoutRef.current = setTimeout(() => {
      setShowCatPopup(false);
      popupTimeoutRef.current = null;
    }, 1200);
  };

  const stopNow = () => {
    if (sessionEndedRef.current) {
      return;
    }
    sessionEndedRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onStop({
      modeLabel: mode.label,
      durationMinutes: mode.durationMinutes,
      distractions: distractionsRef.current,
    });
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>Focus mode</Text>
        <Text style={styles.mode}>{mode.label}</Text>

        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Time left</Text>
          <Text style={styles.timer}>{formattedTime}</Text>
        </View>

        <DistractionCounter count={distractions} />
        <CatPopup visible={showCatPopup} />

        <Pressable style={styles.secondaryButton} onPress={markDistracted}>
          <Text style={styles.secondaryButtonText}>I got distracted</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={stopNow}>
          <Text style={styles.primaryButtonText}>Stop Focus</Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={onBackToHome}>
          <Text style={styles.linkButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#0F172A'},
  container: {flex: 1, padding: 24, justifyContent: 'center', gap: 16},
  label: {color: '#94A3B8', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1.2},
  mode: {color: '#FFFFFF', fontSize: 32, fontWeight: '800'},
  timerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  timerLabel: {color: '#CBD5E1', fontSize: 14},
  timer: {color: '#FFFFFF', fontSize: 56, fontWeight: '800', marginTop: 8},
  primaryButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  primaryButtonText: {color: '#FFFFFF', fontSize: 18, fontWeight: '700'},
  secondaryButton: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {color: '#0F172A', fontSize: 16, fontWeight: '700'},
  linkButton: {alignItems: 'center', paddingVertical: 8},
  linkButtonText: {color: '#94A3B8', fontSize: 14},
});
