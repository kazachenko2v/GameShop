import React from "react";
import { useParams } from "react-router-dom";
import { useGetGenreQuery } from "../../redux/games/games.api";

const GenresPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: game,
    isError,
    isLoading,
    isSuccess,
  } = useGetGenreQuery(Number(id));
  console.log(game);
  return <div>{isSuccess && game.description}</div>;
};

export default GenresPage;
