import React, { useState } from "react";
import { View, Text } from '../../components/Themed';
import { StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { getTypeOfEvent } from "./LineupImage";
import style from "../../components/CalendarCarousel/style";
import EventIconsForPlayer from "./EventIconsForPlayer";
import { ProgressBar, Colors, List } from 'react-native-paper';
import { Fixture } from "../../types/types";


export default function MatchStats(props: { fixture: Fixture }) {

    if (!props.fixture.statistics?.length) {
        return <View>
            <Text>Not Available</Text>
        </View>
    }

    const homeStats = props.fixture.statistics.find(x => x.team.id == props.fixture.teams.home.id)!.statistics;
    const awayStats = props.fixture.statistics.find(x => x.team.id == props.fixture.teams.away.id)!.statistics;

    return (
        <View style={styles.container}>
            <List.Item
                title=''
                left={x => <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{(props.fixture as Fixture).teams.home.name}</Text>}
                right={x => <Text style={{ fontWeight: 'bold', fontSize: 16  }}>{(props.fixture as Fixture).teams.away.name}</Text>}
            />
            {
                homeStats.map((x, i: number) => {
                    const awayValue = parseInt(awayStats?.find(y => y.type === x.type)!.value ?? '0');
                    const homeValue = parseInt(x.value ?? '0');
                    let totalValue = awayValue + homeValue;

                    if (x.value != null && x.value.toString().indexOf('%') > -1) {
                        totalValue = 100;
                    }

                    const homePercentValue = (homeValue == 0 || totalValue == 0) ? 0 : homeValue / totalValue;
                    const awayPercentValue = (awayValue == 0 || totalValue == 0) ? 0 : awayValue / totalValue;

                    return (
                        <View key={i}>
                            <Text style={styles.statsTypeContainer}>{x.type}</Text>
                            <List.Item title={''} style={styles.listItem} left={z => {
                                return (
                                    <View>
                                        <Text style={{ fontSize: 16, paddingLeft: 10, fontWeight: 'bold', paddingBottom: 5 }}>{homeValue}</Text>
                                        <ProgressBar style={styles.homeProgressBar} progress={homePercentValue} color={Colors.red800} />
                                    </View>
                                )
                            }}
                                right={z => {
                                    return (
                                        <View>
                                            <Text style={styles.awayValue}>{awayValue}</Text>
                                            <ProgressBar style={styles.awayProgressBar} progress={awayPercentValue} color={Colors.green100} />
                                        </View>
                                    )
                                }}>

                            </List.Item>
                            {/* 
                            <View style={styles.statsTypeContainer} key={i}>
                                <Text style={styles.statsTypeContainer}>{x.type}</Text>
                            </View>
                            <View style={styles.innerContainer} key={i}>
                                <Text>{homeValue}</Text>
                                <ProgressBar style={styles.homeProgressBar} progress={homePercentValue} color={Colors.red800} />
                                <ProgressBar style={styles.awayProgressBar} progress={awayPercentValue} color={Colors.green100} />
                                <Text style={styles.awayValue}>{awayValue}</Text>
                            </View> */}
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        padding: 0

    },
    homeProgressBar: {
        height: 10,
        width: (Dimensions.get('window').width / 2) - 20,
        transform: [{ rotate: "180deg" }],
    },
    awayProgressBar: {
        height: 10,
        width: (Dimensions.get('window').width / 2) - 20,
        // transform: [{ scaleX: 0.5 }]
    },
    statsTypeContainer: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 16
    },
    awayValue: {
        right: 0,
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingBottom: 5
    }
});