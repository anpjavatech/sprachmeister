import { useRef } from "react";

import Modal from "./Modal.js";
import { getAuthToken } from "../utils/auth";
import { useSubmit, json, redirect } from "react-router-dom";

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
  const submit = useSubmit();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("question", question.current.value);
    formData.append("answer", answer.current.value);
    formData.append("option1", option1.current.value);
    formData.append("option2", option2.current.value);
    formData.append("option3", option3.current.value);
    formData.append("option4", option4.current.value);
    formData.append("option5", option5.current.value);
    formData.append("type", type.current.value);
    formData.append("description", description.current.value);
    submit(formData, { method: "post", action: "/new-challenge" });

    onDone();
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
          <button type="submit">Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}

export async function action({ request, params }) {
  console.log("in api call");
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  let options = [];
  options.push(data.get("option1"));
  options.push(data.get("option2"));
  options.push(data.get("option3"));
  options.push(data.get("option4"));
  options.push(data.get("option5"));

  const questionData = {
    question: data.get("question"),
    answer: data.get("answer"),
    options,
    type: data.get("type"),
    description: data.get("description"),
  };

  let url = "http://localhost:8000/questions";

  if (method === "PATCH") {
    const questionId = params.eventId;
    url = "http://localhost:8000/questions/" + questionId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(questionData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/challenges");
}
