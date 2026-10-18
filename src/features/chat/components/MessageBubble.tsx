import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '../../../components/common';

import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { spacing } from '../../../theme/spacing';

import type { Message } from '../types/chat.types';

type groupPosition = 'first' | 'middle' | 'last' | 'single'

type MessageBubbleProps = {
  message: Message;
  groupPosition: groupPosition
};

export const MessageBubble = ({
  message,
  groupPosition
}: MessageBubbleProps) => {
  return (
    <View
      style={[
        styles.messageRow,
        message.isMine
          ? styles.myMessageRow
          : styles.otherMessageRow,
      ]}>

      <View
        style={[
          styles.messageBubble,
          message.isMine ? styles.myMessage : styles.otherMessage,
          groupPosition === 'middle' && styles.middleBubble,
          groupPosition === 'first' &&
          (message.isMine ? styles.myFirstBubble : styles.otherFirstBubble),
          groupPosition === 'last' &&
          (message.isMine ? styles.myLastBubble : styles.otherLastBubble),
        ]}>

        <AppText
          variant="body"
          color={
            message.isMine
              ? colors.white
              : colors.black
          }>
          {message.text}
        </AppText>

        <AppText
          variant="caption"
          color={
            message.isMine
              ? '#CCCCCC'
              : colors.mutedText
          }
          style={styles.messageTime}>
          {message.time}
        </AppText>

        {message.isMine && (
          <AppText
            variant="caption"
            color={message.status === 'read' ? '#60A5FA' : '#CCCCCC'}>
            {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓ (Read)'}

          </AppText>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    width: '100%',
    marginBottom: spacing.xs,
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
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  middleBubble: {
    borderRadius: radius.lg,
  },

  myFirstBubble: {
    borderBottomRightRadius: radius.xs,
  },

  myLastBubble: {
    borderTopRightRadius: radius.xs,
  },

  otherFirstBubble: {
    borderBottomLeftRadius: radius.xs,
  },

  otherLastBubble: {
    borderTopLeftRadius: radius.xs,
  },
});