import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/style';

export default function Button(text, handlePress) {
  return (
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.logo,
    borderRadius: 50,
    shadowColor: COLORS.highlight,
    shadowOpacity: 0.36,
    shadowRadius: 4.65,
    elevation: 11,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
