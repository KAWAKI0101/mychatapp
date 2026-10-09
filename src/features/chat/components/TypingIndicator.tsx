
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '../../../components/common/AppText';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';
import { colors } from '../../../theme/colors';


type TypingIndicatorProps = {
    name: string;
    visible: boolean;
    onSimulate: () => void;
}

export const TypingIndicator = ({ name, visible, onSimulate }: TypingIndicatorProps) => {

    if (!visible) return null;


    return (
        <View style={styles.container}>
            <View style={styles.bubble}>

                <AppText>{name} is typing...</AppText>
            </View>
        </View>
    )
}

export default TypingIndicator

const styles = StyleSheet.create({

    container: {
        alignItems: 'flex-start',
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
    },
    bubble: {
        backgroundColor: colors.receivedMessage,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
})