import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from '../components/Board';

const TrainingScreen = () => {
  const handleMove = (move) => {
    console.log(`Move made: ${move.from}-${move.to}`);
  };

  return (
    <View style={styles.container}>
      <Board 
        fen={'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'} 
        onMove={handleMove} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrainingScreen;
