/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Dimensions, Image, Modal, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, List, Portal, Provider, Text } from 'react-native-paper';
import Match from '../screens/match/Match';
import Standings from '../screens/match/Standings';

import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList } from '../types';
import { CUSTOM_COLORS } from '../types/colors';
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
      <HomeStack.Screen name="Scores" component={TabOneScreen} options={{ headerTitle: props => <LogoTitle title="Fixtures" /> }} />
      <HomeStack.Screen name="Match" component={Match} options={{ headerTitle: props => <LogoTitle title="Match" /> }} />
      <HomeStack.Screen name="Standings" component={Standings} options={{ headerTitle: props => <LogoTitle title="Standings" /> }} />
    </HomeStack.Navigator>
  );
}

function LogoTitle(props: { title: string }) {
  const infoIconPressed = () => {
    setVisible(true);
  }
  
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};


  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: "wrap",
      width: Dimensions.get('window').width,
    }}>
      <View></View>
      <List.Item title={props.title}
        titleStyle={{
          paddingLeft: 20,
          textAlign: 'center'
        }}
        style={{
        }}
        left={() => <Image
          style={{
            width: 50,
            height: 50,
            marginLeft: 20
          }}
          source={require('../assets/logo/logo_small.png')}
        />}
      />
      <TouchableOpacity onPress={() => showModal()}>
        <Icon style={{
          paddingTop: 15,
          marginRight: 20
        }} name="info" size={25} color={CUSTOM_COLORS.safetyYellow} />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Developed by Viqas Hussain.</Text>
            <Text style={styles.modalText}>You can contact me at viqashussain@hotmail.co.uk</Text>
            <Text style={styles.modalText}>viqas.co.uk</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: CUSTOM_COLORS.safetyYellow
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

 // const MatchStack = createStackNavigator();

 // function MatchStackScreen() {
 //   return (
 //     <MatchStack.Navigator>
 //       <MatchStack.Screen name="Match" component={Match} />
 //       <MatchStack.Screen name="Match" component={Match} />
 //     </MatchStack.Navigator>
 //   );
 // }