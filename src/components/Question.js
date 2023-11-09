import Option from "./Option";
import { useQuestions } from "../contexts/QueastionsContext";

function Question() {
  const { question } = useQuestions();
  // console.log("question in Question component:", question.question);
  // console.log("answer in Question component:", answer);
  return (
    <div>
      <h4>{question.question}</h4>
      <Option />
    </div>
  );
}

export default Question;
