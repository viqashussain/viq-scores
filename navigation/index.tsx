/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';
import Match from '../screens/match/Match';
import Standings from '../screens/match/Standings';

import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList } from '../types';
import { CUSTOM_COLORS } from '../types/colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import Modal from 'modal-react-native-web';


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
  // const infoIconPressed = () => {
  //   setVisible(true);
  // }

  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true)
  };
  const hideModal = () => setVisible(true);


  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Scores" component={TabOneScreen} options={{ headerTitle: props => <LogoTitle title="Fixtures" />, headerRight: props => <TouchableOpacity onPress={() => showModal()}>
          <Icon style={{
            paddingTop: 15,
            marginRight: 20,
            flex: 1
          }} name="info" size={25} color={CUSTOM_COLORS.safetyYellow} />

          <View style={{ marginTop: 22 }}>
            {/* <Modal
              animationType="slide"
              transparent={false}
              visible={visible}
              onDismiss={() => {
                setVisible(!visible);
              }}>
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
            </Modal> */}
          </View>
          </TouchableOpacity>}} />
      <HomeStack.Screen name="Match" component={Match} options={{ headerTitle: props => <LogoTitle title="Match" /> }} />
      <HomeStack.Screen name="Standings" component={Standings} options={{ headerTitle: props => <LogoTitle title="Standings" /> }} />
    </HomeStack.Navigator>
  );
}

function LogoTitle(props: { title: string }) {

  return (
    <View>
      <View
        style={{
          backgroundColor: 'red',
          height: 0,
          width: 0,
          flex: 1,
          zIndex: -9999
        }}></View>
      <Image
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
        }}
        source={require('../assets/logo/logo_small.png')}
      />
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
    elevation: 5,
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