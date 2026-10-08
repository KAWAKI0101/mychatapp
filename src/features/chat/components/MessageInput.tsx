import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {AppText} from '../../../components/common';

import {colors} from '../../../theme/colors';
import {radius} from '../../../theme/radius';
import {spacing} from '../../../theme/spacing';

type MessageInputProps = {
  onSend: (message: string) => void;
};

export const MessageInput = ({onSend}: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSend(trimmedMessage);

    setMessage('');
  };

  return (
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
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          multiline
        />

      </View>

      <Pressable
        onPress={handleSend}
        disabled={!message.trim()}
        style={[
          styles.sendButton,
          !message.trim() && styles.sendButtonDisabled,
        ]}>

        <AppText
          variant="bodyMedium"
          color={colors.white}>
          ↑
        </AppText>

      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: spacing.md,
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
    paddingTop: spacing.sm,
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
    marginRight: spacing.md,
  },

  sendButtonDisabled: {
    opacity: 0.35,
  },
});