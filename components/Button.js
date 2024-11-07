import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Button = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    padding: 12,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
