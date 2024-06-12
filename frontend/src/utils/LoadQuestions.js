import { json } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

async function loadQuestions(type) {
  console.log(type);
  const token = getAuthToken();
  const url = `http://localhost:8000/questions?limit=10&type=${type}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  }
  const resData = await response.json();
  return resData.randomQuestions;
}

export default loadQuestions;
