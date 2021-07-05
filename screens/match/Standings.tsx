import React, { useEffect, useState } from "react";
import { Text, View } from '../../components/Themed';
import { StyleSheet, Image, SafeAreaView, RefreshControl } from 'react-native';
import { getLeagueStandings, GET_LEAGUE_STANDINGS } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "react-native-paper";
import { League } from "../../types/types";
import { Spinner } from "../../components/Spinner";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

export default function Standings({ route, navigation }) {

    const dispatch = useDispatch();
    const { leagueStandings }: { leagueStandings: League } = useSelector(state => state.fixturesReducer);
    const fetchLeagueStandings = async (id: number | null) => dispatch(getLeagueStandings(id));

    const [standingsNotAvailable, setStandingsNotAvailable] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchLeagueStandings(route.params.leagueId);

        return () => {
            setIsLoaded(false);
            // fetchLeagueStandings(null);
            dispatch({
                type: GET_LEAGUE_STANDINGS,
                payload: null
            });
        }
    }, []);

    useEffect(() => {

        console.log(leagueStandings)
        if (leagueStandings?.standings) {
            setIsLoaded(true);
            setRefreshing(false);
        }
        else if (leagueStandings == 'unavailable') {
            setIsLoaded(true);
            setRefreshing(false);
            setStandingsNotAvailable(true);
        }
    }, [leagueStandings]);

    const { height } = Dimensions.get("screen");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchLeagueStandings(route.params.leagueId).then(x => {
            setRefreshing(false);
        });
    }, []);

    return (
        <View style={styles.topContainer}>
            {
                !isLoaded ? (
                    <Spinner />
                )
                    : standingsNotAvailable ?
                        <View>
                            <Text style={{ fontSize: 20, padding: 20 }}>League standings not available for this league.</Text>
                        </View> : (
                            <View>

                                <View style={styles.leagueNameContainer}>
                                    <Image style={styles.leagueLogo} source={{ uri: leagueStandings.logo }} />
                                    <Text style={styles.leagueName}>{leagueStandings.name}</Text>
                                </View>

                                <SafeAreaView>
                                    <ScrollView horizontal >
                                        <ScrollView style={{
                                            height: height - 150
                                        }} refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}>
                                            <View style={{ flex: 1 }}>
                                                <DataTable style={{ width: 750 }}>
                                                    <DataTable.Header>
                                                        <DataTable.Title>Rank</DataTable.Title>
                                                        <DataTable.Title style={{ flex: 3 }}>Team</DataTable.Title>
                                                        <DataTable.Title>Points</DataTable.Title>
                                                        <DataTable.Title>GD</DataTable.Title>
                                                        <DataTable.Title>P</DataTable.Title>
                                                        <DataTable.Title>W</DataTable.Title>
                                                        <DataTable.Title>D</DataTable.Title>
                                                        <DataTable.Title>L</DataTable.Title>
                                                        <DataTable.Title>GF</DataTable.Title>
                                                        <DataTable.Title>GA</DataTable.Title>
                                                        <DataTable.Title>Form</DataTable.Title>
                                                    </DataTable.Header>
                                                    {
                                                        (
                                                            leagueStandings.standings.map(parentLeagueStandings => {
                                                                return parentLeagueStandings.map((ls, i: number) => {
                                                                    return (

                                                                        <DataTable.Row key={i}>
                                                                            <DataTable.Cell>{ls.rank}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ flex: 3 }}>
                                                                                <View style={{ paddingRight: 10 }}>
                                                                                    <Image style={styles.teamLogo} source={{ uri: ls.team.logo }} />
                                                                                </View>
                                                                                <Text>{ls.team.name}</Text>
                                                                            </DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.points}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.goalsDiff}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.played}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.win}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.draw}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.lose}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.goals.for}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.all.goals.against}</DataTable.Cell>
                                                                            <DataTable.Cell numeric>{ls.form}</DataTable.Cell>
                                                                        </DataTable.Row>

                                                                    )
                                                                });
                                                            })
                                                        )
                                                    }
                                                </DataTable>
                                            </View>
                                        </ScrollView>
                                    </ScrollView>
                                </SafeAreaView>
                            </View>
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
        width: '100%',
        display: 'flex'
    },
    topContainer: {
        flex: 1
    },
    teamLogo: {
        height: 20,
        width: 20,
    },
    leagueLogo: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    leagueName: {
        fontSize: 30,
        justifyContent: 'center',
        paddingLeft: 10
    },
    leagueNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    }
});