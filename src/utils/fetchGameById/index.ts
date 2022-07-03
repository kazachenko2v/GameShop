import axios from "axios";
import { GAMES_LIST, KEY_ID } from "../../constants";

interface fetchGameByIdArgs {
  setGame: (item: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  id: number;
}

// export const fetchGameById: fetchGameByIdArgs = async (
//   setGame,
//   setIsLoading,
//   id
// ) => {
//   try {
//     const { data } = await axios.get(GAMES_LIST + "/" + id + KEY_ID);
//     setGame(data);
//   } catch (error) {
//     alert(error);
//   } finally {
//     setIsLoading(false);
//   }
// };
