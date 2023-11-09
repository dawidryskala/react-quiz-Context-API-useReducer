import { useQuestions } from "../contexts/QueastionsContext";

function NextButton() {
  const { dispatch, answer, index, numQuestios } = useQuestions();

  // console.log("answer in NextButton Component    " + answer);
  console.log("numQuestios   " + numQuestios);

  if (answer === "") return null;

  if (index < numQuestios - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestios - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
