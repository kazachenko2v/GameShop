import { Main, AllGames, GamePage, NotFound, Favorites } from "./pages";
import MainLayouts from "./layouts/MainLayouts";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="" element={<Main />} />
          <Route path="allgames" element={<AllGames />} />
          <Route path=":id" element={<GamePage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
