import { useClock } from "../hook/use-clock";
import { ACTIONS } from "../types/types";
import Audio from "./audio";
import Controls from "./controls";
import LabelComponent from "./label-component";
import Timer from "./timer";

export default function Clock() {
  const { state, dispatch, leftTime, handleReset, audioPlay, setAudioPlay } =
    useClock();

  return (
    <>
      <Timer
        session={state.isSession}
        timeLeft={leftTime}
        isActive={state.isPlay}
      />

      <div className="label-section separator">
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

      <Audio isPlaying={audioPlay} stateFn={() => setAudioPlay(false)} />
    </>
  );
}
