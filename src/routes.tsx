import {
  Main,
  AllGames,
  GamePage,
  NotFound,
  FavoritesPage,
  GenresPage,
  CreateAccount,
  SignIn,
  Account,
  Shop,
  Library,
} from "./pages";

import { RequireAuth } from "./components";
import { Navigate } from "react-router-dom";

const routesConfig = [
  { path: "", element: <Main /> },
  {
    path: "account",
    element: (
      <RequireAuth>
        <Account />
      </RequireAuth>
    ),
  },
  { path: "allgames", element: <AllGames /> },
  { path: ":id", element: <GamePage /> },
  { path: "genres/:id", element: <GenresPage /> },
  {
    path: "shop/:id",
    element: (
      <RequireAuth>
        <Shop />
      </RequireAuth>
    ),
  },
  {
    path: "favorites",
    element: (
      <RequireAuth>
        <FavoritesPage />
      </RequireAuth>
    ),
  },
  {
    path: "library",
    element: (
      <RequireAuth>
        <Library />
      </RequireAuth>
    ),
  },
  { path: "creacteaccount", element: <CreateAccount /> },
  { path: "signin", element: <SignIn /> },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <Navigate replace to="404" /> },
];

export default routesConfig;
