import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {FocusMode} from '../types';

type Props = {
  modes: FocusMode[];
  selectedModeId: string;
  onSelect: (modeId: string) => void;
};

export function FocusModeSelector({modes, selectedModeId, onSelect}: Props) {
  return (
    <View style={styles.container}>
      {modes.map(mode => {
        const selected = mode.id === selectedModeId;
        return (
          <Pressable
            key={mode.id}
            onPress={() => onSelect(mode.id)}
            style={[styles.option, selected && styles.optionSelected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {mode.label}
            </Text>
            <Text style={[styles.duration, selected && styles.labelSelected]}>
              {mode.durationMinutes} min
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 12},
  option: {
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  optionSelected: {
    borderColor: '#2E7D32',
    backgroundColor: '#EAF6EA',
  },
  label: {fontSize: 18, fontWeight: '700', color: '#1F2937'},
  labelSelected: {color: '#14532D'},
  duration: {marginTop: 4, fontSize: 14, color: '#4B5563'},
});
