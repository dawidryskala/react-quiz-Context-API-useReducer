// import { useEffect, useState } from "react";
import { useQuestions } from "../contexts/QueastionsContext";

function Option() {
  const { question, dispatch, answer } = useQuestions();

  const hasAnswered = answer !== "";
  // console.log("hasAnswered in Option component    " + hasAnswered);

  return (
    <div className="option">
      {/* second argument of map function is current index of all elelments which we are mapping */}
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
          ${index === answer ? "answer" : ""} 
          ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== ""}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
