import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Questions({
  questionIndex,
  onUserSelect,
  onSkipAnswer,
  questions,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[questionIndex].answer[0] === answer,
      });

      setTimeout(() => {
        console.log("inside second loop");
        onUserSelect(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        timeout={timer}
        mode={answerState}
      />
      <h2>{questions[questionIndex].question}</h2>
      <Answers
        options={questions[questionIndex].options}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectedAnswer}
      />
    </div>
  );
}
