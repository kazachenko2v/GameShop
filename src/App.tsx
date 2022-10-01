import MainLayouts from "./layouts/MainLayouts";

import routesConfig from "./routes";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          {routesConfig.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
