import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './landing/landing';
import LoginPage from './(tabs)/login';
import SignUpPage from './(tabs)/signup';
import HomePage from './(tabs)';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function App() {
  const { user, checkLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkLoggedIn();
    console.log('dab')
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is signed in
          <Stack.Screen name="Home" component={HomePage} />
        ) : (
          // No user is signed in
          <>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;