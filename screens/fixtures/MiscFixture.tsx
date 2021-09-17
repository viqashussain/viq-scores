import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { View, Text } from '../../components/Themed';
import { Fixture } from '../../types/types';
import FixtureLinearGradient from './FixtureLinearGradient';


export default function MiscFixture(props: { match: Fixture, navigation: any }) {

    const matchSelected = (match: any) => {
        props.navigation.navigate('Match', { match: props.match });
    }

    return (
        <TouchableHighlight onPressIn={() => matchSelected(props.match)}>
            <View style={styles.container}>
                <View style={styles.teamsContainer}>
                    <FixtureLinearGradient />
                    <List.Item style={styles.listItem} title={`${props.match.teams.home.name}`} titleStyle={styles.teamName}
                        left={x => <Image style={styles.logoImage} source={{ uri: props.match.teams.home.logo }} />}
                    />
                    <List.Item style={styles.listItem} title={`${props.match.teams.away.name}`} titleStyle={styles.teamName}
                        left={x => <Image style={styles.logoImage} source={{ uri: props.match.teams.away.logo }} />}
                    />
                </View>
                <View style={styles.matchStatusContainer}>
                    <FixtureLinearGradient />
                    <Text style={styles.matchStatus}>{props.match.fixture.status.long}</Text>
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    matchStatusContainer: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        textAlignVertical: 'center',
        width: 150
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