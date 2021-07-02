/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image } from 'react-native';
import { List } from 'react-native-paper';
import Match from '../screens/match/Match';
import Standings from '../screens/match/Standings';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Match" component={MatchStackScreen} /> */}

      <Tab.Screen name="Home" component={HomeStackScreen} />
    </Stack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Scores" component={TabOneScreen} options={{ headerTitle: props => <LogoTitle title="Fixtures"/> }} />
      <HomeStack.Screen name="Match" component={Match} options={{ headerTitle: props => <LogoTitle title="Match"/> }} />
      <HomeStack.Screen name="Standings" component={Standings} options={{ headerTitle: props => <LogoTitle title="Standings"/> }} />
    </HomeStack.Navigator>
  );
}

function LogoTitle(props: { title: string }) {
  return (
    <List.Item title={props.title}
    titleStyle={{
      paddingLeft: 20
    }}
    left={() => <Image
      style={{ 
        width: 50, 
        height: 50
       }}
      source={require('../assets/logo/logo_small.png')}
    />}
    />
  );
}

// const MatchStack = createStackNavigator();

// function MatchStackScreen() {
//   return (
//     <MatchStack.Navigator>
//       <MatchStack.Screen name="Match" component={Match} />
//       <MatchStack.Screen name="Match" component={Match} />
//     </MatchStack.Navigator>
//   );
// }