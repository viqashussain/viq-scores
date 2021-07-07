// import Reactotron from 'reactotron-react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// if (__DEV__) {
//   Reactotron
//     .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
//     .configure() // controls connection & communication settings
//     .useReactNative() // add all built-in react native plugins
//     .connect() // let's connect!
//   // import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
// }


import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, View } from './components/Themed';
import { StyleSheet } from 'react-native';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return (
      <Text>Loading...</Text>
    );
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}


const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
});
