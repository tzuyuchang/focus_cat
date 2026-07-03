import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  visible: boolean;
};

export function CatPopup({visible}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cat}>🐱 +1</Text>
      <Text style={styles.text}>Focus cat noticed a distraction</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#FFF7E6',
    borderColor: '#F0C36D',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  cat: {fontSize: 18, fontWeight: '700', textAlign: 'center'},
  text: {fontSize: 12, marginTop: 2, color: '#7C5A14', textAlign: 'center'},
});
