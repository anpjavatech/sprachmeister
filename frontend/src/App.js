import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ChallengePage from "./pages/ChallengePage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthToken, tokenLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkAuthToken,
      },
      {
        path: "challenges",
        element: <ChallengePage />,
        loader: checkAuthToken,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
