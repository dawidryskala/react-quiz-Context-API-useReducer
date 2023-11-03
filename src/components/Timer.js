import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      // cleanUp function
      // now it will be render beetwen renders
      // after this component is unmounted
      return () => clearInterval(id);
    },
    [dispatch]
  );

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  //   return <div className="timer">{secondsRemaining}</div>;
  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
