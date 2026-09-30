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

    
    const handleContinue = () => {
        const trimmedPhone = phone.trim();
        if (!trimmedPhone || trimmedPhone.length < 10) {
            return;
        }

        navigation.navigate('Otp', { phone: trimmedPhone });
    };

    return (
        <AppContainer style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}>
                <View style={styles.logoWrap}>
                    <View style={styles.logoBadge}>
                        <AppText variant="h2" color={colors.white}>
                            M
                        </AppText>
                    </View>
                </View>

                <View style={styles.containertitle}>
                    <AppText variant="h1" style={styles.title}>
                        Welcome back
                    </AppText>
                </View>

                <View style={styles.subtitlecontainer}>

                    <AppText variant="body" color={colors.secondaryText} style={styles.subtitle}>
                        Sign in to continue your conversations with friends and family.
                    </AppText>
                </View>
                <View style={styles.inputCard}>
                    <AppText variant="caption" color={colors.secondaryText} style={styles.label}>
                        Phone number
                    </AppText>

                    <View style={styles.inputRow}>
                        <View style={styles.countryCode}>
                            <AppText variant="bodyMedium">+1</AppText>
                        </View>

                        <AppInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter your number"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                        />
                    </View>
                </View>

                <AppButton
                    title='Continue'
                    onPress={handleContinue}
                    style={({ pressed }:any) => [
                        styles.primaryButton,
                        pressed && styles.primaryButtonPressed,
                    ]}
                    >

                </AppButton>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <AppText variant="caption" color={colors.mutedText} style={styles.dividerText}>
                        or
                    </AppText>
                    <View style={styles.dividerLine} />
                </View>

                <AppButton title='Continue with Google' style={styles.secondaryButton}>
                    <View style={styles.googleMark} />
                </AppButton>

                <View style={styles.footer}>
                    <AppText variant="body" color={colors.secondaryText}>
                        New here?
                    </AppText>
                    <Pressable>
                        <AppText variant="bodyMedium" color={colors.primary} style={styles.signUpText}>
                            Create account
                        </AppText>
                    </Pressable>
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
        justifyContent: 'center',
        paddingVertical: spacing.huge,
    },
    logoWrap: {
        alignItems: 'center',
        marginBottom: spacing.xxxl,
    },
    logoBadge: {
        width: 84,
        height: 84,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 6,
    },
    title: {
        marginBottom: spacing.md,
        marginVertical: spacing.md
    },
    containertitle: {
        justifyContent: "center",
        alignItems: 'center'
    },
    subtitle: {
        marginBottom: spacing.xxl,
        lineHeight: 24,
    },
    inputCard: {
        marginBottom: spacing.xxl,
        margin:spacing.sm
    },
    label: {
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    subtitlecontainer:{
        justifyContent:"center",
        alignItems:"center",
        margin:spacing.md
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.xl,
        paddingLeft: spacing.sm,
        paddingRight: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    countryCode: {
        minWidth: 52,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRightWidth: 1,
        borderRightColor: colors.border,
        marginRight: spacing.md,
    },
    input: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: 'transparent',
        minHeight: 56,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 0,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
        elevation: 5,
    },
    primaryButtonPressed: {
        opacity: 0.9,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        marginHorizontal: spacing.md,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.xl,
        marginBottom: spacing.xxl,
    },
    googleMark: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#EA4335',
        marginRight: spacing.md,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xs,
    },
    signUpText: {
        marginLeft: spacing.xs,
    },
});