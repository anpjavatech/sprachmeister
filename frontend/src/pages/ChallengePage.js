import { useCallback, useState } from "react";
import { QUESTIONS } from "../assets/questions_dump";
import quizLogo from "../assets/quiz.png";
import Questions from "../components/Questions";
import Summary from "../components/Summary";

export default function ChallengePage() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleUserAnswers = useCallback(function handleUserAnswers(userAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, userAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleUserAnswers(null),
    [handleUserAnswers]
  );

  if (isQuizCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <>
      <header>
        <img src={quizLogo} alt="Quiz Logo" />
        <h1>Vocabulary Quizz</h1>
      </header>
      <div id="quiz">
        <Questions
          key={activeQuestionIndex}
          questionIndex={activeQuestionIndex}
          onUserSelect={handleUserAnswers}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </>
  );
}
