import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';


import {AppContainer, AppText} from '../../../components/common';

import {colors} from '../../../theme/colors';
import {radius} from '../../../theme/radius';
import {spacing} from '../../../theme/spacing';

import type {MainStackParamList} from '../../../navigation/types';

type ChatNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Chat'
>;

type ChatRouteProp = RouteProp<
  MainStackParamList,
  'Chat'
>;

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hey! 👋',
    time: '10:30',
    isMine: false,
  },
  {
    id: '2',
    text: 'Hey! How are you?',
    time: '10:31',
    isMine: true,
  },
  {
    id: '3',
    text: "I'm doing great. What about you?",
    time: '10:32',
    isMine: false,
  },
  {
    id: '4',
    text: 'Im good too!',
    time: '10:33',
    isMine: true,
  },
];

const ChatScreen = () => {
  const navigation = useNavigation<ChatNavigationProp>();

  const route = useRoute<ChatRouteProp>();

  const {name} = route.params;

  const [message, setMessage] = useState('');

  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMine: true,
    };

    setMessages(previousMessages => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage('');
  };

  const renderMessage = ({
    item,
  }: {
    item: Message;
  }) => {
    return (
      <View
        style={[
          styles.messageRow,
          item.isMine
            ? styles.myMessageRow
            : styles.otherMessageRow,
        ]}>

        <View
          style={[
            styles.messageBubble,
            item.isMine
              ? styles.myMessage
              : styles.otherMessage,
          ]}>

          <AppText
            variant="body"
            color={
              item.isMine
                ? colors.white
                : colors.black
            }>
            {item.text}
          </AppText>

          <AppText
            variant="caption"
            color={
              item.isMine
                ? '#CCCCCC'
                : colors.mutedText
            }
            style={styles.messageTime}>
            {item.time}
          </AppText>

        </View>
      </View>
    );
  };

  return (
    <AppContainer style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        {/* Header */}

        <View style={styles.header}>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>

            <AppText
              variant="h2">
              ‹
            </AppText>

          </Pressable>

          <View style={styles.avatar}>
            <AppText
              variant="bodyMedium"
              color={colors.white}>
              {name.charAt(0).toUpperCase()}
            </AppText>
          </View>

          <View style={styles.headerInfo}>

            <AppText variant="bodyMedium">
              {name}
            </AppText>

            <AppText
              variant="caption"
              color={colors.secondaryText}>
              Online
            </AppText>

          </View>

          <Pressable style={styles.headerAction}>
            <AppText variant="h2">
              ⋯
            </AppText>
          </Pressable>

        </View>

        {/* Messages */}

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={
            styles.messagesContainer
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* Input */}

        <View style={styles.inputContainer}>

          <Pressable style={styles.addButton}>
            <AppText variant="h2">
              +
            </AppText>
          </Pressable>

          <View style={styles.inputWrapper}>

            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Message..."
              placeholderTextColor={
                colors.mutedText
              }
              style={styles.input}
              multiline
            />

          </View>

          <Pressable
            onPress={handleSend}
            disabled={!message.trim()}
            style={[
              styles.sendButton,
              !message.trim() &&
                styles.sendButtonDisabled,
            ]}>

            <AppText
              variant="bodyMedium"
              color={colors.white}>
              ↑
            </AppText>

          </Pressable>

        </View>

      </KeyboardAvoidingView>
    </AppContainer>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },

  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    justifyContent: 'flex-end',
  },

  messageRow: {
    width: '100%',
    marginBottom: spacing.sm,
  },

  myMessageRow: {
    alignItems: 'flex-end',
  },

  otherMessageRow: {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: '78%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },

  myMessage: {
    backgroundColor: colors.black,
    borderBottomRightRadius: spacing.xs,
  },

  otherMessage: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: spacing.xs,
  },

  messageTime: {
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },

  addButton: {
    width: 42,
    height: 42,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputWrapper: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },

  input: {
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    color: colors.black,
    paddingVertical: spacing.sm,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.35,
  },
});