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

import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import RequireAuth from "./HOC/RequireAuth";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayouts />,
      children: [
        { path: "", element: <Main /> },
        { path: "/allgames", element: <AllGames /> },
        { path: "/:id", element: <GamePage /> },
        { path: "/genres/:id", element: <GenresPage /> },
        { path: "/creacteaccount", element: <CreateAccount /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/404", element: <NotFound /> },
        {
          path: "/account",
          element: (
            <RequireAuth>
              <Account />
            </RequireAuth>
          ),
        },
        {
          path: "/shop/:id",
          element: (
            <RequireAuth>
              <Shop />
            </RequireAuth>
          ),
        },
        {
          path: "/favorites",
          element: (
            <RequireAuth>
              <FavoritesPage />
            </RequireAuth>
          ),
        },
        {
          path: "/library",
          element: (
            <RequireAuth>
              <Library />
            </RequireAuth>
          ),
        },
        { path: "*", element: <Navigate replace to="404" /> },
      ],
    },
  ],
  {
    basename: "/GameShop",
  }
);

export default router;
