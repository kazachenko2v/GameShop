export interface IGame {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: ParentPlatform[];
  developers: Developer[];
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface ParentPlatform {
  platform: Platform;
}

export interface GameFromGenres {
  id: number;
  slug: string;
  name: string;
  added: number;
}

export interface Genres {
  id: number;
  name: string;
  games_count: number;
  image_background: string;
  games: GameFromGenres[];
}

export interface GenresResult {
  count: number;
  next?: any;
  previous?: any;
  results: Genres[];
}

export interface GamesResult {
  count: number;
  next?: any;
  previous?: any;
  results: IGame[];
}
