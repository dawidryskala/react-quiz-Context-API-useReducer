import { useQuestions } from "../contexts/QueastionsContext";

function Progress() {
  const { index, numQuestios, points, maxPossiblePoints, answer } =
    useQuestions();
  console.log("numQuestios  " + numQuestios);
  console.log("index  " + index);
  console.log("points  " + points);
  console.log("maxPossiblePoints  " + maxPossiblePoints);
  console.log("answer  " + answer);

  return (
    <header className="progress">
      {/* Number(true) => 1  and Number(false) => 0*/}
      <progress max={numQuestios} value={index + Number(answer !== "")} />

      <p>
        Queastion <strong>{index + 1}</strong> / {numQuestios}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
