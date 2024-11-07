import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, TouchableOpacity, Text, View } from 'react-native';
import { Audio } from 'expo-av';

import HomeScreen from './screens/HomeScreen';
import TrainingScreen from './screens/TrainingScreen';
import PlayAIScreen from './screens/PlayAIScreen';

const Stack = createStackNavigator();

export default function App() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the music is playing

  const playBackgroundMusic = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/background-music.mp3')); // Update with your music file path
    await sound.setIsLoopingAsync(true); // Loop the music
    await sound.playAsync(); // Play the music
    setSound(sound); // Store the sound object in state
    setIsPlaying(true); // Set playing state to true
  };

  const stopBackgroundMusic = async () => {
    if (sound) {
      await sound.stopAsync(); // Stop the music
      await sound.unloadAsync(); // Unload the sound
      setSound(null); // Clear the sound object from state
      setIsPlaying(false); // Set playing state to false
    }
  };

  useEffect(() => {
    // Automatically play music on app load
    playBackgroundMusic(); // Start playing music automatically

    // Cleanup function to stop the music when the app is closed
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <NavigationContainer>
      {/* Set the status bar to transparent */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Stack.Navigator
        screenOptions={{
          headerTransparent: true, // Make the navigation header transparent
          headerTitle: '',         // Remove the title to make it cleaner
          headerTintColor: '#fff', // Change back button color to white for visibility
          headerBackTitleVisible: false, // Hide the default back text on iOS
          headerStyle: {
            backgroundColor: 'transparent', // Set the header background color to transparent
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />
        <Stack.Screen name="PlayAI" component={PlayAIScreen} />
      </Stack.Navigator>

      {/* Start/Stop Music Button */}
      <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: isPlaying ? 'red' : 'green',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={isPlaying ? stopBackgroundMusic : playBackgroundMusic}
        >
          <Text style={{ color: 'white' }}>{isPlaying ? 'Stop Music' : 'Play Music'}</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}
