import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { List } from 'react-native-paper';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { getImageByEvent, getTypeOfEvent } from "./LineupImage";
import style from "../../components/CalendarCarousel/style";

export default function EventIconsForPlayer(props: { events: any[], playerId: number }) {
    const eventsForPlayer = props.events.filter(x => x.player.id == props.playerId || x.assist?.id == props.playerId);

    return (
        <View style={styles.container}>
            {eventsForPlayer.map((x: any, i: number) => {
                if (x.assist.id != props.playerId) {
                    return (
                        <View key={i} style={styles.innerContainer}>
                            <Image
                                source={getImageByEvent(x.type, x.detail)}
                                style={imageStyle()}
                            />
                            <Text style={styles.time}>{x.time.elapsed}'</Text>
                        </View>
                    )
                }
                else {
                    if (getTypeOfEvent(x.type, x.detail) == 'Goal')
                    {
                        return (
                            <View key={i} style={styles.innerContainer}>
                                <Image
                                    source={require(`./images/assist.png`)}
                                    style={imageStyle()}
                                />
                                <Text style={styles.time}>{x.time.elapsed}'</Text>
                            </View>
                        )   
                    }
                    else
                    {
                        return (
                            <View key={i} style={styles.innerContainer}>
                                <Image
                                    source={require(`./images/substitution-in.png`)}
                                    style={imageStyle()}
                                />
                                <Text style={styles.time}>{x.time.elapsed}'</Text>
                            </View>
                        )
                    }
                }
            })}
        </View>
    )
}

var imageStyle = function () {
    return {
        width: 15,
        height: 15,
        position: 'absolute',
        justifyContent: "space-between"
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5
    },
    time: {
        marginLeft: 17
    }
});