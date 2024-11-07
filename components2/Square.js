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
              ? 'rgba(0, 255, 255, 0.7)'
              : selected
              ? 'rgba(255, 20, 147, 0.7)'
              : isDark
              ? '#964B00'
              : '#F3F3F5',
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
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default Square;
