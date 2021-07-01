import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { getTypeOfEvent } from "./LineupImage";
import style from "../../components/CalendarCarousel/style";
import EventIconsForPlayer from "./EventIconsForPlayer";
import { Fixture } from "../../types/types";

export default function Bench(props: { fixture: Fixture, teamId: number }) {

    if (!props.fixture.lineups?.length)
    {
        return <View>
        </View>
    }

    return (
        <View style={styles.container}>
            {
                props.fixture.lineups.find((x: any) => x.team.id == props.teamId)!.substitutes.map((x: any, i: number) => {
                    return (
                        <View style={styles.innerContainer} key={i}>
                            <Text>{x.player.number}. {x.player.name}</Text><EventIconsForPlayer events={props.fixture.events} playerId={x.player.id} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    container: {
        // display: 'flex',
        // flexDirection: 'row'
    }
});