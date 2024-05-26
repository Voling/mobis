import React, { useState } from 'react';
import { View, TextInput, Button, Pressable, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '../../src/aws-exports';
import { CookieStorage } from 'amazon-cognito-identity-js';


interface SignUpProps {
  apiURL: string; // This prop could be used to dynamically set the API URL
}

const SignUp: React.FC<SignUpProps> = ({ apiURL }) => {
  Amplify.configure(awsconfig)

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSignUp = async () => {
    try {
      console.log("Signing up...")
      const userInfo = {username, password, email, phoneNumber}
      console.log(userInfo)
      const session = await Auth.currentSession();

      const data = await fetch("https://pfcd323x70.execute-api.us-west-1.amazonaws.com/dev", 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session.getIdToken().getJwtToken(),
          body: JSON.stringify(userInfo)
        },
      }
      )
      console.log('Data:', data.json());
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email,          // optional
          phone_number: phoneNumber,   // optional - E.164 number convention
        }
      });
      console.log('Sign up success!', signUpResponse);
      Alert.alert("Signup Success!", "A verification code has been sent to your email.");
    } catch (error) {
      console.log('Error signing up:', error);
      Alert.alert("Signup Error", error.message || "An error occurred during sign up.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SignUp;
