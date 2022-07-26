export const PROTOCOL_DOMAIN = "https://api.rawg.io/api/";
export const GAMES_LIST = "https://api.rawg.io/api/games";
export const KEY_ID = "?key=79fd490bc00041509c19e4a1a36cb212";
export const PAGE = "&page=";
export const PAGE_SIZE = "&page_size=";
export const PAGE_SIZE_COUNT_5 = 5;
export const PAGE_SIZE_COUNT_20 = 20;
export const PARENT_PLATFORMS = "&parent_platforms=";
export const DATE = "&dates=2020-09-01,2022-06-01";

export const GAMES_LIST_KEY_ID = GAMES_LIST + KEY_ID;

export const GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_20 =
  GAMES_LIST + KEY_ID + PAGE_SIZE + PAGE_SIZE_COUNT_20;

export const GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_5 =
  GAMES_LIST + KEY_ID + PAGE_SIZE + PAGE_SIZE_COUNT_5;

/*  initial state constants */
export const ALL_PLATFORMS = [
  { id: 1, name: "PC" },
  { id: 2, name: "PlayStation" },
  { id: 3, name: "Xbox" },
  { id: 4, name: "iOS" },
  { id: 8, name: "Android" },
];
export const ALL_PLATFORMS_ID = ALL_PLATFORMS.map((item) => item.id);
export const START_PAGE = 1;
