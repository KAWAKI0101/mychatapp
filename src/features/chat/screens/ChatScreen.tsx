import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MessageBubble } from '../components/MessageBubble';
import { AppContainer } from '../../../components/common';
import { MessageInput } from '../components/MessageInput';
import { spacing } from '../../../theme/spacing';

import type { MainStackParamList } from '../../../navigation/types';
import { ChatHeader } from '../components/ChatHeader';
import { Message } from '../types/chat.types';
import { INITIAL_MESSAGES } from '../mock/message';
import { TypingIndicator } from '../components/TypingIndicator'
type ChatNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Chat'
>;

type ChatRouteProp = RouteProp<
  MainStackParamList,
  'Chat'
>;



const ChatScreen = () => {
  const navigation = useNavigation<ChatNavigationProp>();

  const route = useRoute<ChatRouteProp>();

  const { name } = route.params;

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);
  const messagesListRef = useRef<FlatList<Message>>(null);

  const handleSend = (text: string) => {

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMine: true,
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    simulateTyping();
  };

  const simulateTyping = () => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  const renderMessage = ({
  item,
  index,
}: {
  item: Message;
  index: number;
}) => {
  const previousMessage = messages[index - 1];
  const nextMessage = messages[index + 1];

  const sameAsPrevious =
    previousMessage?.isMine === item.isMine;

  const sameAsNext =
    nextMessage?.isMine === item.isMine;

  let groupPosition: 'first' | 'middle' | 'last' | 'single';

  if (!sameAsPrevious && !sameAsNext) {
    groupPosition = 'single';
  } else if (!sameAsPrevious) {
    groupPosition = 'first';
  } else if (!sameAsNext) {
    groupPosition = 'last';
  } else {
    groupPosition = 'middle';
  }

  return (
    <MessageBubble
      message={item}
      groupPosition={groupPosition}
    />
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


        <ChatHeader
          name={name}
          onBack={() => navigation.goBack()}
        />

        {/* Messages */}

        <FlatList
          ref={messagesListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          onContentSizeChange={() =>
            messagesListRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={
            styles.messagesContainer
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        <TypingIndicator name={name} visible={isTyping} onSimulate={simulateTyping} />
        {/* input for sending messages  */}
        <MessageInput onSend={handleSend} />


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
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    justifyContent: 'flex-end',
  },

});