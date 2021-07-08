import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import FootballField from "./FootballField";
import { Event, Fixture } from "../../types/types";
// import FootballField from 'react-native-football-lineup';


export default function LineupImage(props: { fixture: Fixture }) {

    if (!props.fixture.lineups?.length)
    {
        return <View>
            <Text>Not available</Text>
        </View>
    }

    const homeLinup = props.fixture.lineups.find((x: any) => x.team.id == props.fixture.teams.home.id);
    const awayLinup = props.fixture.lineups.find((x: any) => x.team.id == props.fixture.teams.away.id);
    
    const home = {
        name: homeLinup!.team.name,
        module: homeLinup!.formation,
        team: getLineupArray(homeLinup),
        home_team_events: getTeamEventsArray(props.fixture, true)
    };

    const away = {
        name: awayLinup!.team.name,
        module: awayLinup!.formation,
        team: getLineupArray(awayLinup, true),
        away_team_events: getTeamEventsArray(props.fixture, false)
    };

    return (
        <View style={styles.container}>
            <FootballField home={home} away={away} />
        </View>
    )
}

function getLineupArray(lineup: any, isAwayTeam = false)
{
    const formation = lineup.formation;
    let lineupToReturn = [];
    let currentPlayerInLineup = 1;
 
    lineupToReturn.push([lineup.startXI[0].player]);

    formation.split('-').forEach((x: any) => {
        const players = lineup.startXI.slice(currentPlayerInLineup, parseInt(x) + currentPlayerInLineup);
        lineupToReturn.push(players.map((y: any) => y.player));

        currentPlayerInLineup += parseInt(x);
    });

    return lineupToReturn;
}

function getTeamEventsArray(fixtureDetails: Fixture, getHomeTeam: boolean)
{
    let arrayToReturn = [];

    let teamId: number;
    if (getHomeTeam)
    {
        teamId = fixtureDetails.teams.home.id;
    }
    else
    {
        teamId = fixtureDetails.teams.away.id;
    }

    let teamEvents = fixtureDetails.events.filter((x: any) => x.team.id == teamId);

    teamEvents.forEach((x: Event) => {
        arrayToReturn.push({
            type_of_event: x.type == 'subst' ? 'subst' : x.detail,
            time: x.time.elapsed,
            // need to get the full player name
            // player: x.type == 'subst' 
            // ? fixtureDetails.players.find(y => y.team.id == teamId)?.players.find(y => y.player.id == x.assist.id)?.player.name
            // : fixtureDetails.players.find(y => y.team.id == teamId)?.players.find(y => y.player.id == x.player.id)?.player.name
            player: getTypeOfEvent(x.type, x.detail) == 'substitution-in' ? x.assist.name : x.player.name,
            id: getTypeOfEvent(x.type, x.detail) == 'substitution-in' ? x.assist.id : x.player.id,
            // player: x.player.name,
            // id: x.player.id
        })
    });

    // we need to get the own goals from the other team
    const thisTeamPlayers = fixtureDetails.players.find(x => x.team.id == teamId)?.players;
    const ownGoalEvents = fixtureDetails.events.filter((x: any) => x.team.id != teamId).filter(x => thisTeamPlayers?.map(z => z.player.id)?.includes(x.player.id));

    ownGoalEvents.forEach((x: Event) => {
        arrayToReturn.push({
            type_of_event: x.detail,
            time: x.time.elapsed,
            // need to get the full player name
            // player: x.type == 'subst' 
            // ? fixtureDetails.players.find(y => y.team.id == teamId)?.players.find(y => y.player.id == x.assist.id)?.player.name
            // : fixtureDetails.players.find(y => y.team.id == teamId)?.players.find(y => y.player.id == x.player.id)?.player.name
            player: x.player.name,
            id: x.player.id
        })
    });

    // console.log('abc: ' + JSON.stringify(arrayToReturn.find(x => x.player == 'Robin Gosens')))

    return arrayToReturn;
}

export function getTypeOfEvent(eventType: string, eventDetail: string): string
{
    if (eventType == 'subst')
    {
        return 'substitution-in'
    }
    else if (eventType == 'Card')
    {
        if (eventDetail == 'Yellow Card')
        {
            return 'yellow-card';
        }
        else if (eventDetail == 'Second Yellow card')
        {
            return 'yellow-card';
        }
        else
        {
            return 'red-card';
        }
    }
    else if (eventType == 'Goal')
    {
        if (eventDetail == 'Normal Goal')
        {
            return 'goal';
        }
        else if (eventDetail == 'Own Goal')
        {
            return 'own-goal';
        }
        else if (eventDetail == 'Missed Penalty')
        {
            return 'missed-penalty';
        }
        else if (eventDetail == 'Penalty')
        {
            return 'penalty-scored';
        }
    }

    return '';
}

export function getImageByEvent(eventType: string, eventDetail: string)
{
    if (eventType == 'subst')
    {
        return require('../match/images/substitution-in.png');
    }
    else if (eventType == 'Card')
    {
        if (eventDetail == 'Yellow Card')
        {
            return require('../match/images/yellow-card.png');
        }
        else if (eventDetail == 'Second Yellow Card')
        {
            return require('../match/images/second-yellow-card.png');
        }
        else
        {
            return require('../match/images/red-card.png');
        }
    }
    else if (eventType == 'Goal')
    {
        if (eventDetail == 'Normal Goal')
        {
            return require('../match/images/goal.png');
        }
        else if (eventDetail == 'Own Goal')
        {
            return require('../match/images/own-goal.png');
        }
        else if (eventDetail == 'Penalty')
        {
            return require('../match/images/penalty-scored.png');
        }
        else if (eventDetail == 'Missed Penalty')
        {
            return require('../match/images/penalty-missed.png');
        }
        return require('../match/images/goal.png');
    }

    return '';
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
    }
});