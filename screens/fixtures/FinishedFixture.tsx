import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { View, Text } from '../../components/Themed';
import { Fixture } from '../../types/types';
import FixtureLinearGradient from './FixtureLinearGradient';
import { CUSTOM_COLORS } from '../../types/colors';
import { getPenStatus } from '../match/Match';


export default function FinishedFixture(props: { match: Fixture, navigation: any }) {

    const matchSelected = (match: any) => {
        props.navigation.navigate('Match', { match: props.match });
    }

    return (
        <TouchableHighlight onPressIn={() => matchSelected(props.match)}>
            <View>
                <View style={styles.container}>
                    <View style={styles.teamsContainer}>
                        <FixtureLinearGradient />
                        <List.Item style={styles.listItem} title={`${props.match.teams.home.name}`} titleStyle={styles.teamName}
                            left={x => <Image style={styles.logoImage} source={{ uri: props.match.teams.home.logo }} />}
                            right={x => <Text style={styles.goalsCount}>{props.match.goals.home}</Text>}
                        />
                        <List.Item style={styles.listItem} title={`${props.match.teams.away.name}`} titleStyle={styles.teamName}
                            left={x => <Image style={styles.logoImage} source={{ uri: props.match.teams.away.logo }} />}
                            right={x => <Text style={styles.goalsCount}>{props.match.goals.away}</Text>}
                        />
                    </View>
                    <View style={styles.matchStatusContainer}>
                        <FixtureLinearGradient />
                        <Text style={styles.matchStatus}>{props.match.fixture.status.short}</Text>
                    </View>
                </View>

                {
                    props.match.fixture.status.short == 'PEN' ?
                        <View style={{ backgroundColor: CUSTOM_COLORS.safetyYellow }}>
                            <Text style={{ zIndex: 999999, textAlign: 'center', fontWeight: 'bold', paddingTop: 3, paddingBottom: 3 }}>{getPenStatus(props.match)}</Text>
                        </View>
                        :
                        <View></View>
                }
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
        paddingTop: 5
    },
    teamsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    logoImage: {
        height: 40,
        width: 40,
        justifyContent: 'flex-end',
    },
    matchMinute: {
        fontStyle: 'italic',
        justifyContent: 'flex-end'
    },
    matchStatus: {
        fontWeight: 'bold',
        zIndex: 999999
    },
    matchStatusContainer: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        textAlignVertical: 'center',
        width: 40
    },
    teamName: {
        paddingLeft: 10,
        fontSize: 14,
    },
    goalsCount: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0
    }
});