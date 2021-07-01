import * as React from 'react';
import { Divider, List } from 'react-native-paper';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { View, Text } from '../../components/Themed';
import { Fixture } from '../../types/types';


export default function LiveFixture(props: { match: Fixture, navigation: any }) {

    const matchSelected = (match: any) => {
        props.navigation.navigate('Match', { match: props.match});
    }

    return (
        <TouchableHighlight onPress={() => matchSelected(props.match)}>
        <View style={styles.container}>
        <View style={styles.teamsContainer}>
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
             <MatchStatus match={props.match} />
             </View>
        </View>
        </TouchableHighlight>
    )
}

const MatchStatus = (props: { match: Fixture }): any => {
    if (props.match.fixture.status.short === '1H' || props.match.fixture.status.short === '2H' || props.match.fixture.status.short === 'ET')
    {
        return (
            <Text style={styles.matchMinute}>{props.match.fixture.status.elapsed}'</Text>
        )
    }
    else if (props.match.fixture.status.short === 'HT' || props.match.fixture.status.short === 'FT' || props.match.fixture.status.short === 'AET')
    {
        return (
            <Text style={styles.matchMinute}>{props.match.fixture.status.short}</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1
    },
    teamsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    innerContainerTwo: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    logoImage: {
        height: 40,
        width: 40,
        justifyContent: 'flex-end',
    },
    matchMinute: {
        fontStyle: 'italic',
    },
    matchStatusContainer: {
        justifyContent: 'center', //Centered vertically
       alignItems: 'center', // Centered horizontally
       textAlignVertical: 'center',
       width: 80
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