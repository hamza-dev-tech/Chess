import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Board from '../components2/Board';

const PlayAIScreen = ({ route }) => {
  const { difficulty } = route.params;


  return (
    <View style={styles.container}>
      <Board
        fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        aiLevel={difficulty}
        onMove={(move) => console.log(`Move: ${move.from}-${move.to}`)}
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

export default PlayAIScreen;
