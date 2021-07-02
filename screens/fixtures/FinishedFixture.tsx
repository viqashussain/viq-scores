import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { View, Text } from '../../components/Themed';
import { Fixture } from '../../types/types';
import FixtureLinearGradient from './FixtureLinearGradient';


export default function FinishedFixture(props: { match: Fixture, navigation: any }) {

    const matchSelected = (match: any) => {
        props.navigation.navigate('Match', { match: props.match });
    }

    return (
        <TouchableHighlight onPress={() => matchSelected(props.match)}>
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
        fontWeight: 'bold'
    },
    matchStatusContainer: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        textAlignVertical: 'center',
        width: 40
    },
    teamName: {
        paddingLeft: 10,
        fontSize: 20,
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