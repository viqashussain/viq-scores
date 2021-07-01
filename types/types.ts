export interface Periods {
    first: number;
    second: number;
}

export interface Venue {
    id: number;
    name: string;
    city: string;
}

export interface Status {
    long: string;
    short: string;
    elapsed: number;
}

export interface FixtureDetails {
    id: number;
    referee: string;
    timezone: string;
    date: Date;
    timestamp: number;
    periods: Periods;
    venue: Venue;
    status: Status;
}

export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
}

export interface Home {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

export interface Away {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

export interface Teams {
    home: Home;
    away: Away;
}

export interface Goals {
    home: number;
    away: number;
}

export interface Halftime {
    home: number;
    away: number;
}

export interface Fulltime {
    home: number;
    away: number;
}

export interface Extratime {
    home?: any;
    away?: any;
}

export interface Penalty {
    home?: any;
    away?: any;
}

export interface Score {
    halftime: Halftime;
    fulltime: Fulltime;
    extratime: Extratime;
    penalty: Penalty;
}

export interface Time {
    elapsed: number;
    extra?: any;
}

export interface Team {
    id: number;
    name: string;
    logo: string;
}

export interface Player {
    id: number;
    name: string;
}

export interface Assist {
    id?: number;
    name: string;
}

export interface Event {
    time: Time;
    team: Team;
    player: Player;
    assist: Assist;
    type: string;
    detail: string;
    comments?: any;
}

export interface Team2 {
    id: number;
    name: string;
    logo: string;
    colors?: any;
}

export interface Coach {
    id: number;
    name: string;
    photo: string;
}

export interface Player2 {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
}

export interface StartXI {
    player: Player2;
}

export interface Player3 {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid?: any;
}

export interface Substitute {
    player: Player3;
}

export interface Lineup {
    team: Team2;
    coach: Coach;
    formation: string;
    startXI: StartXI[];
    substitutes: Substitute[];
}

export interface Team3 {
    id: number;
    name: string;
    logo: string;
}

export interface Statistic2 {
    type: string;
    value: any;
}

export interface Statistic {
    team: Team3;
    statistics: Statistic2[];
}

export interface Team4 {
    id: number;
    name: string;
    logo: string;
    update: Date;
}

export interface Player6 {
    id: number;
    name: string;
    photo: string;
}

export interface Games {
    minutes: number;
    number: number;
    position: string;
    rating: string;
    captain: boolean;
    substitute: boolean;
}

export interface Shots {
    total: number;
    on: number;
}

export interface Goals2 {
    total?: number;
    conceded: number;
    assists?: number;
    saves?: number;
}

export interface Passes {
    total: number;
    key: number;
    accuracy: string;
}

export interface Tackles {
    total?: number;
    blocks: number;
    interceptions: number;
}

export interface Duels {
    total: number;
    won: number;
}

export interface Dribbles {
    attempts: number;
    success: number;
    past?: number;
}

export interface Fouls {
    drawn: number;
    committed: number;
}

export interface Cards {
    yellow: number;
    red: number;
}

export interface Penalty2 {
    won?: any;
    commited?: any;
    scored: number;
    missed: number;
    saved?: number;
}

export interface Statistic3 {
    games: Games;
    offsides?: number;
    shots: Shots;
    goals: Goals2;
    passes: Passes;
    tackles: Tackles;
    duels: Duels;
    dribbles: Dribbles;
    fouls: Fouls;
    cards: Cards;
    penalty: Penalty2;
}

export interface Player5 {
    player: Player6;
    statistics: Statistic3[];
}

export interface Player4 {
    team: Team4;
    players: Player5[];
}

export interface Fixture {
    fixture: FixtureDetails;
    league: League;
    teams: Teams;
    goals: Goals;
    score: Score;
    events: Event[];
    lineups: Lineup[];
    statistics: Statistic[];
    players: Player4[];
}
