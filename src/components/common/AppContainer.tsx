import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type AppContainerProps = {
    children: ReactNode;
    style?: ViewStyle;
};

export const AppContainer = ({
    children,
    style,
}: AppContainerProps) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
});