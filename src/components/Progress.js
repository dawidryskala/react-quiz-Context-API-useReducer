function Progress({ index, numQueastios, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      {/* Number(true) => 1  and Number(false) => 0*/}
      <progress max={numQueastios} value={index + Number(answer !== null)} />

      <p>
        Queastion <strong>{index + 1}</strong> / {numQueastios}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
