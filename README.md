
# Chess Master AI React Native (Expo CLI) 🧩

An AI-powered chess game app built with **React Native** using **Expo CLI**, designed for both training and competitive play. This app offers two primary modes: **Training Mode** for skill improvement and **AI Mode** with three different difficulty levels powered by **Lichess AI API**.

## Features 📋

- **Training Mode**: Ideal for beginners, providing guidance to improve chess skills.
- **AI Mode with 3 Difficulty Levels**: Play against AI-powered opponents, from beginner to advanced levels.
- **AI-Based Move Suggestions**: Real-time suggestions to help players learn strategies and make optimal moves.
- **Sound Effects**: Integrated sound feedback for moves and game results using **Expo AV**.

## Tech Stack 🛠️

- **React Native** with **Expo CLI**: For cross-platform app development.
- **chess.js**: For chess game logic and move validation.
- **Lichess AI API**: To power AI-based opponents across various difficulty levels.
- **Expo AV**: For audio features, making the app interactive and immersive.

## Getting Started 🚀

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Expo CLI**: Install Expo CLI globally with the following command:
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/chess-game-app.git
   cd chess-game-app
   ```

2. **Install Dependencies**

   Run the following command to install the necessary packages:
   ```bash
   npm install
   ```

3. **Set up Lichess AI API**

   - The app uses the Lichess AI API to offer various levels of AI-based gameplay. You may need an API key for full functionality.
   - Documentation: [Lichess API Documentation](https://lichess.org/api)

4. **Run the App**

   Start the app in Expo:
   ```bash
   expo start
   ```

   - This command will open the Expo Developer Tools in your browser.
   - You can then test the app on an emulator, simulator, or Expo Go app on your device.

### Folder Structure 📂

```plaintext
chess-game-app/
├── assets/            # Images, sounds, and other media files
├── components/        # UI components like Chessboard, MoveSuggestions, etc.
├── screens/           # Different screens like Home, TrainingMode, AIGame
├── services/          # Lichess API integration and AI logic
├── utils/             # Helper functions and utilities (e.g., game state management)
├── App.js             # Main app file
└── package.json       # Project metadata and dependencies
```

## Usage 🕹️

1. **Select Training Mode or AI Mode**: Choose the game mode from the main menu.
   - **Training Mode**: Offers guidance and feedback for practice.
   - **AI Mode**: Select the difficulty level (beginner, intermediate, advanced) and play against the AI.

2. **Gameplay**:  
   - Receive **real-time move suggestions** during the game to enhance your strategic understanding.
   - **Sound effects** provide an engaging experience with feedback for each move and game result.

3. **Endgame**:  
   - The game ends with a win, loss, or draw notification, with appropriate sounds and messages.

## Dependencies 🧩

Key dependencies used in this project:

- **expo**: Framework for building React Native apps with minimal configuration.
- **chess.js**: Provides game logic, move validation, and chess-specific functionality.
- **Lichess API**: Powers the AI gameplay with varying difficulty levels.
- **expo-av**: Manages audio for feedback during gameplay.

Install all dependencies with:

```bash
npm install
```

## Customization ⚙️

- **Difficulty Levels**: The Lichess AI API allows you to adjust the difficulty of AI opponents. You can modify the AI parameters in the `services/LichessAPI.js` file.
- **Sound Effects**: Replace audio files in the `assets` folder or adjust sound settings within `components/GameSounds.js` if you want to personalize the sound feedback.

## Future Enhancements 🌱

- **Multiplayer Mode**: Allowing real-time play between two users.
- **Leaderboard System**: Tracking player scores and progress.
- **Additional Training Tools**: Tutorials or guided challenges for beginners.

## Contributing 👥

Contributions are welcome! Here’s how you can help:

1. Fork the repository.
2. Create a new branch with your feature or fix:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature-name
   ```
5. Submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

---

Feel free to reach out with any questions or suggestions!
