import { useCallback, useState } from "react";
import quizLogo from "../assets/quiz.png";
import Questions from "../components/Questions";
import Summary from "../components/Summary";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import { Suspense } from "react";

export default function VerbChallenge() {
  const data = useLoaderData().data;
  return (
    <>
      <header>
        <img src={quizLogo} alt="Quiz Logo" />
        <h1>Verb Challenge</h1>
      </header>
      <div id="quiz">
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={data.randomQuestions}>
            {(randomQuestions) => <Quiz randomQuestions={randomQuestions} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function Quiz({ randomQuestions }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const isQuizCompleted = activeQuestionIndex === randomQuestions.length;

  const handleUserAnswers = useCallback((userAnswer) => {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, userAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleUserAnswers(null);
  }, [handleUserAnswers]);

  if (isQuizCompleted) {
    return <Summary userAnswers={userAnswers} questions={randomQuestions} />;
  }

  return (
    <>
      <Questions
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onUserSelect={handleUserAnswers}
        onSkipAnswer={handleSkipAnswer}
        questions={randomQuestions}
      />
    </>
  );
}

async function loadQuestions() {
  const token = getAuthToken();
  const url = "http://localhost:8000/questions?limit=10";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  }
  const resData = await response.json();
  return resData.randomQuestions;
}

export function loader() {
  return defer({
    randomQuestions: loadQuestions(),
  });
}