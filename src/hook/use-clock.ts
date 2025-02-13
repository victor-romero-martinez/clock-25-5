import { useContext, useEffect, useRef, useState } from "react";
import { ClockContext } from "../context/clockContext";
import { ACTIONS } from "../types/types";
import { stringToSeconds } from "../utils/string-seconds";

export function useClock() {
  const context = useContext(ClockContext);

  if (!context) {
    throw new Error("App debe estar dentro de un ClockProvider.");
  }

  const { state, dispatch } = context;

  const [leftTime, setLeftTime] = useState(stringToSeconds(state.timer));
  const [timerEnded, setTimerEnded] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleReset = () => {
    stopInterval();
    setAudioPlay(false);
    dispatch({ type: ACTIONS.RESET });
    setLeftTime(stringToSeconds(state.timer));
    setTimerEnded(false);

    const audioElement = document.getElementById("beep") as HTMLAudioElement;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
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
      setAudioPlay(true);
      setTimerEnded(false);
    }
  }, [timerEnded, state.timer, state.isSession, state.isPlay, dispatch]);

  return {
    state,
    dispatch,
    leftTime,
    audioPlay,
    setAudioPlay,
    handleReset,
  };
}
