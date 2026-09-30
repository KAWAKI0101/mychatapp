import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  AppButton,
  AppContainer,
  AppText,
} from '../../../components/common';

import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/spacing';
import { RootStackParamList } from 'src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;


export const OnboardingScreen = () => {
 const navigation = useNavigation<OnboardingNavigationProp>();

  const handleGetStarted = () => {
    navigation.replace('Auth');
  };

  return (
    <AppContainer style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.messageBubble}>
            <AppText variant="h2" color={colors.black}>
              ...
            </AppText>
          </View>
        </View>

        <View style={styles.textContainer}>
          <AppText variant="h1" style={styles.title}>
            Chat without limits.
          </AppText>

          <AppText
            variant="body"
            color={colors.secondaryText}
            style={styles.description}>
            Connect with people, share moments and keep your
            conversations simple.
          </AppText>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <AppButton
          title="Get Started"
          onPress={handleGetStarted}
        />

        <AppText
          variant="caption"
          color={colors.mutedText}
          style={styles.footer}>
          Simple. Private. Connected.
        </AppText>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },

  messageBubble: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.md,
    maxWidth: 320,
  },

  bottomContainer: {
    paddingBottom: spacing.lg,
  },

  footer: {
    textAlign: 'center',
    marginTop: spacing.md,
  },
});