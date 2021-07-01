import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { CUSTOM_COLORS } from '../types/colors';
import { StyleSheet, View } from 'react-native';


export function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.spinner} size={'large'} animating={true} color={CUSTOM_COLORS.green} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    flex: 1,
    alignSelf: 'center'
  }
});
 