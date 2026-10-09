import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CountryPicker, {
    getEmojiFlag,
    type CountryCode,
} from 'react-native-country-picker-modal';
import { AuthStackParamList } from 'src/navigation/types';
import { AppContainer } from '../../../components/common/AppContainer';
import { AppInput } from '../../../components/common/AppInput';
import { AppText } from '../../../components/common/AppText';
import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { spacing } from '../../../theme/spacing';
import { AppButton } from '../../../components/common/AppButton';

type LoginNavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginNavigationProps>();
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('US');
    const [callingCode, setCallingCode] = useState('1');


    const handleContinue = () => {
        const nationalNumber = phone.replace(/\D/g, '');
        if (nationalNumber.length < 4 || nationalNumber.length > 15) {
            return;
        }

        navigation.navigate('Otp', { phone: `+${callingCode} ${nationalNumber}` });
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
                        Welcome to MyChatApp! Please login in to continue.
                    </AppText>

                    <View style={styles.phoneRow}>
                        <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCallingCode
                            withEmoji
                            onSelect={country => {
                                setCountryCode(country.cca2);
                                setCallingCode(country.callingCode[0]);
                            }}
                            renderFlagButton={({ onOpen }) => (
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel={`Select country calling code, currently +${callingCode}`}
                                    onPress={onOpen}
                                    style={styles.countryCode}>
                                    <AppText variant="bodyMedium">
                                        {getEmojiFlag(countryCode)}  +{callingCode}  ⌄
                                    </AppText>
                                </Pressable>
                            )}
                        />

                        <AppInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="--- --- ----"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.phoneInput}
                        />
                    </View>

                    <AppButton
                        title="Login with Phone number"
                        onPress={handleContinue}
                        style={({ pressed }: any) => [
                            styles.signInButton,
                            pressed && styles.primaryButtonPressed,
                        ]}
                    />
                </View>
            </KeyboardAvoidingView>
        </AppContainer>
    );
};

export default LoginScreen;

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

        // backgroundColor: colors.black,
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
    signUpText: {
        marginTop: spacing.xs,
        marginBottom: spacing.xl,
    },
    phoneRow: {
        flexDirection: 'row',
        gap: spacing.lg,
        marginBottom: spacing.md,
    },
    countryCode: {
        height: 60,
        paddingHorizontal: spacing.lg,
        backgroundColor: '#F0F0F0',
        borderRadius: radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: '#F0F0F0',
        borderWidth: 0,
        borderRadius: radius.xl,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: radius.xl,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    passwordInput: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
    },
    forgot: {
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    signInButton: {
        backgroundColor: colors.black,
        paddingVertical: spacing.lg,
        borderRadius: radius.round,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonPressed: {
        opacity: 0.9,
    },
});