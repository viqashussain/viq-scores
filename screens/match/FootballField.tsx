import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';

export default class FootballField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: props.home,
      away: props.away,
    };
    debugger;
    console.log('home_team_events: ' + JSON.stringify(props.home.home_team_events))
  }



  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./images/footballfield.png')}
          style={{
            width: null,
            height: null,
            flex: 1,
          }}>
          <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.45)', flex: 1 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(204, 70, 43, 0)',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 20,
                    },
                  ]}>
                  {this.state.home.module}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      position: 'absolute',
                      right: 20,
                    },
                  ]}>
                  {this.state.home.name}
                </Text>
              </View>

              {this.state.home.team.map((data, i) => (
                <View key={'h' + i} style={styles.rowHome}>
                  {data.map((d, j) => (
                    <View key={'he' + j} style={styles.el}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {this.state.home.home_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'yellow-card')
                          .map(
                            (el, z) =>
                              <Image
                                key={'hy' + z}
                                source={require('./images/yellow-card.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12 * (z == 0 ? 1 : z * 5),
                                }}
                              />
                          )}
                        {this.state.home.home_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'red-card')
                          .map(
                            (el, z) =>
                              <Image
                                key={'hr' + z}
                                source={require('./images/red-card.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12,
                                }}
                              />
                          )}
                        {
                          this.state.home.home_team_events
                            .filter(el => el.id == d.id &&
                              el.type_of_event == 'goal')
                            .map(
                              (el, z) =>
                                <Image
                                  key={'hy' + z}
                                  source={require('./images/goal4.png')}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    position: 'absolute',
                                    left: 3 * (z == 0 ? 1 : z * 5),
                                    top: -17
                                  }}
                                />
                            )}
                        {this.state.home.home_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'own-goal')
                          .map(
                            (el, z) =>
                              <Image
                                key={'hy' + z}
                                source={require('./images/own-goal.png')}
                                style={{
                                  width: 15,
                                  height: 15,
                                  position: 'absolute',
                                  left: 3 * (z == 0 ? 1 : z * 5),
                                  top: -17
                                }}
                              />
                          )}
                        <View style={styles.playHome}>
                          <Text style={styles.text}>{d.number}</Text>
                        </View>
                        {this.state.home.home_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'substitution-in')
                          .map(
                            (el, z) =>
                              <Image
                                key={'hs' + z}
                                source={require('./images/substitution-in.png')}
                                style={{
                                  width: 12,
                                  height: 12,
                                  position: 'absolute',
                                  right: -14,
                                }}
                              />
                          )}
                      </View>
                      <Text style={styles.text}>{d.name}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(43, 99, 204, 0)',
                paddingTop: 55,
              }}>
              {this.state.away.team.reverse().map((data, i) => (
                <View key={'a' + i} style={styles.rowAway}>
                  {data.map((d, j) => (
                    <View key={'ae' + j} style={styles.el}>
                      <Text style={styles.text}>{d.name}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        {this.state.away.away_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'yellow-card')
                          .map(
                            (el, z) =>
                              <Image
                                key={'ay' + z}
                                source={require('./images/yellow-card.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12 * (z == 0 ? 1 : z * 5),
                                }}
                              />
                          )}
                        {this.state.away.away_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'red-card')
                          .map(
                            (el, z) =>
                              <Image
                                key={'ar' + z}
                                source={require('./images/red-card.png')}
                                style={{
                                  width: 12,
                                  height: 15,
                                  position: 'absolute',
                                  left: -12,
                                }}
                              />
                          )}
                        {
                          this.state.away.away_team_events
                            .filter(el => el.id == d.id &&
                              el.type_of_event == 'goal')
                            .map(
                              (el, z) =>
                                <Image
                                  key={'hy' + z}
                                  source={require('./images/goal4.png')}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    position: 'absolute',
                                    left: 3 * (z == 0 ? 1 : z * 5),
                                    top: 22
                                  }}
                                />
                            )}
                        {this.state.away.away_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'own-goal')
                          .map(
                            (el, z) =>
                              <Image
                                key={'hy' + z}
                                source={require('./images/own-goal.png')}
                                style={{
                                  width: 15,
                                  height: 15,
                                  position: 'absolute',
                                  left: 3 * (z == 0 ? 1 : z * 5),
                                  top: 22
                                }}
                              />
                          )}
                        <View style={styles.playAway}>
                          <Text style={styles.text}>{d.number}</Text>
                        </View>
                        {this.state.away.away_team_events
                          .filter(el => el.id == d.id &&
                            el.type_of_event == 'substitution-in')
                          .map(
                            (el, z) =>
                              <Image
                                key={'as' + z}
                                source={require('./images/substitution-in.png')}
                                style={{
                                  width: 12,
                                  height: 12,
                                  position: 'absolute',
                                  right: -14,
                                }}
                              />
                          )}
                      </View>
                    </View>
                  ))}
                </View>
              ))}

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 20,
                    },
                  ]}>
                  {this.state.away.module}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      position: 'absolute',
                      right: 20,
                    },
                  ]}>
                  {this.state.away.name}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  rowHome: {
    flex: 1,
    flexDirection: 'row',
  },
  rowAway: {
    flex: 1,
    flexDirection: 'row',
  },
  el: {
    flexGrow: 1,
    alignItems: 'center',
  },
  playHome: {
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(244, 67, 54)',
    backgroundColor: 'rgba(244, 67, 54,0.5)',
  },
  playAway: {
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgb(3, 169, 244)',
    backgroundColor: 'rgba(3, 169, 244,0.5)',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontSize: 12,
  },
});