import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Piece from './Piece';

const Square = ({ position, piece, selected, highlighted, onPress }) => {
  const isDark = (position.charCodeAt(0) + parseInt(position[1])) % 2 === 1;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(position)}>
      <View
        style={[
          styles.square,
          {
            backgroundColor: highlighted
              ? 'rgba(0, 255, 255, 0.7)' // Bright Neon Cyan for highlighted moves
              : selected
              ? 'rgba(255, 20, 147, 0.7)' // Bright Neon Pink for selected pieces
              : isDark
              ? '#964B00' // Brighter dark square
              : '#F3F3F5', // Brighter light square
            shadowColor: highlighted || selected ? '#ffffff' : 'transparent',
            shadowOpacity: highlighted || selected ? 0.9 : 0,
            shadowRadius: highlighted || selected ? 10 : 0,
          },
        ]}
      >
        {piece && <Piece type={piece.type} color={piece.color} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border to separate squares
    shadowOffset: { width: 0, height: 0 },
  },
});

export default Square;
