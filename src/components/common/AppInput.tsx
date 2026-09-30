
import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colors} from '../../theme/colors';
import {radius} from '../../theme/radius';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';

type AppInputProps = TextInputProps;

export const AppInput = ({style, ...props}: AppInputProps) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.mutedText}
      style={[styles.input, style]}
    />
  );
}


const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    ...typography.body,
    color: colors.text,
  },
});