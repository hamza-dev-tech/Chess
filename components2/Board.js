import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Chess } from 'chess.js';
import { Audio } from 'expo-av';
import Square from './Square';
import { fetchLichessAIMove } from '../utils/AI';

const screenWidth = Dimensions.get('window').width;

const Board = ({ fen, onMove, aiLevel }) => {
    const [game, setGame] = useState(new Chess(fen));
    const [board, setBoard] = useState([]);
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [highlightedSquares, setHighlightedSquares] = useState([]);
    const [moveSound, setMoveSound] = useState();
    const [invalidMoveSound, setInvalidMoveSound] = useState();
    const [selectSound, setSelectSound] = useState();
    const [bestMove, setBestMove] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        setBoard(game.board());
        loadSounds();
        suggestBestMove();
    }, [game]);

    useEffect(() => {
        let timer;
        if (timerStarted) {
            timer = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerStarted]);

    const loadSounds = async () => {
        try {
            const { sound: move } = await Audio.Sound.createAsync(require('../assets/sounds/move.mp3'));
            const { sound: invalid } = await Audio.Sound.createAsync(require('../assets/sounds/invalid.mp3'));
            const { sound: select } = await Audio.Sound.createAsync(require('../assets/sounds/select.mp3'));

            setMoveSound(move);
            setInvalidMoveSound(invalid);
            setSelectSound(select);
        } catch (error) {
            console.error('Error loading sounds:', error);
        }
    };

    const suggestBestMove = () => {
        const moves = game.moves({ verbose: true });
        if (moves.length > 0) {
            const bestMove = moves[0];
            setBestMove(bestMove);
        } else {
            setBestMove(null);
        }
    };

    const handleSquarePress = async (position) => {
        const piece = game.get(position);

        if (selectedSquare) {
            if (selectedSquare === position) {
                setSelectedSquare(null);
                setHighlightedSquares([]);
            } else {
                try {
                    const move = game.move({ from: selectedSquare, to: position, promotion: 'q' });
                    if (move) {
                        if (!timerStarted) setTimerStarted(true);
                        onMove(move);
                        await moveSound.playAsync();
                        setGame(new Chess(game.fen()));
                        setHighlightedSquares([]);
                        suggestBestMove();
                    } else {
                        Alert.alert('Invalid Move', 'Try a valid move.');
                        await invalidMoveSound.playAsync();
                    }
                } catch (error) {
                    Alert.alert('Invalid Move', 'This move is not allowed.');
                    await invalidMoveSound.playAsync();
                } finally {
                    setSelectedSquare(null);
                }
            }
        } else {
            if (piece && piece.color === game.turn()) {
                await selectSound.playAsync();
                setSelectedSquare(position);
                // Only highlight possible moves if AI level is not 3
                if (aiLevel < 3) {
                    setHighlightedSquares(game.moves({ square: position, verbose: true }).map((move) => move.to));
                }
            }
        }
    };

    const makeAIMove = async () => {
        try {
            const multiPvValue = aiLevel; // Assuming aiLevel directly maps to multiPv

            const move = await fetchLichessAIMove(game.fen(), multiPvValue);
            const validMove = game.move(move);
            if (validMove) {
                setGame(new Chess(game.fen()));
            } else {
                Alert.alert('Invalid Move', 'The AI provided an invalid move.');
                suggestBestMove();
            }
        } catch (error) {
            Alert.alert('AI Error', 'The AI could not make a valid move. Please try again.');
        }
    };

    useEffect(() => {
        if (game.turn() === 'b') {
            const timeout = setTimeout(makeAIMove, 500);
            return () => clearTimeout(timeout); // Clear timeout on unmount
        }
    }, [game]);

    const demonstrateSuggestedMove = () => {
        if (bestMove && aiLevel === 1) { // Only show if AI level is Easy
            setHighlightedSquares([bestMove.from, bestMove.to]);
            setTimeout(() => setHighlightedSquares([]), 1500);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                {bestMove && aiLevel === 1 && ( // Show suggested move only for AI level 1
                    <View style={styles.predictionContainer}>
                        <Text style={styles.prediction}>Suggested Move: {bestMove.from} to {bestMove.to}</Text>
                        <TouchableOpacity style={styles.button} onPress={demonstrateSuggestedMove}>
                            <Text style={styles.buttonText}>Show Suggested Move</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.board}>
                    {board.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((square, colIndex) => {
                                const position = `${'abcdefgh'[colIndex]}${8 - rowIndex}`;
                                return (
                                    <Square
                                        key={`square-${rowIndex}-${colIndex}`}
                                        position={position}
                                        piece={square}
                                        selected={selectedSquare === position}
                                        highlighted={highlightedSquares.includes(position)}
                                        onPress={handleSquarePress}
                                    />
                                );
                            })}
                        </View>
                    ))}
                </View>
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>Time Elapsed: {formatTime(timeElapsed)}</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(30, 60, 114, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        width: screenWidth - 10,
        aspectRatio: 0.9,
        flexDirection: 'column',
        borderWidth: 4,
        borderColor: 'rgba(0, 255, 255, 0.8)',
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        shadowColor: '#00FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 15,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    predictionContainer: {
        marginBottom: 15,
        alignItems: 'center',
    },
    prediction: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    button: {
        backgroundColor: 'rgba(255, 0, 255, 0.8)',
        padding: 12,
        borderRadius: 10,
        shadowColor: '#FF00FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        marginTop: 5,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timerContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#39FF14',
    },
    timerText: {
        color: '#39FF14',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Board;
