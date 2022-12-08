import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { useInterval } from "ahooks";

const isProduction = import.meta.env.PROD;

const START = 0;
const ONE_HOUR_SECONDS = isProduction ? 3600 : 1;
const START_PAUSE_TIME = ONE_HOUR_SECONDS * isProduction ? 3.5 : 3;
const END_PAUSE_TIME = START_PAUSE_TIME + ONE_HOUR_SECONDS;
const END_DAY = ONE_HOUR_SECONDS * 7;

function App() {
  const [counterState, setCounterState] = useState("idle");
  const [count, setCount] = useState(START);

  useEffect(() => {
    const counter = document.getElementById("counter");

    if (counterState !== "idle") {
      document.body.style.animation = `backGroundColorBody ${END_DAY}s ease-in-out`;
      counter.style.animation = `backGroundColorText ${END_DAY}s ease-in-out`;
    }
  }, [counterState]);

  useInterval(
    () => {
      setCount(count + 1);
    },
    counterState !== "idle" ? 1000 : null
  );

  useEffect(() => {
    handlePause();
    handleEnd();
  }, [count]);

  function handlePause() {
    console.log(END_PAUSE_TIME);
    if (count === START_PAUSE_TIME) {
      setCounterState("pause");
    }
    if (count === END_PAUSE_TIME) {
      setCounterState("working");
    }
  }

  function handleEnd() {
    if (count === END_DAY) {
      setCounterState("idle");
    }
  }

  function handleworking() {
    setCounterState("working");
  }

  return (
    <div className="App">
      <p id="counter">{count}</p>

      <p>{counterState}</p>

      <button onClick={handleworking}>working</button>
    </div>
  );
}

export default App;
