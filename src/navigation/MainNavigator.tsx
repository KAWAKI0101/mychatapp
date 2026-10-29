
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House,
  MessagesSquare,
  UsersRound,
  UserRound,
} from 'lucide-react-native';

import { MainStackParamList, MainTabParamList } from './types';

import { HomeScreen } from '../features/home/screens/HomeScreen';
import { ChatListScreen } from '../features/chat/screens/ChatListScreen';
import { RoomListScreen } from '../features/room/screens/RoomListScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import ChatScreen from '../features/chat/screens/ChatScreen';
import { CreateRoomScreen } from '../features/room/screens/CreateRoomScreen';
import { RoomChatScreen } from '../features/room/screens/RoomChatScreen';
import { RoomProvider } from '../features/room/context/RoomContext';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#8C8C91',

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
          marginBottom: 3,
        },

        tabBarStyle: {
          height: 66,
          paddingTop: 8,
          paddingBottom: 5,
          backgroundColor: '#F7F7F7',
          borderTopColor: '#E5E5E5',
          borderTopWidth: 0.7,
          elevation: 0,
        },

        tabBarIcon: ({ color, focused }) => {
          const iconProps = {
            size: 23,
            color,
            strokeWidth: focused ? 2.4 : 1.8,
          };

          switch (route.name) {
            case 'Home':
              return <House {...iconProps} />;

            case 'Chats':
              return <MessagesSquare {...iconProps} />;

            case 'Rooms':
              return <UsersRound {...iconProps} />;

            case 'Profile':
              return <UserRound {...iconProps} />;

            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatListScreen} />
      <Tab.Screen name="Rooms" component={RoomListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <RoomProvider>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
        <Stack.Screen name="Room" component={RoomChatScreen} />
      </Stack.Navigator>
    </RoomProvider>
  );
};
