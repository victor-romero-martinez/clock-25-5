import { useContext, useEffect, useRef, useState } from "react";
import { ClockContext } from "../context/clockContext";
import { ACTIONS } from "../reducers/clockReducer";
import { secondsToString } from "../utils/seconds-string";
import { stringToSeconds } from "../utils/string-seconds";
import Controls from "./controls";
import LabelComponent from "./label-component";
import Timer from "./timer";

export default function Clock() {
  const context = useContext(ClockContext);

  if (!context) {
    throw new Error("App debe estar dentro de un ClockProvider.");
  }

  const { state, dispatch } = context;

  const [leftTime, setLeftTime] = useState(stringToSeconds(state.timer));
  const [timerEnded, setTimerEnded] = useState(false);
  const intervalId = useRef<number | null>(null);

  const startInterval = () => {
    if (intervalId.current !== null) return; // Evitar múltiples intervalos

    intervalId.current = setInterval(() => {
      setLeftTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }

        setTimerEnded(true);
        return 0;
      });
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => {
    setLeftTime(stringToSeconds(state.timer));
  }, [state.timer]);

  useEffect(() => {
    if (state.isPlay) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval();
    };
  }, [state.isPlay]);

  useEffect(() => {
    if (timerEnded) {
      stopInterval();
      dispatch({ type: ACTIONS.SWITCH_TIMER });

      const newTimer = state.isSession
        ? state.breakLength
        : state.sessionLength;
      setLeftTime(newTimer * 60);

      if (state.isPlay) {
        startInterval();
      }

      setTimerEnded(false);
    }
  }, [timerEnded, state.timer, state.isSession, state.isPlay, dispatch]);

  const handleReset = () => {
    stopInterval();
    dispatch({ type: ACTIONS.RESET });
    setLeftTime(stringToSeconds(state.timer));
    setTimerEnded(false);
  };

  return (
    <>
      <Timer session={state.isSession} timeLeft={secondsToString(leftTime)} />

      <div className="label-section">
        <LabelComponent
          title="break"
          value={state.breakLength.toString()}
          onClickUp={() =>
            !state.isPlay && dispatch({ type: ACTIONS.BREAK_INCREMENT })
          }
          onClickDown={() =>
            !state.isPlay && dispatch({ type: ACTIONS.BREAK_DECREMENT })
          }
        />
        <LabelComponent
          title="session"
          value={state.sessionLength.toString()}
          onClickUp={() =>
            !state.isPlay && dispatch({ type: ACTIONS.SESSION_INCREMENT })
          }
          onClickDown={() =>
            !state.isPlay && dispatch({ type: ACTIONS.SESSION_DECREMENT })
          }
        />
      </div>

      <Controls
        isPlay={state.isPlay}
        onStart={() => dispatch({ type: ACTIONS.PLAY_PAUSE })}
        onReset={handleReset}
      />
    </>
  );
}
