import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';

import {AppText} from '../../../components/common/AppText';
import {colors} from '../../../theme/colors';

export const SplashScreen = () => {
  const navigation = useNavigation();

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('Onboarding'));
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity,
            transform: [{scale}],
          },
        ]}>
        <View style={styles.logo}>
          <AppText variant="h1" color={colors.white}>
            M
          </AppText>
        </View>

        <AppText
          variant="h1"
          color={colors.white}
          style={styles.title}>
          MyChat
        </AppText>

        <AppText
          variant="caption"
          color="#AAAAAA"
          style={styles.subtitle}>
          Simple. Private. Connected.
        </AppText>
      </Animated.View>

      <AppText
        variant="caption"
        color="#777777"
        style={styles.footer}>
        Made for conversations
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 8,
  },

  footer: {
    position: 'absolute',
    bottom: 32,
  },
});