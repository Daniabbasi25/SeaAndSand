import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const TextApp = (props) => {
    const { fonts, fontSizes, colors } = useTheme();
    const handleFont = () => {
        if (props?.thinItalic)
            return fonts.thinItalic;
        else if (props?.thin)
            return fonts.thin;
        else if (props?.extraLightItalic)
            return fonts.extraLightItalic;
        else if (props?.extraLight)
            return fonts.extraLight;
        else if (props?.lightItalic)
            return fonts.lightItalic;
        else if (props?.light)
            return fonts.light;
        else if (props?.regularItalic)
            return fonts.regularItalic;
        else if (props?.regular)
            return fonts.regular;
        else if (props?.mediumItalic)
            return fonts.mediumItalic;
        else if (props?.medium)
            return fonts.medium;
        else if (props?.semiBoldItalic)
            return fonts.semiBoldItalic;
        else if (props?.semiBold)
            return fonts.semiBold;
        else if (props?.boldItalic)
            return fonts.boldItalic;
        else if (props?.bold)
            return fonts.bold;
        else if (props?.extraBoldItalic)
            return fonts.extraBoldItalic;
        else if (props?.extraBold)
            return fonts.extraBold;
        else if (props?.blackItalic)
            return fonts.blackItalic;
        else if (props?.black)
            return fonts.black;
        else
            return fonts.regular;
    }
    const handleSize = () => {
        if (props?.caption)
            return { fontSize: fontSizes.caption };
        else if (props?.button)
            return { fontSize: fontSizes.button };
        else if (props?.body)
            return { fontSize: fontSizes.body };
        else if (props?.title)
            return { fontSize: fontSizes.title };
        else if (props?.h8)
            return { fontSize: fontSizes.h8 };
        else if (props?.h7)
            return { fontSize: fontSizes.h7 };
        else if (props?.h6)
            return { fontSize: fontSizes.h6 };
        else if (props?.h5)
            return { fontSize: fontSizes.h5 };
        else if (props?.h4)
            return { fontSize: fontSizes.h4 };
        else if (props?.h3)
            return { fontSize: fontSizes.h3 };
        else if (props?.h2)
            return { fontSize: fontSizes.h2 };
        else if (props?.h1)
            return { fontSize: fontSizes.h1 };
        else
            return { fontSize: fontSizes.body };
    }
    const handleColor = () => {
        if (props?.primary)
            return { color: colors.primary };
        else if (props?.secondary)
            return { color: colors.secondary };
        else if (props?.tertiary)
            return { color: colors.tertiary };
        else if (props?.quaternary)
            return { color: colors.quaternary };
        else if (props?.disabled)
            return { color: colors.disabled };
        else if (props?.error)
            return { color: colors.error };
        else if (props?.success)
            return { color: colors.success };
        else if (props?.textPrimary)
            return { color: colors.textPrimary };
        else if (props?.textSecondary)
            return { color: colors.textSecondary };
        else if (props?.background)
            return { color: colors.background };
        else if (props?.placeholder)
            return { color: colors.placeholder };
        else
            return { color: colors.textPrimary };
    }
    const handlePosition = () => {
        if (props?.center) {
            return { textAlign: 'center' };
        }
        else if (props?.left) {
            return { textAlign: 'left' };
        }
        else if (props?.right) {
            return { textAlign: 'right' };
        }
        else if (props?.justify) {
            return { textAlign: 'justify' };
        }
    }

    let properties = { ...handleFont(), ...handleSize(), ...handleColor(), ...handlePosition() };
    return (
        <Text {...props} style={[styles.base, props.style, { ...properties }]}>{props?.children}</Text >
    )
};

const styles = StyleSheet.create({
    base: {
        fontFamily: 'Montserrat',
        fontWeight: '400'
    }
})

export default React.memo(TextApp);