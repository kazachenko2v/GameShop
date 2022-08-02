import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

const MainLayouts = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayouts;
