import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';


type AppButtonProps = PressableProps & {
  title?: string;
  loading?: boolean;
  children?: ReactNode;
};

export const AppButton = ({
  title,
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.container,
        typeof style === 'function' ? style({pressed}) : style,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        children ?? <AppButtonText title={title} />
      )}
    </Pressable>
  );
};

const AppButtonText = ({title}: {title?: string}) => {
  return <AppButtonTextComponent>{title}</AppButtonTextComponent>;
};

const AppButtonTextComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {Text} = require('react-native');

  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    marginHorizontal:spacing.md
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    ...typography.button,
    color: colors.white,
  },
});