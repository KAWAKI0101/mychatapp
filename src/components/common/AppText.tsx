import {colors} from '../../theme/colors';
import {typography} from '../../theme/typography';
import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

type TextVariants = 
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body'
    | 'bodyMedium'
    | 'caption'
    | 'button';


type AppTextProps = TextProps & {
    variant?: TextVariants;
    color?: string;
}

export const AppText = ({
    variant = 'body',
    color = colors.text,
    style,
    children,
    ...props
}: AppTextProps) => {
    return (
        <Text
            {...props}
            style={[
                styles.base,
                typography[variant],
                { color },
                style,
            ]}
        >
            {children}
        </Text>
    )
};

const styles = StyleSheet.create({
    base: {
        fontFamily: 'System',
    },
});
    
