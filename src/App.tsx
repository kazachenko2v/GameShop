import {
  Main,
  AllGames,
  GamePage,
  NotFound,
  FavoritesPage,
  GenresPage,
  CreateAccount,
  SignIn,
} from "./pages";
import MainLayouts from "./layouts/MainLayouts";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuth } from "./redux/authentication/selectors";

function App() {
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { userId } = useSelector(getIsAuth);
    return userId ? children! : <Navigate replace to="/" />;
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="" element={<Main />} />
          <Route path="allgames" element={<AllGames />} />
          <Route path=":id" element={<GamePage />} />
          <Route path="/genres/:id" element={<GenresPage />} />
          <Route
            path="favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route path="creacteaccount" element={<CreateAccount />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
