// Define the structures based on the JSON data
export interface StadiumDetails {
    stadiumId: number;
    name: string;
    city: string;
    state: string;
    country: string;
    capacity: number;
    playingSurface: string;
    geoLat: number | null;
    geoLong: number | null;
    type: string;
  }
  
  export interface Game {
    gameKey: string;
    seasonType: number;
    season: number;
    week: number;
    date: string;
    awayTeam: string;
    homeTeam: string;
    channel: string;
    pointSpread: number;
    overUnder: number;
    stadiumId: number;
    canceled: boolean;
    geoLat: number | null;
    geoLong: number | null;
    forecastTempLow: number;
    forecastTempHigh: number;
    forecastDescription: string;
    forecastWindChill: number;
    forecastWindSpeed: number;
    awayTeamMoneyLine: number;
    homeTeamMoneyLine: number;
    day: string;
    dateTime: string;
    globalGameId: number;
    globalAwayTeamId: number;
    globalHomeTeamId: number;
    scoreId: number;
    status: string;
    stadiumDetails: StadiumDetails;
  }
  
  export interface DfsSlatePlayer {
    slateGameId: number;
    slateId: number;
    gameId: number;
    operatorGameId: number;
    removedByOperator: boolean;
    scoreId: number;
    game: Game;
  }
  
  export interface DataItem {
    _id: string;
    season: number;
    seasonType: number;
    slateId: number;
    week: number;
    _lastUpdatedDate: string;
    dfsSlatePlayers: DfsSlatePlayer[];
  }
  