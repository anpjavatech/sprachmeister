import { useCallback, useState } from "react";
import Questions from "../components/Questions";
import Summary from "../components/Summary";
import { useLoaderData, defer, Await } from "react-router-dom";
import loadQuestions from "../utils/LoadQuestions";
import { Suspense } from "react";

export default function NounChallengePage() {
  const data = useLoaderData().data;
  return (
    <>
      <header>
        <h1>Noun Challenge</h1>
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

export function loader(type) {
  return defer({
    randomQuestions: loadQuestions(type),
  });
}
