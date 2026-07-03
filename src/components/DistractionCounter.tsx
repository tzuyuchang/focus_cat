import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  count: number;
};

export function DistractionCounter({count}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Distractions</Text>
      <Text style={styles.value}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
  },
  label: {color: '#D1D5DB', fontSize: 14, marginBottom: 4},
  value: {color: '#FFFFFF', fontSize: 42, fontWeight: '800'},
});
