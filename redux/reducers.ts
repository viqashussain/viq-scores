import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Fixture } from '../types/types';
import { GET_FIVE_DAYS_AGO_FIXTURES, GET_FIVE_DAYS_FUTURE_FIXTURES, GET_FIXTURE_DETAILS, GET_FOUR_DAYS_AGO_FIXTURES, GET_FOUR_DAYS_FUTURE_FIXTURES, GET_LEAGUE_STANDINGS, GET_ONE_DAY_AGO_FIXTURES, GET_ONE_DAY_FUTURE_FIXTURES, GET_SEVEN_DAYS_AGO_FIXTURES, GET_SEVEN_DAYS_FUTURE_FIXTURES, GET_SIX_DAYS_AGO_FIXTURES, GET_SIX_DAYS_FUTURE_FIXTURES, GET_THREE_DAYS_AGO_FIXTURES, GET_THREE_DAYS_FUTURE_FIXTURES, GET_TODAYS_FIXTURES, GET_TWO_DAYS_AGO_FIXTURES, GET_TWO_DAYS_FUTURE_FIXTURES, SET_FAVOURITE_TEAMS } from './actions';

const initialState = {
    todaysFixtures: [],

    oneDayAgoFixtures: [],
    twoDaysAgoFixtures: [],
    threeDaysAgoFixtures: [],
    fourDaysAgoFixtures: [],
    fiveDaysAgoFixtures: [],
    sixDaysAgoFixtures: [],
    sevenDaysAgoFixtures: [],

    oneDayFutureFixtures: [],
    twoDaysFutureFixtures: [],
    threeDaysFutureFixtures: [],
    fourDaysFutureFixtures: [],
    fiveDaysFutureFixtures: [],
    sixDaysFutureFixtures: [],
    sevenDaysFutureFixtures: [],

    fixtureDetails: null,

    leagueStandings: [],

    favouriteTeams: []
};

function fixturesReducer(state = initialState, action: any) {
    console.log('in reducer')
    console.log('action.type: ' + action.type);
    switch (action.type) {
        case GET_TODAYS_FIXTURES:
            return { ...state, todaysFixtures: reorderFixtureByPopularity(action.payload) };

        case GET_ONE_DAY_AGO_FIXTURES:
            return { ...state, oneDayAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_TWO_DAYS_AGO_FIXTURES:
            return { ...state, twoDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_THREE_DAYS_AGO_FIXTURES:
            return { ...state, threeDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_FOUR_DAYS_AGO_FIXTURES:
            return { ...state, fourDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_FIVE_DAYS_AGO_FIXTURES:
            return { ...state, fiveDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_SIX_DAYS_AGO_FIXTURES:
            return { ...state, sixDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_SEVEN_DAYS_AGO_FIXTURES:
            return { ...state, sevenDaysAgoFixtures: reorderFixtureByPopularity(action.payload) };

        case GET_ONE_DAY_FUTURE_FIXTURES:
            return { ...state, oneDayFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_TWO_DAYS_FUTURE_FIXTURES:
            return { ...state, twoDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_THREE_DAYS_FUTURE_FIXTURES:
            return { ...state, threeDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_FOUR_DAYS_FUTURE_FIXTURES: 
            return { ...state, fourDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_FIVE_DAYS_FUTURE_FIXTURES:
            return { ...state, fiveDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_SIX_DAYS_FUTURE_FIXTURES:
            return { ...state, sixDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };
        case GET_SEVEN_DAYS_FUTURE_FIXTURES:
            return { ...state, sevenDaysFutureFixtures: reorderFixtureByPopularity(action.payload) };

        case GET_FIXTURE_DETAILS:
            return { ...state, fixtureDetails: action.payload };

        case GET_LEAGUE_STANDINGS:
            return { ...state, leagueStandings: action.payload };

        case SET_FAVOURITE_TEAMS:
            return { ...state, favouriteTeams: action.payload };

        default:
            return state;
    }
}

export default fixturesReducer;

const leagueIdsByPopularity = [
    { leagueId: 2, position: -100 }, // CL
    { leagueId: 3, position: -99 }, // Europa league
    { leagueId: 848, position: -98 }, // UEFA Europa Conference League
    { leagueId: 531, position: -97 }, // UEFA super cup
    { leagueId: 1, position: -96 }, // World Cup
    { leagueId: 4, position: -95 }, // Euros
    { leagueId: 6, position: -94 }, // Afriacan cup of nations
    { leagueId: 9, position: -93 }, // Copa america
    { leagueId: 5, position: -92 }, // UEFA Nations League
    { leagueId: 15, position: -91 }, // FIFA CWC
    { leagueId: 528, position: -90 }, // community shield
    { leagueId: 39, position: -89 }, // pl
    { leagueId: 45, position: -88 }, // fa cup
    { leagueId: 48, position: -87 }, // league cup
    { leagueId: 140, position: -86 }, // la liga
    { leagueId: 143, position: -85 }, // copa del rey
    { leagueId: 556, position: -84 }, // SP super cup
    { leagueId: 529, position: -83 }, // super cup
    { leagueId: 71, position: -82 }, // serie a
    { leagueId: 137, position: -81 }, // Coppa Italia
    { leagueId: 547, position: -80 }, // IT super cup
    { leagueId: 78, position: -79 }, // bundesliga
    { leagueId: 81, position: -78 }, // DFB Pokal
    { leagueId: 61, position: -77 }, // ligue 1
    { leagueId: 66, position: -76 }, // Coupe de France
    { leagueId: 65, position: -75 }, // Coupe de la Ligue 
    { leagueId: 10, position: -74 }, // world friendlies
    { leagueId: 31, position: -73 }, // World Cup - Qualification CONCACAF
    { leagueId: 32, position: -72 }, // World Cup - Qualification Europe
    { leagueId: 33, position: -71 }, // World Cup - Qualification Oceania
    { leagueId: 34, position: -70 }, // World Cup - Qualification South America
    { leagueId: 30, position: -69 }, // World Cup - Qualification Asia
    { leagueId: 37, position: -68 }, // World Cup - Qualification Intercontinental Play-offs
    { leagueId: 40, position: -67 }, // championship
    { leagueId: 46, position: -66 }, // efl
    { leagueId: 41, position: -64 }, // league one
    { leagueId: 42, position: -63 }, // league two
    { leagueId: 49, position: -62 }, // national league playoffs
]

// move the most popular leagues to the beginning
function reorderFixtureByPopularity(groupedFixtures: Fixture[][])
{
    return groupedFixtures.sort(function(a, b){ 
        const positionA = leagueIdsByPopularity.find(x => x.leagueId == a[0]?.league.id)?.position;
        const positionB = leagueIdsByPopularity.find(x => x.leagueId == b[0]?.league.id)?.position;
        const positionAValue = positionA ? positionA : 1000;
        const positionBValue = positionB ? positionB : 1000;
        // console.log(position); 
        return positionAValue - positionBValue;
        // return leagueIdsByPopularity.find(x => x.leagueId == a[0]?.league.id)?.position || 1000 
    });
}