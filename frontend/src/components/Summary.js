import trophyLogo from "../assets/trophy.png";

export default function Summary({ userAnswers, questions }) {
  const skippedAnswers = userAnswers.filter(
    (answer) => answer === "" || answer === null || answer === undefined
  ).length;

  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].answer
  ).length;

  const skippedPer = Math.round((skippedAnswers / userAnswers.length) * 100);
  const correctPer = Math.round((correctAnswers / userAnswers.length) * 100);
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
      <div className="grid-table">
        <table>
          <thead>
            <tr>
              <th>Questions Asked</th>
              <th>Required Answers</th>
              <th>Provided Answers</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((answer, index) => {
              let status = "skipped";
              let cssClass = "user-answer";
              if (answer === null) {
                status = "skipped";
                cssClass += " skipped";
              } else if (answer === questions[index].answer) {
                status = "correct";
                cssClass += " correct";
              } else {
                status = "wrong";
                cssClass += " wrong";
              }
              return (
                <tr key={index}>
                  <td>{questions[index].question}</td>
                  <td>{questions[index].answer}</td>
                  <td>{answer}</td>
                  <td className={cssClass}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
