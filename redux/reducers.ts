import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
            return { ...state, todaysFixtures: action.payload };

        case GET_ONE_DAY_AGO_FIXTURES:
            return { ...state, oneDayAgoFixtures: action.payload };
        case GET_TWO_DAYS_AGO_FIXTURES:
            return { ...state, twoDaysAgoFixtures: action.payload };
        case GET_THREE_DAYS_AGO_FIXTURES:
            return { ...state, threeDaysAgoFixtures: action.payload };
        case GET_FOUR_DAYS_AGO_FIXTURES:
            return { ...state, fourDaysAgoFixtures: action.payload };
        case GET_FIVE_DAYS_AGO_FIXTURES:
            return { ...state, fiveDaysAgoFixtures: action.payload };
        case GET_SIX_DAYS_AGO_FIXTURES:
            return { ...state, sixDaysAgoFixtures: action.payload };
        case GET_SEVEN_DAYS_AGO_FIXTURES:
            return { ...state, sevenDaysAgoFixtures: action.payload };

        case GET_ONE_DAY_FUTURE_FIXTURES:
            return { ...state, oneDayFutureFixtures: action.payload };
        case GET_TWO_DAYS_FUTURE_FIXTURES:
            return { ...state, twoDaysFutureFixtures: action.payload };
        case GET_THREE_DAYS_FUTURE_FIXTURES:
            return { ...state, threeDaysFutureFixtures: action.payload };
        case GET_FOUR_DAYS_FUTURE_FIXTURES: 
            return { ...state, fourDaysFutureFixtures: action.payload };
        case GET_FIVE_DAYS_FUTURE_FIXTURES:
            return { ...state, fiveDaysFutureFixtures: action.payload };
        case GET_SIX_DAYS_FUTURE_FIXTURES:
            return { ...state, sixDaysFutureFixtures: action.payload };
        case GET_SEVEN_DAYS_FUTURE_FIXTURES:
            return { ...state, sevenDaysFutureFixtures: action.payload };

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