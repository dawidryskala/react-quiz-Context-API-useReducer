import { useContext, useReducer, createContext, useEffect } from "react";

const QuestionContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: "",
  points: 0,
  highscore: 0,
  secondsRemaining: "",
};

function reducer(state, action) {
  const question = state.questions[state.index] || {};

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // now we know which is the current question

      if (!question) return state;

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: "" };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknow");
  }
}

function QueastionsProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestios = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const question = questions[index];

  useEffect(function () {
    async function fetchQueastions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    // fetch("http://localhost:9000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((err) => dispatch({ type: "dataFailed" }));
    fetchQueastions();
  }, []);

  //   async function startQuiz() {
  //     dispatch({ type: "start" });
  //   }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestios,
        maxPossiblePoints,
        dispatch,
        // startQuiz,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("useQueastions was used out of the provider");
  return context;
}

export { QueastionsProvider, useQuestions };
