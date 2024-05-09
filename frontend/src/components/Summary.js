import trophyLogo from "../assets/quiz-complete.png";
import { QUESTIONS } from "../assets/questions_dump";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answer[0]
  );

  const skippedPer =
    Math.round(skippedAnswers.length / userAnswers.length) * 100;

  const correctPer =
    Math.round(correctAnswers.length / userAnswers.length) * 100;

  const wrongPer = 100 - skippedPer - correctPer;

  return (
    <div id="summary">
      <img src={trophyLogo} alt="Trophy Icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPer}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPer}%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{wrongPer}%</span>
          <span className="text">wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answer[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].question}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
