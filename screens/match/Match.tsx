import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from '../../components/Themed';
import { StyleSheet, Image, SafeAreaView, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import { ActivityIndicator, Colors, Divider } from 'react-native-paper';
import { getFixtureDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { List } from 'react-native-paper';
import Event from './Event';
import FootballField from 'react-native-football-lineup';
import LineupImage from "./LineupImage";
import Lineup from "./Lineup";
import Bench from "./Bench";
import { convertUtcDateToLocal } from "../../helpers";
import MatchStats from "./MatchStats";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Fixture, FixtureDetails } from "../../types/types";

export default function Match({ route, navigation }) {

    const dispatch = useDispatch();
    const { fixtureDetails } = useSelector(state => state.fixturesReducer);
    const fetchFixture = async (id: number) => dispatch(getFixtureDetails(id));

    useEffect(() => { fetchFixture(route.params.match.fixture.id) }, []);
    useEffect(() => {
        console.log('in useEffect')
        // setFixture(fixtureDetails); 
        if (fixtureDetails) {
            setIsLoaded(true);
            setRefreshing(false);
        }
    }, [fixtureDetails]);

    const [expanded, setExpanded] = useState(true);

    const handlePress = () => setExpanded(!expanded);

    // const [fixture, setFixture] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setIsLoaded(false);
        setRefreshing(true);
        fetchFixture(route.params.match.fixture.id).then(x => {
            setIsLoaded(true);
            setRefreshing(false);
        });
    }, []);



    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Events' },
        { key: 'second', title: 'Lineup' },
        { key: 'third', title: 'Stats' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <View style={{ flex: 1 }}>
                    <Text>Hello</Text>
                    {fixtureDetails.events.map((x: any, i: number) => {
                        return (
                            <Event key={i} event={x} homeTeamId={fixtureDetails.teams.home.id} awayTeamId={fixtureDetails.teams.away.id} />
                        )
                    })}
                </View>
            case 'second':
                return <View style={{ flex: 1 }}>
                    <LineupImage fixture={fixtureDetails} />
                    <Text>Starting XI</Text>
                    <List.Item
                        title=""
                        left={x => <Lineup fixture={fixtureDetails} teamId={fixtureDetails.teams.home.id} />}
                        right={x => <Lineup fixture={fixtureDetails} teamId={fixtureDetails.teams.away.id} />}>

                    </List.Item>

                    <Text>Bench</Text>

                    <List.Item
                        title=""
                        left={x => <Bench fixture={fixtureDetails} teamId={fixtureDetails.teams.home.id} />}
                        right={x => <Bench fixture={fixtureDetails} teamId={fixtureDetails.teams.away.id} />}>

                    </List.Item>
                </View>
            case 'third':
                return <View>
                    <MatchStats fixture={fixtureDetails} />
                </View>
            default:
                return null;
        }
    };

    const layout = useWindowDimensions();

    return (
        <View style={styles.container}>
            {
                !isLoaded || !fixtureDetails ? (
                    <ActivityIndicator size={'large'} animating={true} color={Colors.red800} />
                )
                    : (

                        <SafeAreaView style={styles.container}>
                            <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />} style={styles.scrollView}>
                                <View style={styles.matchStatusContainer}>
                                    <Text>{fixtureDetails.fixture.status.long}
                                        {fixtureDetails.fixture.status.short === '1H'
                                            || fixtureDetails.fixture.status.short === '2H'
                                            || fixtureDetails.fixture.status.short === 'ET' ?
                                            `- ${fixtureDetails.fixture.status.elapsed}'` : ''}
                                    </Text>
                                </View>
                                <Divider />
                                <View style={styles.matchDetailsContainer}>
                                    <Text>{convertUtcDateToLocal(fixtureDetails.fixture.date)}</Text>
                                    <Text>{fixtureDetails.fixture.venue.name}</Text>
                                    <Text>{fixtureDetails.league.name} ({fixtureDetails.league.round})</Text>
                                </View>
                                <Divider />

                                <View style={styles.teamScoreContainer}>

                                    <List.Item titleStyle={styles.teamName}
                                        title={`${fixtureDetails.teams.home.name}`}
                                        left={props => <Image style={styles.logoImage} source={{ uri: fixtureDetails.teams.home.logo }} />}
                                        right={props => <Text style={styles.score}>{`${fixtureDetails.goals.home ?? '-'}`}</Text>} />
                                    <List.Item titleStyle={styles.teamName}
                                        title={`${fixtureDetails.teams.away.name}`}
                                        left={props => <Image style={styles.logoImage} source={{ uri: fixtureDetails.teams.away.logo }} />}
                                        right={props => <Text style={styles.score}>{`${fixtureDetails.goals.away ?? '-'}`}</Text>} />
                                </View>
                                {
                                    fixtureDetails.events?.length ?
                                        (
                                            <TabView
                                                navigationState={{ index, routes }}
                                                renderScene={renderScene}
                                                onIndexChange={setIndex}
                                                initialLayout={{ width: layout.width }}
                                                style={{ flex: 1, display: 'flex', height: 1000 }}

                                            />
                                        ) :
                                        (
                                            <View></View>
                                        )}

                            </ScrollView>
                        </SafeAreaView>
                    )
            }

        </View >
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
        display: 'flex'
    },
    scrollView: {
        width: '100%'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logoImage: {
        height: 40,
        width: 40,
        justifyContent: 'flex-end',
    },
    teamScoreContainer: {
        width: '100%'
    },
    eventsContainer: {
        width: '100%'
    },
    matchDetailsContainer: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        display: 'flex',
        flex: 1
    },
    matchStatusContainer: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    }
});