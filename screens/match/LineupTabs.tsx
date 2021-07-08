import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List, Title } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import FootballField from "./FootballField";
import { Fixture } from "../../types/types";
import { TabBar, TabView } from "react-native-tab-view";
import LineupImage from "./LineupImage";
import Bench from "./Bench";
import Lineup from "./Lineup";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CUSTOM_COLORS } from "../../types/colors";
// import FootballField from 'react-native-football-lineup';


export default function LineupTabs(props: { fixtureDetails: Fixture }) {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: props.fixtureDetails.teams.home.name, imageUrl: props.fixtureDetails.teams.home.logo },
        { key: 'second', title: props.fixtureDetails.teams.away.name, imageUrl: props.fixtureDetails.teams.away.logo },
    ]);

    const layout = useWindowDimensions();

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ScrollView>
                    <View key={'first'} style={{ flex: 1, padding: 20 }}>
                        <Title >Starting XI</Title>

                        {
                            props.fixtureDetails.lineups[0].startXI.map(x => {
                                return (
                                    <List.Item
                                        title={x.player.name}
                                        left={y => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Text style={{ width: 20 }}>{x.player.number}</Text>
                                                    <Image style={styles.playerImage} source={{ uri: getPlayerImageUrl(x.player.id) }} />
                                                </View>
                                            )
                                        }}>

                                    </List.Item>
                                )
                            })
                        }

                        <Title>Bench</Title>

                        {
                            props.fixtureDetails.lineups[0].substitutes.map(x => {
                                return (
                                    <List.Item
                                        title={x.player.name}
                                        left={y => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Text style={{ width: 20 }}>{x.player.number}</Text>
                                                    <Image style={styles.playerImage} source={{ uri: getPlayerImageUrl(x.player.id) }} />
                                                </View>
                                            )
                                        }}>

                                    </List.Item>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            case 'second':
                return <ScrollView>
                    <View key={'first'} style={{ flex: 1, padding: 20 }}>
                        <Title >Starting XI</Title>

                        {
                            props.fixtureDetails.lineups[1].substitutes.map(x => {
                                return (
                                    <List.Item
                                        title={x.player.name}
                                        left={y => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Text style={{ width: 20 }}>{x.player.number}</Text>
                                                    <Image style={styles.playerImage} source={{ uri: getPlayerImageUrl(x.player.id) }} />
                                                </View>
                                            )
                                        }}>

                                    </List.Item>
                                )
                            })
                        }

                        <Title>Bench</Title>

                        {
                            props.fixtureDetails.lineups[1].startXI.map(x => {
                                return (
                                    <List.Item
                                        title={x.player.name}
                                        left={y => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <Text style={{ width: 20 }}>{x.player.number}</Text>
                                                    <Image style={styles.playerImage} source={{ uri: getPlayerImageUrl(x.player.id) }} />
                                                </View>
                                            )
                                        }}>

                                    </List.Item>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            default:
                return null;
        }
    };

    const getPlayerImageUrl = (playerId: number) => {
        const allPlayers = props.fixtureDetails.players[0].players.concat(props.fixtureDetails.players[1].players);
        return allPlayers.find(x => x.player.id == playerId)?.player.photo;
    }

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: CUSTOM_COLORS.safetyYellow }}
            style={{ backgroundColor: CUSTOM_COLORS.aliceBlue }}

            renderLabel={({ route }) => {
                return (
                    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: CUSTOM_COLORS.aliceBlue }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: CUSTOM_COLORS.aliceBlue
                        }}>
                            <View style={{ width: 20, backgroundColor: 'transparent', left: -20 }}>
                                <Image style={styles.teamLogo} source={{ uri: route.imageUrl }} />
                            </View>
                        </View>
                        <Text style={{ color: 'black', fontWeight: 'bold', margin: 8 }}>
                            {route.title}
                        </Text>
                    </View>
                )
            }}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ flex: 1, display: 'flex', height: 1000 }}
            renderTabBar={renderTabBar}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // overflow: 'auto',
        width: '100%',
        // display: 'flex'
    },
    playerImage: {
        height: 25,
        width: 25,
        justifyContent: 'flex-end',
        resizeMode: 'contain'
    },
    teamLogo: {
        height: 20,
        width: 20,
        justifyContent: 'flex-end',
        resizeMode: 'contain'
    }
});