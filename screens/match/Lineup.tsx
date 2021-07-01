import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import EventIconsForPlayer from "./EventIconsForPlayer";
import { Fixture } from "../../types/types";

export default function Lineup(props: { fixture: Fixture, teamId: number }) {

    if (!props.fixture.lineups?.length)
    {
        return <View>
        </View>
    }

    return (
        <View>
            {
                props.fixture.lineups.find((x: any) => x.team.id == props.teamId)!.startXI.map((x: any, i: number) => {
                    return (
                        <View key={i} style={styles.innerContainer}>
                            <Text>{x.player.number}. {x.player.name}</Text><EventIconsForPlayer events={props.fixture.events} playerId={x.player.id} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
});