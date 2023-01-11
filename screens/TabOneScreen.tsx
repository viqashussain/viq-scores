import Reactotron from 'reactotron-react-native'
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Vibration, Appearance } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import { getFixturesForDate, getTodaysFixtures, SET_FAVOURITE_TEAMS } from '../redux/actions';
import { Button, List, Searchbar } from 'react-native-paper';
import NotStartedFixture from './fixtures/NotStartedFixture';
import LiveFixture from './fixtures/LiveFixture';
import moment, { Moment } from 'moment';
import FinishedFixture from './fixtures/FinishedFixture';
import MiscFixture from './fixtures/MiscFixture';
import Carousel from 'react-native-snap-carousel';
import { CUSTOM_COLORS, getTextColourStyle } from '../types/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Spinner } from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Fixture } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDataFromStorage, storageKeys, storeDataInStorage } from '../storage/storage';
import * as Haptics from 'expo-haptics';
import { RefreshControl } from 'react-native-web-refresh-control'


export default function TabOneScreen(props: any) {

  const cs = Appearance.getColorScheme();
  const { todaysFixtures, oneDayAgoFixtures, twoDaysAgoFixtures, threeDaysAgoFixtures, fourDaysAgoFixtures, fiveDaysAgoFixtures, sixDaysAgoFixtures, sevenDaysAgoFixtures,
    oneDayFutureFixtures, twoDaysFutureFixtures, threeDaysFutureFixtures, fourDaysFutureFixtures, fiveDaysFutureFixtures, sixDaysFutureFixtures, sevenDaysFutureFixtures, favouriteTeams } = useSelector(state => state.fixturesReducer);
  const dispatch = useDispatch();
  const fetchTodaysFixtures = async () => dispatch(getTodaysFixtures());
  const fetchFixturesForDate = async (date: Moment) => dispatch(getFixturesForDate(date));
  const carouselRef = useRef(null);


  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [competitionTypeSelected, setCompetitionTypeSelected] = useState<'all' | 'favourite-competitions' | 'favourite-teams'>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [fixtures, setFixtures] = useState<Fixture[][]>([]);
  const [allFavouriteCompetitionFixtures, setAllFavouriteCompetitionFixtures] = useState<Fixture[][]>([]);
  const [allFavouriteTeamFixtures, setAllFavouriteTeamFixtures] = useState<Fixture[][]>([]);
  const [filteredFixtures, setFilteredFixtures] = useState<Fixture[][]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favouriteCompetitions, setFavouriteCompetitions] = useState<{ id: number }[]>([]);
  // const [favouriteTeams, setFavouriteTeams] = useState<{ id: number }[]>([]);

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

  const onRefresh = () => {
    setRefreshing(true);
    fetchFixturesForDate(moment(selectedDate)).then(x => {
      setRefreshing(false);
    });
  };

  // get fixtures for today on load
  // initialise
  useEffect(() => {
    fetchTodaysFixtures();
    getFavouriteCompetitionsFromStorage();
    getFavouriteTeamsFromStorage();
    getCompetitionTypeFromStorage();
  }, []);

  useEffect(() => {
    if (favouriteCompetitions != null && competitionTypeSelected == 'favourite-competitions') {
      setFilteredFixtures(getFavouriteCompetitionFixtures());
    }
    else if (favouriteTeams != null && competitionTypeSelected == 'favourite-teams') {
      setFilteredFixtures(getFavouriteTeamFixtures());
    }
    else
    {
      setFilteredFixtures(fixtures);
    }
  }, [favouriteCompetitions, competitionTypeSelected, fixtures]);

  // useEffect(() => {
  //   if (favouriteTeams != null && competitionTypeSelected == 'favourite-teams') {
  //     setFilteredFixtures(getFavouriteTeamFixtures());
  //   }
  // }, [favouriteTeams, competitionTypeSelected, fixtures]);

  // useEffect(() => {
  //   if (competitionTypeSelected == 'all') {
  //     setFilteredFixtures(fixtures);
  //   }
  // }, [favouriteTeams, competitionTypeSelected, fixtures]);

  useEffect(() => {
    setFixtures(todaysFixtures);
    if (todaysFixtures.length) {
      setIsLoaded(true);
      setFilteredFixtures(todaysFixtures);
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

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  // const dateSelected = async (date: Date) => {
  //   setIsLoaded(false);
  //   setSelectedDate(date.toString());

  //   await fetchFixturesForDate(date);
  //   setIsLoaded(true);
  // }

  // this is needed else onSnapToItem in the carousel will also be called by clicking on a date
  let dateHasBeenPressed = false;

  const dateSelectedNew = async (index: number) => {
    if (dateHasBeenPressed)
    {
      dateHasBeenPressed = false;
      return;
    }
    setFixtures([]);
    setIsLoaded(false);
    setSelectedDate(moment(carouselItems[index].toString()).format('YYYY-MM-DD'));
    await fetchFixturesForDate(moment(carouselItems[index].toString()));
    setIsLoaded(true);
  }

  const datePressed = async (index: number) => {
    dateHasBeenPressed = true;
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

  const addCompetitionToFavourites = (leagueId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const updatedFavouritesCompetitions = favouriteCompetitions!.concat([{ id: leagueId }]);
    setFavouriteCompetitions(updatedFavouritesCompetitions);
    storeDataInStorage(updatedFavouritesCompetitions, storageKeys.favouriteCompetitions);
  }

  const removeCompetitionFromFavourites = (leagueId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let updatedFavouritesCompetitions = favouriteCompetitions;
    updatedFavouritesCompetitions = favouriteCompetitions!.filter(x => x.id != leagueId);
    setFavouriteCompetitions(updatedFavouritesCompetitions);
    storeDataInStorage(updatedFavouritesCompetitions, storageKeys.favouriteCompetitions);
  }

  const getFavouriteCompetitionsFromStorage = async () => {
    return await getDataFromStorage(storageKeys.favouriteCompetitions).then(x => {
      if (x != null) {
        setFavouriteCompetitions(x);
      }
      else {
        setFavouriteCompetitions([]);
      }
    });
  }

  const getFavouriteTeamsFromStorage = async () => {
    return await getDataFromStorage(storageKeys.favouriteTeams).then(x => {
      if (x != null) {
        dispatch({
          type: SET_FAVOURITE_TEAMS,
          payload: x
        });
      }
    });
  }

  const allCompetitionsTypeSelected = () => {
    setCompetitionTypeSelected('all');

    if (searchQuery) {
      const filteredFixtures = filterFixturesBySearchQuery(fixtures);
      setFilteredFixtures(filteredFixtures);
    }
    else {
      setFilteredFixtures(fixtures);
    }
  }

  const getCompetitionTypeFromStorage = async () => {
    const t: 'all' | 'favourite-competitions' | 'favourite-teams' = await getDataFromStorage(storageKeys.favouritesSelectedFilter);
    setCompetitionTypeSelected(t);

    if (t == 'all') {
      setFilteredFixtures(fixtures);
    }
  }

  const competitionTypeUpdated = (filter: 'all' | 'favourite-competitions' | 'favourite-teams') => {
    storeDataInStorage(filter, storageKeys.favouritesSelectedFilter);
  }

  const favouriteCompetitionsTypeSelected = () => {
    setCompetitionTypeSelected('favourite-competitions');
    setFilteredFixtures(getFavouriteCompetitionFixtures());
  }

  const favouriteTeamsTypeSelected = () => {
    setCompetitionTypeSelected('favourite-teams');
    setFilteredFixtures(getFavouriteTeamFixtures());
  }

  const getFavouriteCompetitionFixtures = () => {
    const favouriteLeagueIds = favouriteCompetitions.map(x => x.id);
    if (!favouriteLeagueIds.length) {
      return [[]];
    }
    let favouriteFixtures = fixtures
      .filter(fixturesGroup => {
        return (fixturesGroup.some(f => {
          return favouriteLeagueIds.includes(f.league.id)
        }))
      })
      .map(fixturesGroup => {
        return fixturesGroup.map(f => {
          return f;
        });
      });

      setAllFavouriteCompetitionFixtures(favouriteFixtures);

    if (searchQuery) {
      favouriteFixtures = filterFixturesBySearchQuery(favouriteCompetitions);
    }

    return favouriteFixtures;
  }

  useEffect(() => {
    if (!searchQuery) {
      if (competitionTypeSelected == 'all') {
        setFilteredFixtures(fixtures);
      }
      else if (competitionTypeSelected == 'favourite-competitions') {
        setFilteredFixtures(getFavouriteCompetitionFixtures());
      }
      else if (competitionTypeSelected == 'favourite-teams') {
        setFilteredFixtures(getFavouriteTeamFixtures());
      }
    }
    else {
      if (competitionTypeSelected == 'all') {
        const queryFilteredFixtures = filterFixturesBySearchQuery(fixtures);
        setFilteredFixtures(queryFilteredFixtures);
      }
      else if (competitionTypeSelected == 'favourite-competitions') {
        const queryFilteredFixtures = filterFixturesBySearchQuery(allFavouriteCompetitionFixtures);
        setFilteredFixtures(queryFilteredFixtures);
      }
      else if (competitionTypeSelected == 'favourite-teams') {
        const queryFilteredFixtures = filterFixturesBySearchQuery(allFavouriteTeamFixtures);
        setFilteredFixtures(queryFilteredFixtures);
      }
    }
  }, [searchQuery]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  }

  const getFavouriteTeamFixtures = () => {
    const favouriteTeamIds = favouriteTeams.map(x => x.id);
    if (!favouriteTeamIds.length) {
      return [[]];
    }
    let arrayToReturn: Fixture[][] = [];
    fixtures
      .forEach(fixturesGroup => {
        let currentArray: Fixture[] = [];
        fixturesGroup.forEach(f => {
          if (favouriteTeamIds.includes(f.teams.home.id) || favouriteTeamIds.includes(f.teams.away.id)) {
            currentArray.push(f);
          }
        });
        if (currentArray.length) {
          arrayToReturn.push(currentArray);
        }
      });

      setAllFavouriteTeamFixtures(arrayToReturn);

    if (searchQuery) {
      arrayToReturn = filterFixturesBySearchQuery(arrayToReturn);
    }

    return arrayToReturn;
  }

  const filterFixturesBySearchQuery = (fixturesToFilter: Fixture[][]): Fixture[][] => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return fixturesToFilter.filter(x => {
      return x.some(y => {
        return y.teams.away.name.toLowerCase().includes(lowerCaseQuery) || y.teams.home.name.toLowerCase().includes(lowerCaseQuery)
          || y.league.name.toLowerCase().includes(lowerCaseQuery);
      })
    })
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
          colors={[CUSTOM_COLORS.safetyYellow, CUSTOM_COLORS.acidGreen]}
          style={styles.background}
        />

        <Button compact onPress={() => goToTodayInCarousel()} style={{ marginLeft: 10 }} labelStyle={{ fontSize: 10, fontWeight: 'bold', color: 'white' }} mode={'outlined'}>Today</Button>

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
        refreshing ? (<Spinner />) : 
        !isLoaded ? (
          <Spinner />
        )
          : (
            <View style={styles.container}>
              <SafeAreaView style={styles.container}>
              <Button icon={'refresh'} color={'black'} labelStyle={{fontWeight: 'bold'}} style={{width: '100%', display: 'flex', backgroundColor: CUSTOM_COLORS.lightSafetyYellow, margin: 5}} onPress={onRefresh} >Refresh</Button>
                <ScrollView  style={styles.scrollView}>

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
                    <Text style={styles.title}>{moment(selectedDate).format('dddd Do MMMM')} Fixtures</Text>
                  </View>

                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  <View style={styles.favouriteCompetitionsButtonContainer}>
                    <Button style={competitionTypeSelected == 'all' ? styles.filterButtonSelected : null} uppercase={false} color={CUSTOM_COLORS.safetyYellow} mode="contained" onPress={() => { allCompetitionsTypeSelected(); competitionTypeUpdated('all'); }}>All</Button>
                    <Button style={competitionTypeSelected == 'favourite-competitions' ? styles.filterButtonSelected : null} uppercase={false} color={CUSTOM_COLORS.safetyYellow} icon="star" mode="contained" onPress={() => { favouriteCompetitionsTypeSelected(); competitionTypeUpdated('favourite-competitions') }}>Competitions</Button>
                    <Button style={competitionTypeSelected == 'favourite-teams' ? styles.filterButtonSelected : null} uppercase={false} color={CUSTOM_COLORS.safetyYellow} icon="star" mode="contained" onPress={() => { favouriteTeamsTypeSelected(); competitionTypeUpdated('favourite-teams'); }}>Teams</Button>
                  </View>

                  <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                  />

                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  <View>

                    {filteredFixtures.map((fixture: Fixture[], i: number) => {
                      // if (i > 0) {
                      //   return;
                      // }
                      return <View key={i} style={{ display: 'flex', flexDirection: 'row' }}>

                        {
                          fixture?.length ?
                            favouriteCompetitions?.findIndex(y => y.id === fixture[0].league.id) != -1 ?
                              <TouchableOpacity style={styles.touchableIcon} onPress={() => removeCompetitionFromFavourites(fixture[0].league.id)}>
                                <Icon name="star" size={20} color={CUSTOM_COLORS.safetyYellow} />
                              </TouchableOpacity>
                              :
                              <TouchableOpacity style={styles.touchableIcon} onPress={() => addCompetitionToFavourites(fixture[0].league.id)}>
                                <Icon name="star-o" size={20} color={CUSTOM_COLORS.safetyYellow} />
                              </TouchableOpacity>
                            : null
                        }

                        <>
                          {fixture?.length ?
                            <List.Section style={styles.listSection} key={i}>
                              <List.Accordion
                                style={{ backgroundColor: CUSTOM_COLORS.lightSafetyYellow }}
                                title={fixture[0].league.name} titleStyle={{color: 'black'}}
                                left={props => <Image style={styles.leagueLogo} source={{ uri: fixture[0].league.logo }} />}>
                                {fixture.map((match: any, j: number) => {
                                  if (match.fixture.status.short === 'NS') {
                                    return (
                                      <NotStartedFixture key={match.fixture.id} navigation={props.navigation} match={match} />
                                    )
                                  }
                                  else if (match.fixture.status.short === '1H' || match.fixture.status.short === '2H' || match.fixture.status.short === 'ET' || match.fixture.status.short === 'P' || match.fixture.status.short === 'BT') {
                                    return (
                                      <LiveFixture key={match.fixture.id} navigation={props.navigation} match={match} />
                                    )
                                  }
                                  else if (match.fixture.status.short === 'HT' || match.fixture.status.short === 'FT'
                                    || match.fixture.status.short === 'AET' || match.fixture.status.short === 'PEN') {
                                    return (
                                      <FinishedFixture key={match.fixture.id} navigation={props.navigation} match={match} />
                                    )
                                  }
                                  else if (match.fixture.status.short === 'TBD' || match.fixture.status.short === 'SUSP'
                                    || match.fixture.status.short === 'INT' || match.fixture.status.short === 'PST'
                                    || match.fixture.status.short === 'CANC' || match.fixture.status.short === 'ABD'
                                    || match.fixture.status.short === 'AWD' || match.fixture.status.short === 'WO') {
                                    return (
                                      <MiscFixture key={match.fixture.id} navigation={props.navigation} match={match} />
                                    )
                                  }
                                })}
                              </List.Accordion>


                            </List.Section>
                            :
                            <>
                              <Text style={{ fontSize: 20, padding: 20 }}>No fixtures available.</Text>
                            </>
                          }
                        </>
                        <>
                          {fixture?.length ?
                            <View>
                              <TouchableOpacity style={{ display: 'flex' }} onPressIn={() => goToStandings(fixture[0].league.id)}>
                                {/* <FontAwesomeIcon style={{ height: 20 }} icon={faTable} /> */}
                                <Button style={{ paddingTop: 10 }}>
                                  <Icon name="table" size={25} color={CUSTOM_COLORS.safetyYellow} />
                                </Button>
                              </TouchableOpacity>
                            </View>
                            : null
                          }
                        </>
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
    // paddingRight: 20,
    flex: 1,
  },
  touchableIcon: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 0,
    display: 'flex'
  },
  favouriteCompetitionsButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: CUSTOM_COLORS.lightSafetyYellow
  },
  filterButtonSelected: {
    backgroundColor: CUSTOM_COLORS.acidGreen
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  }
});
