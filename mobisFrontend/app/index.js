import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import { AuthProvider } from '../context/AuthContext'; // Import the provider

const Root = () => (
    <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
        <App />
    </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);