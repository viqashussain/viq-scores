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
