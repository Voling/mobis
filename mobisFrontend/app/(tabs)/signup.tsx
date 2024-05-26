import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '../../src/aws-exports';

interface SignUpProps {
  apiURL: string; // This prop could be used to dynamically set the API URL
}

const SignUp: React.FC<SignUpProps> = ({ apiURL }) => {
  Amplify.configure(awsconfig);

  const [uname, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSignUp = async () => {
    try {
      console.log("Signing up...");
      const userInfo = { 
        name: uname, 
        preferred_username: uname, 
        password, 
        email, 
        phone_number: phoneNumber,
        runExperience: "1" // Assuming runExperience is a constant for now
      };

      // Call custom Lambda function for signup
      const response = await fetch("https://pfcd323x70.execute-api.us-west-1.amazonaws.com/dev/auth/signup", 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      // const response = await fetch("https://pfcd323x70.execute-api.us-west-1.amazonaws.com/dev/userInfo/getRank", 
      // {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'username': 'test'
      //   },
      //   body: JSON.stringify(userInfo),
      // });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Proceed with Cognito sign-up if necessary
      const signUpResponse = await Auth.signUp({
        username: uname,
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
        value={uname}
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