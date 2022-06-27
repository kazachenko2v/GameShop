import Main from "./pages/Main";
import GamePage from "./pages/GamePage";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import MainLayouts from "./layouts/MainLayouts";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="" element={<Main />} />
          <Route path=":id" element={<GamePage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
