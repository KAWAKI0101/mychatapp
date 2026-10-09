import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import {
  AppButton,
  AppContainer,
  AppText,
} from '../../../components/common';

import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { spacing } from '../../../theme/spacing';

import type { AuthStackParamList } from '../../../navigation/types';

type OtpNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Otp'
>;

type OtpRouteProp = RouteProp<
  AuthStackParamList,
  'Otp'
>;

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

export const OtpScreen = () => {
  const navigation = useNavigation<OtpNavigationProp>();
  const route = useRoute<OtpRouteProp>();

  const { phone } = route.params;

  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(previous => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const handleOtpChange = (value: string) => {
    const numericValue = value
      .replace(/[^0-9]/g, '')
      .slice(0, OTP_LENGTH);

    setOtp(numericValue);
  };

  const handleVerify = () => {
    if (otp.length !== OTP_LENGTH) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigation.getParent()?.dispatch(StackActions.replace('Main'));
    }, 800);
  };

  const handleResend = () => {
    if (secondsLeft > 0) {
      return;
    }

    setSecondsLeft(RESEND_TIME);

    // OTP resend API will be added later.
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

  return (
    <AppContainer style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>

        {/* Rive animated avatar goes here */}
        <View style={styles.avatarArea} />


        <View style={styles.card}>

          <AppText variant="body" color={colors.secondaryText} style={styles.centerText}>
            Enter the OTP sent to {phone}
          </AppText>

          <Pressable
            onPress={() => inputRef.current?.focus()}
            style={styles.otpContainer}>

            {Array.from({ length: OTP_LENGTH }).map((_, index) => {
              const digit = otp[index];
              const isActive = index === otp.length;

              return (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    isActive && styles.otpBoxActive,
                  ]}>
                  <AppText variant="h2">
                    {digit || ''}
                  </AppText>
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={handleOtpChange}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            maxLength={OTP_LENGTH}
            style={styles.hiddenInput}
          />

          <AppButton
            title="Verify"
            onPress={handleVerify}
            loading={loading}
            disabled={otp.length !== OTP_LENGTH}
            style={styles.verifyButton}
          />


          <View style={styles.resendContainer}>
            {secondsLeft > 0 ? (
              <AppText
                variant="body"
                color={colors.secondaryText}>
                Resend code in {secondsLeft}s
              </AppText>
            ) : (
              <Pressable onPress={handleResend}>
                <AppText
                  variant="bodyMedium"
                  color={colors.primary}>
                  Resend code
                </AppText>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  avatarArea: {
    flex: 1, // Rive avatar area

    backgroundColor: colors.black,
  },
  card: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    zIndex: 99,
  },

  centerText: {
    textAlign: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: 0,
    paddingVertical: spacing.sm,
    paddingRight: spacing.lg,
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },

  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },

  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  subtitle: {
    textAlign: 'center',
  },

  phone: {
    marginTop: spacing.xs,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    margin: spacing.md
  },

  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpBoxActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },

  verifyButton: {
    marginBottom: spacing.xl,

  },

  resendContainer: {
    alignItems: 'center',
  },
});