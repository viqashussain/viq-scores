import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { getImageByEvent, getTypeOfEvent } from "./LineupImage";
import { Event } from "../../types/types";

export default function EventDetail(props: { event: Event, homeTeamId: number, awayTeamId: number }) {
    const isHomeTeam = props.event.team.id == props.homeTeamId ? true : false;
    const [dog, setDog] = useState(false);

    // is home team
    if (props.event.team.id == props.homeTeamId) {
        return (
            <View>
                <List.Item titleStyle={styles.teamName}
                    title={''}
                    left={x => <EventDetailed event={props.event} />} />
            </View>
        );
    }
    // away team
    else {
        return (
            <View>
                <View>
                    <List.Item titleStyle={styles.teamName}
                        title={''}
                        right={x => <EventDetailed event={props.event} />} />
                </View>
            </View>
        );
    }
}

function EventDetailed(props: { event: Event }) {
    let event = props.event;
    if (event.type == 'Card') {
        return (
            <View>
                <Text style={{ fontSize: 16 }}>{event.time.elapsed}' <Image source={getImageByEvent(event.type, event.detail)}
                    style={{
                        width: 15,
                        height: 15,
                        position: 'relative',
                        justifyContent: "space-between"
                    }}
                /> - {event.player.name}</Text>
            </View>
        )
    }
    else if (event.type == 'Goal') {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16 }}>{event.time.elapsed}' - <Image source={getImageByEvent(event.type, event.detail)}
                    style={{
                        width: 15,
                        height: 15,
                        position: 'relative',
                        justifyContent: "space-between",
                    }}
                /> - {event.player.name}</Text>
                    {event.assist.name ?
                        (
                            <View style={styles.assistView}>
                                <Text style={{ fontSize: 16 }}>(</Text>
                                <Image
                                    source={require(`./images/assist.png`)}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        position: 'relative',
                                        justifyContent: "space-between",
                                    }}
                                />
                                <Text style={{ fontSize: 16 }}> {event.assist.name})</Text>
                            </View>
                        )
                        : (
                            <View></View>
                        )}
            </View>
        )
    }
    else if (event.type == 'subst') {
        return (
            <View>
                <Text style={{ fontSize: 16 }}>{event.time.elapsed}' - <Image source={getImageByEvent(event.type, event.detail)}
                    style={{
                        width: 15,
                        height: 15,
                        position: 'relative',
                        justifyContent: "space-between",
                    }}
                /> - {event.player.name} for {event.assist.name}</Text>
            </View>
        )
    }
    else {
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    assistView: {
        display: 'flex',
        flexDirection: 'row',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        
    },
    teamName: {

    }
});