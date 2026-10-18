import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackParamList, MainTabParamList } from './types';

import { HomeScreen } from '../features/home/screens/HomeScreen';
import { ChatListScreen } from '../features/chat/screens/ChatListScreen';
import { RoomListScreen } from '../features/room/screens/RoomListScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import ChatScreen from '../features/chat/screens/ChatScreen';
import { CreateRoomScreen } from '../../src/features/room/screens/CreateRoomScreen';
import { RoomProvider } from '../features/room/context/RoomContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Chats"
        component={ChatListScreen}
      />

      <Tab.Screen
        name="Rooms"
        component={RoomListScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <RoomProvider>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen
          name="Tabs"
          component={MainTabs}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Stack.Screen name='CreateRoom' component={CreateRoomScreen} />
        <Stack.Screen name="Room" component={RoomListScreen} />
      </Stack.Navigator>
    </RoomProvider>
  );
};