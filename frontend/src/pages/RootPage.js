import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootPage;
