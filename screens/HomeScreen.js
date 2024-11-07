import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Chess Master</Text>
          <Text style={styles.subtitle}>Master your skills, challenge AI, and become a champion!</Text>
          
          {/* AI Buttons */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Training')}
          >
            <Text style={styles.buttonText}>Play Training 1v1</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PlayAI', { difficulty: 1 })}
          >
            <Text style={styles.buttonText}>Play with AI (Easy)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PlayAI', { difficulty: 2 })}
          >
            <Text style={styles.buttonText}>Play with AI (Medium)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('PlayAI', { difficulty: 3 })}
          >
            <Text style={styles.buttonText}>Play with AI (Hard)</Text>
          </TouchableOpacity>

          {/* No connection message is no longer necessary */}
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 60, 114, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    width: screenWidth * 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
