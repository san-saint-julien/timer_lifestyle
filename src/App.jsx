import { useEffect, useState } from "react";
import "./App.css";
import { useInterval } from "ahooks";
import FlipNumbers from "react-flip-numbers";
import React, { useRef } from "react";

const isProduction = true;

const ONE_HOUR_SECONDS = isProduction ? 3600 : 1;
const START = ONE_HOUR_SECONDS * 9;
const START_PAUSE_TIME = ONE_HOUR_SECONDS * isProduction ? 4.5 : 4;
const END_PAUSE_TIME = START_PAUSE_TIME - ONE_HOUR_SECONDS;
const END_DAY = 0;

function App() {
  const [counterState, setCounterState] = useState("idle");
  const [count, setCount] = useState(START);
  const MyComponent = () => {
  const audioRef = useRef(null);


  useEffect(() => {
    if (document.body && counterState !== "idle") {
      document.body.style.animation = `backGroundColorBody ${START}s ease-in-out`;
    }
  }, [counterState]);

  useInterval(
    () => {
      setCount(count - 1);
    },
    counterState !== "idle" ? 1000 : null
  );

  useEffect(() => {
    handlePause();
    handleEnd();
  }, [count]);

  function handlePause() {
    if (count === START_PAUSE_TIME) {
      setCounterState("Pause");
    }
    if (count === END_PAUSE_TIME) {
      setCounterState("Working");
    }
  }

  function handleEnd() {
    if (count === END_DAY) {
      setCounterState("idle");
      setCount(START);
    }
  }

  function handleworking() {
    setCounterState("Working");
  }

  const [imgSrc, setImgSrc] = useState("/public/images/character_working.png");

  useEffect(() => {
    if (counterState === "Pause") {
      setImgSrc("/public/images/character_pause.png");
    } else {
      setImgSrc("/public/images/character_working.png");
    }
  }, [counterState]);

  return (
    <main className="App">
      {counterState !== "idle" ? (
        <div>
          <img src={imgSrc} alt="kawaii" id="charater" />

          <FlipNumbers height={55} width={50} play numbers={String(count)} />

          <p>Secondes restantes</p>

          <p id="text-rest">{counterState}</p>

          <div>
            <audio ref={audioRef} src="mysound.mp3"/>
          </div>
        </div>
      ) : (
        <>
          <header>
            <h1>Welcome</h1>
            <h2>To your new work journey</h2>
          </header>

          <img
            src="/public/images/character_start.png"
            alt="kawaii"
            id="charater"
          />

          <button onClick={handleworking} id="button">
            START
          </button>
        </>
      )}
    </main>
  );
}

export default App;
