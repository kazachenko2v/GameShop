import axios from "axios";
import { TGamesItem } from "../redux/games/types";
import {
  GAMES_LIST,
  GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_5,
  KEY_ID,
} from "../constants/index";

export const fetchGameById = async (
  id: number,
  setGame: (item: TGamesItem) => void,
  setIsLoading?: (isLoading: boolean) => void
) => {
  try {
    const { data } = await axios.get(GAMES_LIST + "/" + id + KEY_ID);
    setGame(data);
  } catch (error) {
    alert(error);
  } finally {
    if (setIsLoading) {
      setIsLoading(false);
    }
  }
};

export const fetchGames = async (
  value: string,
  setGame: (item: TGamesItem[] | null) => void
) => {
  try {
    if (value) {
      const { data } = await axios.get(
        GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_5 + "&search=" + value
      );
      setGame(data.results);
    } else {
      setGame(null);
    }
  } catch (error) {
    alert(error);
    setGame(null);
  }
};

export const fetchSomething = async (
  value: string,
  setSomething: (item: any) => void
) => {
  try {
    const { data } = await axios.get(
      "https://api.rawg.io/api/" + value + KEY_ID
    );
    console.log(data.results);
    setSomething(data.results);
  } catch (error) {
    alert(error);
    setSomething(null);
  }
};
