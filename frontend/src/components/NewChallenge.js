import { useContext, useRef } from "react";

import { ChallengesContext } from "../store/challenges-context.js";
import Modal from "./Modal.js";

export default function NewChallenge({ onDone }) {
  const question = useRef();
  const answer = useRef();
  const option1 = useRef();
  const option2 = useRef();
  const option3 = useRef();
  const option4 = useRef();
  const option5 = useRef();
  const type = useRef();
  const description = useRef();

  const { addChallenge } = useContext(ChallengesContext);

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      question: question.current.value,
      answer: answer.current.value,
      option1: option1.current.value,
      option2: option2.current.value,
      option3: option3.current.value,
      option4: option4.current.value,
      option5: option5.current.value,
      type: type.current.value,
      description: description.current.value,
    };

    if (
      !challenge.question.trim() ||
      !challenge.answer.trim() ||
      !challenge.option1.trim() ||
      !challenge.option2.trim() ||
      !challenge.option3.trim() ||
      !challenge.option4.trim() ||
      !challenge.option5.trim() ||
      !challenge.type.trim() ||
      !challenge.description.trim()
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="question">Question</label>
          <input ref={question} type="question" name="question" id="question" />
        </p>
        <p>
          <label htmlFor="answer">Answer</label>
          <input ref={answer} type="answer" name="answer" id="answer" />
        </p>
        <p>
          <label htmlFor="option1">Option 1</label>
          <input ref={option1} type="option1" name="option1" id="option1" />
        </p>
        <p>
          <label htmlFor="option2">Option 2</label>
          <input ref={option2} type="option2" name="option2" id="option2" />
        </p>
        <p>
          <label htmlFor="option3">Option 3</label>
          <input ref={option3} type="option3" name="option3" id="option3" />
        </p>
        <p>
          <label htmlFor="option4">Option 4</label>
          <input ref={option4} type="option4" name="option4" id="option4" />
        </p>
        <p>
          <label htmlFor="option5">Option 5</label>
          <input ref={option5} type="option5" name="option5" id="option5" />
        </p>
        <p>
          <label htmlFor="type">Type</label>
          <input ref={type} type="type" name="type" id="type" />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
