import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  AppContainer,
  AppInput,
  AppText,
} from '../../../components/common';

import {colors} from '../../../theme/colors';
import {radius} from '../../../theme/radius';
import {spacing} from '../../../theme/spacing';

import type {MainStackParamList} from '../../../navigation/types';

type ChatNavigationProp = NativeStackNavigationProp<
  MainStackParamList
>;

type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  initial: string;
  unreadCount: number;
  online: boolean;
};

const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Alex',
    message: 'Hey, are you free today?',
    time: '10:42',
    initial: 'A',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah',
    message: "Let's discuss the project.",
    time: '09:18',
    initial: 'S',
    unreadCount: 0,
    online: true,
  },
  {
    id: '3',
    name: 'John',
    message: 'See you tomorrow!',
    time: 'Yesterday',
    initial: 'J',
    unreadCount: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Emma',
    message: 'That sounds great 👍',
    time: 'Yesterday',
    initial: 'E',
    unreadCount: 4,
    online: false,
  },
  {
    id: '5',
    name: 'David',
    message: 'Can you send me the file?',
    time: 'Monday',
    initial: 'D',
    unreadCount: 0,
    online: false,
  },
];

export const ChatListScreen = () => {
  const navigation = useNavigation<ChatNavigationProp>();

  const [search, setSearch] = useState('');

  const filteredChats = MOCK_CHATS.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChatPress = useCallback(
    (chat: Chat) => {
      navigation.navigate('Chat', {
        chatId: chat.id,
        name: chat.name,
      });
    },
    [navigation],
  );

  const renderChat = ({item}: {item: Chat}) => {
    return (
      <Pressable
        onPress={() => handleChatPress(item)}
        style={({pressed}) => [
          styles.chatItem,
          pressed && styles.pressed,
        ]}>
        
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <AppText
              variant="bodyMedium"
              color={colors.white}>
              {item.initial}
            </AppText>
          </View>

          {item.online && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.topRow}>
            <AppText variant="bodyMedium">
              {item.name}
            </AppText>

            <AppText
              variant="caption"
              color={colors.mutedText}>
              {item.time}
            </AppText>
          </View>

          <View style={styles.bottomRow}>
            <AppText
              variant="caption"
              color={colors.secondaryText}
              numberOfLines={1}
              style={styles.message}>
              {item.message}
            </AppText>

            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <AppText
                  variant="caption"
                  color={colors.white}>
                  {item.unreadCount}
                </AppText>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <AppContainer style={styles.container}>
      <View style={styles.header}>
        <View>
        

          <AppText variant="h1">
            Chats
          </AppText>
        </View>

        <Pressable style={styles.newChatButton}>
          <AppText
            variant="h2"
            color={colors.white}>
            +
          </AppText>
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search chats"
        />
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        renderItem={renderChat}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText variant="h3">
              No chats found
            </AppText>

            <AppText
              variant="body"
              color={colors.secondaryText}
              style={styles.emptyText}>
              Try searching for another person.
            </AppText>
          </View>
        }
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:spacing.md
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },

  newChatButton: {
    width: 44,
    height: 44,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    marginBottom: spacing.lg,
  },

  listContent: {
    paddingBottom: spacing.xxxl,
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  onlineDot: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 13,
    height: 13,
    borderRadius: radius.round,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.black,
  },

  chatContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  message: {
    flex: 1,
  },

  unreadBadge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },

  pressed: {
    opacity: 0.6,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.huge,
  },

  emptyText: {
    marginTop: spacing.sm,
  },
});