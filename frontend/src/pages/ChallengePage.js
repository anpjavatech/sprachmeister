import { useCallback, useState } from "react";
import { QUESTIONS } from "../assets/questions_dump";
import quizLogo from "../assets/quiz-logo.png";
import trophyLogo from "../assets/quiz-complete.png";
import QuestionTimer from "../components/QuestionTimer";

export default function ChallengePage() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;
  let shuffledOptions = [];

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
    return (
      <div id="summary">
        <img src={trophyLogo} alt="Trophy Icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
  } else {
    shuffledOptions = [...QUESTIONS[activeQuestionIndex].options];
    shuffledOptions.sort(() => Math.random() - 0.5);
  }

  return (
    <>
      <header>
        <img src={quizLogo} alt="Quiz Logo" />
        <h1>Vocabulary Quizz</h1>
      </header>
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            key={activeQuestionIndex}
            onTimeout={handleSkipAnswer}
            timeout={10000}
          />
          <h2>{QUESTIONS[activeQuestionIndex].question}</h2>
          <ul id="answers">
            {shuffledOptions.map((answer) => {
              return (
                <li key={answer} className="answer">
                  <button onClick={() => handleUserAnswers(answer)}>
                    {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
