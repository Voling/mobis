import { Tabs } from 'expo-router';
import React from 'react';

import { FlatList } from 'react-native'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import Boot from '../../assets/svgs/Boot'
import TrophyClicked from '../../assets/svgs/TrophyClicked'
import BootClick from '../../assets/svgs/BootClick'
import TrophyUnclicked from '../../assets/svgs/TrophyUnclicked'

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, focused }) => (
            focused ? <TrophyClicked/> : <TrophyUnclicked/>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'feed',
          tabBarIcon: ({ color, focused }) => (
            focused ? <BootClick/> : <Boot/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            focused ? <BootClick/> : <Boot/>
          ),
        }}
      />
    </Tabs>
  );
}
