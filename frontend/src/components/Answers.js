import { useRef } from "react";

export default function Answers({
  options,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  // Ref will help us from re shuffling every time when the component loads even for the same question.
  const schuffledOptions = useRef();

  if (!schuffledOptions.current) {
    schuffledOptions.current = [...options];
    schuffledOptions.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {schuffledOptions.current.map((option) => {
        const isSelected = selectedAnswer === option;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={option} className="answer">
            <button
              onClick={() => onSelect(option)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
