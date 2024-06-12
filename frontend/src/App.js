import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import GrammerChallengePage from "./pages/GrammerChallengePage";
import PrepositionsChallengePage from "./pages/PrepositionsChallengePage";
import NounsChallengePage from "./pages/NounsChallengePage";
import ChallengePage from "./pages/ChallengePage";
import VerbChallenge, {
  loader as questionsLoader,
} from "./pages/VerbChallengePage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthToken, tokenLoader } from "./utils/auth";
import NewQuestionPage from "./pages/NewQuestionsPage";
import { action as submitChallengeAction } from "./components/NewChallenge";

const combinedLoader = async (type) => {
  const authData = await checkAuthToken();
  const questionsData = await questionsLoader(type);

  return {
    ...authData,
    ...questionsData,
  };
};

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
        path: "new-challenge",
        element: <ChallengePage />,
        loader: checkAuthToken,
        action: submitChallengeAction,
      },
      {
        path: "verb",
        element: <VerbChallenge />,
        loader: () => combinedLoader("verb"),
      },
      {
        path: "grammer",
        element: <GrammerChallengePage />,
        loader: () => combinedLoader("grammer"),
      },
      {
        path: "noun",
        element: <NounsChallengePage />,
        loader: () => combinedLoader("noun"),
      },
      {
        path: "preposition",
        element: <PrepositionsChallengePage />,
        loader: () => combinedLoader("preposition"),
      },
      {
        path: "questions",
        element: <NewQuestionPage />,
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
