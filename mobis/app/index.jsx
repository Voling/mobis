import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

// Screen imports
import HomeScreen from "./HomeScreen.jsx";
import LeaderboardScreen from "./Leaderboard.jsx";
import ProfileScreen from "./ProfileScreen.jsx";
import Simple from "./Simple.jsx";

const Tab = createBottomTabNavigator();

function Index() {
  return (
      <Simple />
)};

export default Index;