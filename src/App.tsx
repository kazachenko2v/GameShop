import {
  Main,
  AllGames,
  GamePage,
  NotFound,
  Favorites,
  GenresPage,
} from "./pages";
import MainLayouts from "./layouts/MainLayouts";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="" element={<Main />} />
          <Route path="allgames" element={<AllGames />} />
          <Route path=":id" element={<GamePage />} />
          <Route path="/genres/:id" element={<GenresPage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
