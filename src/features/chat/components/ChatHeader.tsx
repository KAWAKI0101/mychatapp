import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {AppText} from '../../../components/common';
import {colors} from '../../../theme/colors';
import {radius} from '../../../theme/radius';
import {spacing} from '../../../theme/spacing';

type ChatHeaderProps = {
  name: string;
  onBack: () => void;
};

export const ChatHeader = ({
  name,
  onBack,
}: ChatHeaderProps) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        style={styles.backButton}>
        <AppText variant="h2">
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
  );
};

const styles = StyleSheet.create({
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
});