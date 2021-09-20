import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Text } from '../../components/Themed';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { convertUtcDateToLocalTime } from '../../helpers';
import { Fixture } from '../../types/types';
import FixtureLinearGradient from './FixtureLinearGradient';


export default function NotStartedFixture(props: { match: Fixture, navigation: any }) {

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
                    <Text style={styles.matchStatus}>{convertUtcDateToLocalTime(props.match.fixture.date.toString())}</Text>
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
    matchStatusContainer: {
        justifyContent: 'center', //Centered vertically
        //    alignItems: 'center', // Centered horizontally
        textAlignVertical: 'center',
        width: 80
    },
    matchStatus: {
        fontWeight: 'bold',
        zIndex: 999999999,
        color: 'black'
    },
    teamName: {
        paddingLeft: 10,
        fontSize: 14,
        color: 'black'
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