import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import FootballField from "./FootballField";
import { Fixture } from "../../types/types";
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

    console.log(home);

    const away = {
        name: awayLinup!.team.name,
        module: awayLinup!.formation,
        team: getLineupArray(awayLinup),
        away_team_events: getTeamEventsArray(props.fixture, false)
    };

    return (
        <View style={styles.container}>
            <FootballField home={home} away={away} />
        </View>
    )
}

function getLineupArray(lineup: any)
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

function getTeamEventsArray(fixtureDetails: any, getHomeTeam: boolean)
{
    let arrayToReturn = [];

    let teamEvents;
    if (getHomeTeam)
    {
        teamEvents = fixtureDetails.events.filter((x: any) => x.team.id == fixtureDetails.teams.home.id);
    }
    else
    {
        teamEvents = fixtureDetails.events.filter((x: any) => x.team.id == fixtureDetails.teams.away.id);
    }

    teamEvents.forEach((x: any) => {
        arrayToReturn.push({
            type_of_event: getTypeOfEvent(x.type, x.detail),
            time: x.time.elapsed,
            player: x.player.name
        })
    });

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
        else
        {
            return 'red-card';
        }
    }
    else if (eventType == 'Goal')
    {
        return 'goal';
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
        else
        {
            return require('../match/images/red-card.png');
        }
    }
    else if (eventType == 'Goal')
    {
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