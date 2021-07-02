import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { CUSTOM_COLORS } from "../../types/colors";
import { StyleSheet } from 'react-native';

export default function FixtureLinearGradient() {

    return (
        <LinearGradient
        // Background Linear Gradient
        colors={[CUSTOM_COLORS.safetyYellow, 'transparent']}
        style={styles.background}
    />
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 90
    },
});