import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from '../../components/Themed';
import { StyleSheet, Image, SafeAreaView, ScrollView, useWindowDimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Card, Colors, Divider } from 'react-native-paper';
import { getFixtureDetails, GET_FIXTURE_DETAILS, SET_FAVOURITE_TEAMS } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { List } from 'react-native-paper';
import Event from './Event';
import FootballField from 'react-native-football-lineup';
import LineupImage from "./LineupImage";
import Lineup from "./Lineup";
import Bench from "./Bench";
import { convertUtcDateToLocal } from "../../helpers";
import MatchStats from "./MatchStats";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Fixture, FixtureDetails } from "../../types/types";
import { CUSTOM_COLORS } from "../../types/colors";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Spinner } from "../../components/Spinner";
import { getDataFromStorage, storageKeys, storeDataInStorage } from "../../storage/storage";

export default function Match({ route, navigation }) {

    const dispatch = useDispatch();
    const { fixtureDetails } = useSelector(state => state.fixturesReducer);
    const fetchFixture = async (id: number | null) => dispatch(getFixtureDetails(id));

    useEffect(() => {
        fetchFixture(route.params.match.fixture.id);
        getFavouriteTeams();

        // return a function to execute at unmount
        return () => {
            // fixtureDetails = null;
            setIsLoaded(false);
            // fetchFixture(null);
            dispatch({
                type: GET_FIXTURE_DETAILS,
                payload: null
            });
        }
    }, []);
    useEffect(() => {
        if (fixtureDetails) {
            initializeHomeGoalScorersOwnGoalsAndRedCards();
            setIsLoaded(true);
            setRefreshing(false);
        }
    }, [fixtureDetails]);

    const [expanded, setExpanded] = useState(true);

    const handlePress = () => setExpanded(!expanded);

    // const [fixture, setFixture] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [homeGoalScorersOwnGoalsAndRedCards, setHomeGoalScorersOwnGoalsAndRedCards] = useState('');
    const [awayGoalScorersOwnGoalsAndRedCards, setAwayGoalScorersOwnGoalsAndRedCards] = useState('');
    const [favouriteTeams, setFavouriteTeams] = useState<{ id: number }[]>([]);

    const addTeamToFavourites = (teamId: number) => {
        const updatedFavouritesTeams = favouriteTeams.concat([{ id: teamId }]);
        console.log({ updatedFavouritesTeams })
        setFavouriteTeams(updatedFavouritesTeams);
        storeDataInStorage(updatedFavouritesTeams, storageKeys.favouriteTeams);

        dispatch({
            type: SET_FAVOURITE_TEAMS,
            payload: updatedFavouritesTeams
        });
    }

    const removeTeamFromFavourites = (teamId: number) => {
        let updatedFavouritesTeams = favouriteTeams;
        updatedFavouritesTeams = favouriteTeams.filter(x => x.id != teamId);
        setFavouriteTeams(updatedFavouritesTeams);
        storeDataInStorage(updatedFavouritesTeams, storageKeys.favouriteTeams);

        dispatch({
            type: SET_FAVOURITE_TEAMS,
            payload: updatedFavouritesTeams
        });
    }

    const getFavouriteTeams = () => {
        getDataFromStorage(storageKeys.favouriteTeams).then(x => {
            if (x != null) {
                setFavouriteTeams(x);
                dispatch({
                    type: SET_FAVOURITE_TEAMS,
                    payload: x
                });
            }
        });
    }

    // away goals are with the other teams' events
    const initializeHomeGoalScorersOwnGoalsAndRedCards = () => {
        if (!(fixtureDetails as Fixture).events) {
            return '';
        }
        const homeTeamId = (fixtureDetails as Fixture).teams.home.id;
        const homeScorersAndRedCards = (fixtureDetails as Fixture).events
            .filter(x => x.team.id == homeTeamId)
            .filter(x => x.type == 'Goal' || x.detail == 'Red Card')
            .sort(function (a, b) {
                return a.time.elapsed - b.time.elapsed;
            });

        const homeString = homeScorersAndRedCards.map(x => {
            if (x.detail == 'Own Goal') {
                return `${x.player.name} (${x.time.elapsed}' OG)`;
            }
            else if (x.detail == 'Red Card') {
                return `${x.player.name} (${x.time.elapsed}' Red Card)`;
            }
            return `${x.player.name} (${x.time.elapsed}')`;
        }).join(', ');;

        setHomeGoalScorersOwnGoalsAndRedCards(homeString);

        const awayScorersAndRedCards = (fixtureDetails as Fixture).events
            .filter(x => x.team.id != homeTeamId)
            .filter(x => x.type == 'Goal' || x.detail == 'Red Card')
            .sort(function (a, b) {
                return a.time.elapsed - b.time.elapsed;
            });

        const awayString = awayScorersAndRedCards.map(x => {
            if (x.detail == 'Own Goal') {
                return `${x.player.name} (${x.time.elapsed}' OG)`;
            }
            else if (x.detail == 'Red Card') {
                return `${x.player.name} (${x.time.elapsed}' Red Card)`;
            }
            return `${x.player.name} (${x.time.elapsed}')`;
        }).join(', ');

        setAwayGoalScorersOwnGoalsAndRedCards(awayString);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchFixture(route.params.match.fixture.id).then(x => {
            setRefreshing(false);
        });
    }, []);



    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Events', icon: 'soccer-ball-o' },
        { key: 'second', title: 'Lineup', icon: 'list-ol' },
        { key: 'third', title: 'Stats', icon: 'bar-chart-o' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <View key={'first'} style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                    {fixtureDetails.events.map((x: any, i: number) => {
                        return (
                            <Event key={i} event={x} homeTeamId={fixtureDetails.teams.home.id} awayTeamId={fixtureDetails.teams.away.id} />
                        )
                    })}
                </View>
            case 'second':
                return <View key={'second'} style={{ flex: 1 }}>
                    <LineupImage fixture={fixtureDetails} />
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Starting XI</Text>
                    <List.Item
                        title=""
                        left={x => <Lineup fixture={fixtureDetails} teamId={fixtureDetails.teams.home.id} />}
                        right={x => <Lineup fixture={fixtureDetails} teamId={fixtureDetails.teams.away.id} />}>

                    </List.Item>

                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Bench</Text>

                    <List.Item
                        title=""
                        left={x => <Bench fixture={fixtureDetails} teamId={fixtureDetails.teams.home.id} />}
                        right={x => <Bench fixture={fixtureDetails} teamId={fixtureDetails.teams.away.id} />}>

                    </List.Item>
                </View>
            case 'third':
                return <View key={'third'}>
                    <Card>
                        <Card.Content>
                            <MatchStats fixture={fixtureDetails} />
                        </Card.Content>
                    </Card>
                </View>
            default:
                return null;
        }
    };

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
                                <Icon name={route.icon} size={20} color={CUSTOM_COLORS.safetyYellow} />
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

    const layout = useWindowDimensions();

    return (
        <View style={styles.container}>
            {
                !isLoaded || !fixtureDetails ? (
                    <Spinner />
                )
                    : (

                        <SafeAreaView style={styles.container}>
                            <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />} style={styles.scrollView}>
                                <View style={styles.matchStatusContainer}>
                                    <Text style={[styles.textCenter, styles.fixtureStatusText]}>{fixtureDetails.fixture.status.long}
                                        {fixtureDetails.fixture.status.short === '1H'
                                            || fixtureDetails.fixture.status.short === '2H'
                                            || fixtureDetails.fixture.status.short === 'ET' ?
                                            `- ${fixtureDetails.fixture.status.elapsed}'` : ` - ${fixtureDetails.fixture.status.short}`}
                                    </Text>
                                </View>
                                <View>

                                </View>
                                <Divider />
                                <View style={styles.matchDetailsContainer}>
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={[CUSTOM_COLORS.lightSafetyYellow, 'white']}
                                        style={styles.linearBackground}
                                    />
                                    <Text style={{ textAlign: 'center', zIndex: 999 }}>{convertUtcDateToLocal(fixtureDetails.fixture.date)}</Text>
                                    <Text style={{ textAlign: 'center', zIndex: 999 }}>{fixtureDetails.fixture.venue.name}</Text>
                                    <Text style={{ textAlign: 'center', zIndex: 999 }}>{fixtureDetails.league.name} ({fixtureDetails.league.round})</Text>
                                </View>
                                <Divider />

                                <View style={styles.teamScoreContainer}>

                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={[CUSTOM_COLORS.safetyYellow, 'white', CUSTOM_COLORS.acidGreen]}
                                        style={styles.matchStatusContainerBackground}
                                    />

                                    <List.Item titleStyle={styles.teamName}
                                        description={homeGoalScorersOwnGoalsAndRedCards}
                                        title={`${fixtureDetails.teams.home.name}`}
                                        left={props => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
                                                    <View style={{ backgroundColor: 'transparent' }}>
                                                        {
                                                            favouriteTeams.findIndex(y => y.id === fixtureDetails.teams.home.id) != -1 ?
                                                                <TouchableOpacity style={{ paddingTop: 10, paddingRight: 5 }} onPress={() => removeTeamFromFavourites(fixtureDetails.teams.home.id)}>
                                                                    <Icon name="star" size={20} color={CUSTOM_COLORS.safetyYellow} />
                                                                </TouchableOpacity> :
                                                                <TouchableOpacity style={{ paddingTop: 10, paddingRight: 5 }} onPress={() => addTeamToFavourites(fixtureDetails.teams.home.id)}>
                                                                    <Icon name="star-o" size={20} color={CUSTOM_COLORS.safetyYellow} />
                                                                </TouchableOpacity>
                                                        }

                                                    </View>
                                                    <Image style={styles.logoImage} source={{ uri: fixtureDetails.teams.home.logo }} />
                                                </View>
                                            )
                                        }}
                                        right={props => <Text style={styles.score}>{`${fixtureDetails.goals.home ?? '-'}`}</Text>} />
                                    <List.Item titleStyle={styles.teamName}
                                        description={awayGoalScorersOwnGoalsAndRedCards}
                                        title={`${fixtureDetails.teams.away.name}`}
                                        left={props => {
                                            return (
                                                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
                                                    <View style={{ backgroundColor: 'transparent' }}>
                                                        {
                                                            favouriteTeams.findIndex(y => y.id === fixtureDetails.teams.away.id) != -1 ?
                                                                <TouchableOpacity style={{ paddingTop: 10, paddingRight: 5 }} onPress={() => removeTeamFromFavourites(fixtureDetails.teams.away.id)}>
                                                                    <Icon name="star" size={20} color={CUSTOM_COLORS.safetyYellow} />
                                                                </TouchableOpacity> :
                                                                <TouchableOpacity style={{ paddingTop: 10, paddingRight: 5 }} onPress={() => addTeamToFavourites(fixtureDetails.teams.away.id)}>
                                                                    <Icon name="star-o" size={20} color={CUSTOM_COLORS.safetyYellow} />
                                                                </TouchableOpacity>
                                                        }

                                                    </View>
                                                    <Image style={styles.logoImage} source={{ uri: fixtureDetails.teams.away.logo }} />
                                                </View>
                                            )
                                        }}
                                        right={props => <Text style={styles.score}>{`${fixtureDetails.goals.away ?? '-'}`}</Text>} />

                                    {
                                        fixtureDetails.fixture.status.short == 'PEN' ?
                                            <View style={{ backgroundColor: CUSTOM_COLORS.safetyYellow }}>
                                                <Text style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: 3, paddingBottom: 3 }}>{getPenStatus(fixtureDetails)}</Text>
                                            </View>
                                            :
                                            <View></View>
                                    }
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
                                                renderTabBar={renderTabBar}
                                            />
                                        ) :
                                        (
                                            <View>
                                                <Text style={{ fontSize: 20, padding: 20 }}>Match details will be displayed once they are released/the match starts.</Text>
                                            </View>
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
        textAlign: 'center',
        paddingRight: 10
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
    },
    matchStatusContainer: {
        textAlign: 'center',
        paddingTop: 5,
        // paddingBottom: 1
    },
    textCenter: {
        textAlign: 'center'
    },
    fixtureStatusText: {
        fontWeight: 'bold',
        backgroundColor: CUSTOM_COLORS.safetyYellow
    },
    matchStatusContainerBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 120
    },
    linearBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50
    },
});

export const getPenStatus = (fd: Fixture) => {
    const homeTeamWon = (fd as Fixture).teams.home.winner;
    if (homeTeamWon) {
        return `${(fd as Fixture).teams.home.name} won ${(fd as Fixture).score.penalty.home} - ${(fd as Fixture).score.penalty.away} on penalties`
    }
    else {
        return `${(fd as Fixture).teams.away.name} won ${(fd as Fixture).score.penalty.away} - ${(fd as Fixture).score.penalty.home} on penalties`
    }
}