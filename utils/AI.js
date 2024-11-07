import { Chess } from 'chess.js';
import { Alert } from 'react-native';

/**
 * Fetches the best move from the Lichess API based on the provided FEN.
 * If the API call fails or returns no valid move, falls back to generating a random legal move using Chess.js.
 *
 * @param {string} fen - The Forsyth-Edwards Notation string representing the current board state.
 * @param {number} multiPv - The number of principal variations to request from the API.
 * @param {function} navigateHome - Function to navigate back to the home screen.
 * @returns {string|null} - The best move in UCI format, or null if no valid move is found.
 */
export const fetchLichessAIMove = async (fen, multiPv) => {
  try {
    // Validate the FEN string
    if (!fen || typeof fen !== 'string') {
      throw new Error('Invalid FEN string provided.');
    }

    // Validate the multiPv parameter
    if (typeof multiPv !== 'number' || multiPv <= 0) {
      throw new Error('Invalid multiPv value provided.');
    }

    // Construct the API URL
    const apiUrl = `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=${multiPv}`;

    // Fetch the evaluation data from the Lichess API
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Lichess API responded with status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the response contains principal variations
    if (data && data.pvs && Array.isArray(data.pvs) && data.pvs.length > 0) {
      // Extract the best move from the first principal variation
      const bestMove = data.pvs[0].moves.split(' ')[0];
      return bestMove;
    } else {
      // No valid move found in the API response; fall back to Chess.js
      return getFallbackMove(fen);
    }
  } catch (error) {
    // Handle errors gracefully and return a fallback move
    return getFallbackMove(fen);
  }
};

/**
 * Generates a random legal move using Chess.js based on the provided FEN.
 *
 * @param {string} fen - The Forsyth-Edwards Notation string representing the current board state.
 * @returns {string|null} - A random legal move in UCI format, or null if no legal moves are available.
 */
const getFallbackMove = (fen) => {
  try {
    const chess = new Chess(fen);
    const legalMoves = chess.moves(); // Use moves() to get all legal moves
    if (legalMoves.length === 0) {
      return null; // No legal moves available
    }
    // Select a random legal move
    const randomIndex = Math.floor(Math.random() * legalMoves.length);
    return legalMoves[randomIndex]; // Return a random legal move
  } catch (error) {
    return null; // Handle errors gracefully
  }
};
