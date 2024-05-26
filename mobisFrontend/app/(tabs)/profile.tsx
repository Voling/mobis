import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { ImageBackground } from 'react-native';

export default function TabTwoScreen() {
  const handlePress = () => {
    // Handle button press
    alert('Button pressed!');
  };
  return (
    <ImageBackground
    source={require('../../assets/svg/background.jsx')}
    style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.box}/>
        <View style={styles.circle}/>
        <Text style={styles.user}>SuperPlayerGirl</Text>
        <Text style={styles.games}>Valorant, League of Legends</Text>

        <TextInput placeholder='User Input' style={styles.textInputStyle}/>
        <TextInput placeholder='User Input2' style={styles.textInputStyle}/>
        <TextInput placeholder='User Input3' style={styles.textInputStyle}/>
        <TextInput placeholder='User Input4' style={styles.textInputStyle}/>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInputStyle: {
    backgroundColor: 'rgb(100,100,100)',
    borderRadius: 10,
    marginHorizontal: 'auto',
    height: 60,
    marginTop: 50,
    paddingLeft: 15,
    width: '90%',
  },
  box: {
    backgroundColor: 'rgb(31,30,30)',
    width: 205,
    height: 163,
    marginHorizontal: 'auto',
    paddingTop: 0,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'gray',
    width: 124,
    height: 124,
    borderRadius: 62,
    position: 'absolute',
    top: 15,
    left: '35%',
    marginHorizontal: 'auto',
  },
  user: {
    fontSize: 24, 
    color: 'red',
    fontWeight: 'bold',
    marginHorizontal: 'auto',
    padding: 5,
  },
  games: {
    fontSize: 20, 
    color: 'red',
    marginHorizontal: 'auto',
  },
  button: {
    backgroundColor: 'rgb(255, 87, 69)',
    marginTop: 50,
    borderRadius: 5,
    height: 48,
    width: '85%',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 15,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  }

});
