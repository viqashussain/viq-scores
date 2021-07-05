import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, RefreshControl, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import { getFixturesForDate, getTodaysFixtures } from '../redux/actions';
import { Button, Divider, List } from 'react-native-paper';
import NotStartedFixture from './fixtures/NotStartedFixture';
import LiveFixture from './fixtures/LiveFixture';
import { ActivityIndicator, Colors } from 'react-native-paper';
import moment from 'moment';
import CalendarDays from '../components/CalendarCarousel';
import FinishedFixture from './fixtures/FinishedFixture';
import MiscFixture from './fixtures/MiscFixture';
import Carousel, { CarouselProperties } from 'react-native-snap-carousel';
import { CUSTOM_COLORS } from '../types/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Spinner } from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faTable } from '@fortawesome/free-solid-svg-icons';
import { Fixture } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function TabOneScreen(props: any) {


  const { todaysFixtures, oneDayAgoFixtures, twoDaysAgoFixtures, threeDaysAgoFixtures, fourDaysAgoFixtures, fiveDaysAgoFixtures, sixDaysAgoFixtures, sevenDaysAgoFixtures,
    oneDayFutureFixtures, twoDaysFutureFixtures, threeDaysFutureFixtures, fourDaysFutureFixtures, fiveDaysFutureFixtures, sixDaysFutureFixtures, sevenDaysFutureFixtures } = useSelector(state => state.fixturesReducer);
  const dispatch = useDispatch();
  const fetchTodaysFixtures = async () => dispatch(getTodaysFixtures());
  const fetchFixturesForDate = async (date: Moment) => dispatch(getFixturesForDate(date));
  const carouselRef = useRef(null);


  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [fixtures, setFixtures] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [carouselItems] = useState([
    moment().add(-7, 'd').startOf('day'),
    moment().add(-6, 'd').startOf('day'),
    moment().add(-5, 'd').startOf('day'),
    moment().add(-4, 'd').startOf('day'),
    moment().add(-3, 'd').startOf('day'),
    moment().add(-2, 'd').startOf('day'),
    moment().add(-1, 'd').startOf('day'),
    moment().startOf('day'),
    moment().add(1, 'd').startOf('day'),
    moment().add(2, 'd').startOf('day'),
    moment().add(3, 'd').startOf('day'),
    moment().add(4, 'd').startOf('day'),
    moment().add(5, 'd').startOf('day'),
    moment().add(6, 'd').startOf('day'),
    moment().add(7, 'd').startOf('day'),
  ]);

  const onRefresh = React.useCallback(() => {
    // setIsLoaded(false);
    setRefreshing(true);
    fetchFixturesForDate(moment(selectedDate)).then(x => {
      // setIsLoaded(true);
      setRefreshing(false);
    });
  }, []);

  // get fixtures for today on load
  useEffect(() => { fetchTodaysFixtures() }, []);

  useEffect(() => {
    setFixtures(todaysFixtures);
    if (todaysFixtures.length) {
      setIsLoaded(true);
    }
  }, [todaysFixtures]);

  useEffect(() => { setFixtures(oneDayAgoFixtures) }, [oneDayAgoFixtures]);
  useEffect(() => { setFixtures(twoDaysAgoFixtures) }, [twoDaysAgoFixtures]);
  useEffect(() => { setFixtures(threeDaysAgoFixtures) }, [threeDaysAgoFixtures]);
  useEffect(() => { setFixtures(fourDaysAgoFixtures) }, [fourDaysAgoFixtures]);
  useEffect(() => { setFixtures(fiveDaysAgoFixtures) }, [fiveDaysAgoFixtures]);
  useEffect(() => { setFixtures(sixDaysAgoFixtures) }, [sixDaysAgoFixtures]);
  useEffect(() => { setFixtures(sevenDaysAgoFixtures) }, [sevenDaysAgoFixtures]);

  useEffect(() => { setFixtures(oneDayFutureFixtures) }, [oneDayFutureFixtures]);
  useEffect(() => { setFixtures(twoDaysFutureFixtures) }, [twoDaysFutureFixtures]);
  useEffect(() => { setFixtures(threeDaysFutureFixtures) }, [threeDaysFutureFixtures]);
  useEffect(() => { setFixtures(fourDaysFutureFixtures) }, [fourDaysFutureFixtures]);
  useEffect(() => { setFixtures(fiveDaysFutureFixtures) }, [fiveDaysFutureFixtures]);
  useEffect(() => { setFixtures(sixDaysFutureFixtures) }, [sixDaysFutureFixtures]);
  useEffect(() => { setFixtures(sevenDaysFutureFixtures) }, [sevenDaysFutureFixtures]);

  // const fetch = async () => {
  //   fetchTodaysFixtures();
  //   setFixtures(todaysFixtures);
  //   setIsLoaded(true);
  // };

  // useEffect(() => {


  //   fetch();
  // }, []);

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const dateSelected = async (date: Date) => {
    setIsLoaded(false);
    setSelectedDate(date.toString());

    await fetchFixturesForDate(date);
    setIsLoaded(true);
  }

  const dateSelectedNew = async (index: number) => {
    setIsLoaded(false);
    setSelectedDate(carouselItems[index].toString());
    await fetchFixturesForDate(moment(carouselItems[index].toString()));
    setIsLoaded(true);
  }

  const datePressed = async (index: number) => {
    (carouselRef.current as any).snapToItem(index);
    await dateSelectedNew(index);
  }

  const goToTodayInCarousel = async () => {
    (carouselRef.current as any).snapToItem(7);
    await dateSelectedNew(7);
  }

  const goToStandings = (leagueId: number) => {
    props.navigation.navigate('Standings', { leagueId });
  }

  const dateCalendarItem = ({ item, index }) => {
    const isSelected = moment(selectedDate).format('L') == moment(item).format('L');
    return (
      <TouchableOpacity onPress={x => datePressed(index)}>
        <View style={isSelected ? styles.dateCalendarItemSelected : styles.dateCalendarItem}>
          <Text style={styles.dateCalendarItemText}>{item.format('ddd')}</Text>
          <Text style={styles.dateCalendarItemText}>{item.format('Do MMM')}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.topContainer}>
      <View style={styles.carouselContainer}>

        <LinearGradient
          // Background Linear Gradient
          colors={[CUSTOM_COLORS.lightSafetyYellow, 'transparent']}
          style={styles.background}
        />

        <Button compact onPress={() => goToTodayInCarousel()} style={{ marginLeft: 10 }} labelStyle={{ fontSize: 10, color: 'black' }} mode={'outlined'}>Today</Button>

        <Carousel
          style={styles.carousel}
          layout={"default"}
          ref={carouselRef}
          data={carouselItems}
          sliderWidth={Dimensions.get('window').width - 150}
          itemWidth={75}
          firstItem={7}
          enableSnap={true}
          renderItem={dateCalendarItem}
          inactiveSlideScale={0.75}
          // layoutCardOffset={75}
          inactiveSlideOpacity={0.75}
          activeSlideAlignment={'center'}
          enableMomentum={true}
          onSnapToItem={index => dateSelectedNew(index)} />
      </View>
      {
        !isLoaded ? (
          <Spinner />
        )
          : (
            <View style={styles.container}>
              <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />} style={styles.scrollView}>

                  {/* <CalendarDays
                  // First day. Default = new Date()
                  firstDate={moment().add(-7, 'd').format('YYYY-MM-DD')}
                  // Last day. You can set number of days instead
                  lastDate={moment().add(7, 'd').format('YYYY-MM-DD')}
                  // Sets number of days displaued. Default = 30
                  numberOfDays={60}
                  // Initial selected day. Default = firstDate
                  selectedDate={selectedDate}
                  // Optional text that replaces week day in disabled days
                  disabledText={'closed'}
                  // scrollView width
                  width={100}
                  // Instead of width you can set number of days visible.
                  // daysInView={3}
                  // Only available if width % 120 = 0. Scroll by full width
                  // paginate={true}
                  // Array of disabled dates. Default [] 
                  // disabledDates={['2019-07-11', '2019-07-12', '2019-07-15']}
                  // Function to get selected date in 'YYYY-MM-DD' format
                  onDateSelect={async (date: Date) => await dateSelected(date)}
                // // Replaces scroll with left and right arrows.
                // // Suitable for web where horizontal scroll is not always available 
                // arrows={false}
                // // Arrow icon components. Required if arrows={true}
                // leftArrow={<Icon name="arrow-back" size={26} color="#555" />}
                // rightArrow={<Icon name="arrow-forward" size={26} color="#555" />}
                /> */}


                  <View style={styles.dateContainer}>
                    <Text style={styles.title}>{moment(selectedDate).format('LL')} Fixtures</Text>
                  </View>

                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  <View>

                    {fixtures.map((x: Fixture[], i: number) => {
                      // if (i > 0) {
                      //   return;
                      // }
                      return <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <List.Section style={styles.listSection} key={i}>
                          <List.Accordion
                            style={{ backgroundColor: CUSTOM_COLORS.lightSafetyYellow }}
                            title={x[0].league.name}
                            left={props => <Image style={styles.leagueLogo} source={{ uri: x[0].league.logo }} />}>
                            {x.map((match: any, j: number) => {
                              if (match.fixture.status.short === 'NS') {
                                return (
                                  <NotStartedFixture key={match.fixture.id} navigation={props.navigation} key={j} match={match} />
                                )
                              }
                              else if (match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'ET' || match.fixture.status.short === 'P' || match.fixture.status.short === 'BT') {
                                return (
                                  <LiveFixture key={match.fixture.id} navigation={props.navigation} key={j} match={match} />
                                )
                              }
                              else if (match.fixture.status.short === 'HT' || match.fixture.status.short === 'FT'
                                || match.fixture.status.short === 'AET' || match.fixture.status.short === 'PEN') {
                                return (
                                  <FinishedFixture key={match.fixture.id} navigation={props.navigation} key={j} match={match} />
                                )
                              }
                              else if (match.fixture.status.short === 'TBD' || match.fixture.status.short === 'SUSP'
                                || match.fixture.status.short === 'INT' || match.fixture.status.short === 'PST'
                                || match.fixture.status.short === 'CANC' || match.fixture.status.short === 'ABD'
                                || match.fixture.status.short === 'AWD' || match.fixture.status.short === 'WO') {
                                return (
                                  <MiscFixture key={match.fixture.id} navigation={props.navigation} key={j} match={match} />
                                )
                              }
                            })}
                          </List.Accordion>


                        </List.Section>

                        <View>
                          <TouchableHighlight style={{ display: 'flex' }} onPress={() => goToStandings(x[0].league.id)}>
                            {/* <FontAwesomeIcon style={{ height: 20 }} icon={faTable} /> */}
                            <Button>
                              <Icon name="table" size={50} color={CUSTOM_COLORS.safetyYellow} />

                            </Button>
                          </TouchableHighlight>
                        </View>
                      </View>
                    })}

                  </View>

                </ScrollView>
              </SafeAreaView>
            </View>
          )
      }

    </View >
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // overflow: 'auto',
    width: '100%'
  },
  scrollView: {
    width: '100%'
  },
  carouselContainer: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: CUSTOM_COLORS.lightSafetyYellow,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 90
  },
  mainLinearGradient: {
    height: 1000,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dateContainer: {
    paddingTop: 10
  },
  separator: {
    marginVertical: 10,
    height: 1,
  },
  leagueLogo: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    // flex: 'inherit' 
  },
  carousel: {
    height: 300
  },
  lgBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 90,
  },
  dateCalendarItem: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    // borderRightColor: 'white',
    // borderRightWidth: 1,
  },
  dateCalendarItemSelected: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    // borderRightColor: 'white',
    // borderRightWidth: 1,
  },
  dateCalendarItemText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  slideStyle: {
    // scaleY: 2
  },
  listSection: {
    // width: '80%',
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  }
});
