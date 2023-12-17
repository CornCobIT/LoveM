import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, STYLES } from '../theme/style';

export default function ButtonCustom({text, handlePress, backgroundColor, color}) {
  return (
      <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={handlePress}>
        <Text style={[STYLES.title, {color}]}>{text}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: COLORS.highlight,
    shadowOpacity: 0.36,
    shadowRadius: 4.65,
    elevation: 11,
    height: 60,
    paddingHorizontal: 10,
  },
});
