import React from 'react';
import { Image, StyleSheet } from 'react-native';

const PIECE_IMAGES = {
  p: { w: require('../assets/pieces/wP.png'), b: require('../assets/pieces/bP.png') },
  r: { w: require('../assets/pieces/wR.png'), b: require('../assets/pieces/bR.png') },
  n: { w: require('../assets/pieces/wN.png'), b: require('../assets/pieces/bN.png') },
  b: { w: require('../assets/pieces/wB.png'), b: require('../assets/pieces/bB.png') },
  q: { w: require('../assets/pieces/wQ.png'), b: require('../assets/pieces/bQ.png') },
  k: { w: require('../assets/pieces/wK.png'), b: require('../assets/pieces/bK.png') },
};

const Piece = ({ type, color }) => {
  const pieceImage = PIECE_IMAGES[type][color];

  return <Image source={pieceImage} style={styles.piece} />;
};

const styles = StyleSheet.create({
  piece: {
    width: 47, // Adjust size for better fit
    height: 47,
    transition: 'transform 0.8s', // Add some transition for animations
  },
});

export default Piece;
