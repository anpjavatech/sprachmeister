import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import classes from "./QuestionsForm.module.css";
import { getAuthToken } from "../utils/auth";

function QuestionForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="question">Question</label>
        <input
          id="question"
          type="text"
          name="question"
          required
          defaultValue={event ? event.question : ""}
        />
      </p>
      <p>
        <label htmlFor="answer">Answer</label>
        <input
          id="answer"
          type="text"
          name="answer"
          required
          defaultValue={event ? event.answer : ""}
        />
      </p>
      <p>
        <label htmlFor="option1">Option 1</label>
        <input
          id="option1"
          type="text"
          name="option1"
          required
          defaultValue={event ? event.option1 : ""}
        />
      </p>
      <p>
        <label htmlFor="option2">Option 2</label>
        <input
          id="option2"
          type="text"
          name="option2"
          required
          defaultValue={event ? event.option2 : ""}
        />
      </p>
      <p>
        <label htmlFor="option1">Option 3</label>
        <input
          id="option3"
          type="text"
          name="option3"
          required
          defaultValue={event ? event.option3 : ""}
        />
      </p>
      <p>
        <label htmlFor="option1">Option 4</label>
        <input
          id="option4"
          type="text"
          name="option4"
          required
          defaultValue={event ? event.option4 : ""}
        />
      </p>
      <p>
        <label htmlFor="option5">Option 5</label>
        <input
          id="option5"
          type="text"
          name="option5"
          required
          defaultValue={event ? event.option5 : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default QuestionForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  let options = [];
  options.push(data.get("option1"));
  options.push(data.get("option2"));
  options.push(data.get("option3"));
  options.push(data.get("option4"));

  const questionData = {
    question: data.get("question"),
    answer: data.get("answer"),
    options,
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

  return redirect("/questions");
}
