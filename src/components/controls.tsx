import "../styles/controls.css";
import { IconPause, IconPlay, IconReset } from "./ui/buttons";

interface ControlsProps {
  isPlay: boolean;
  onStart: () => void;
  onReset: () => void;
}

export default function Controls({ isPlay, onStart, onReset }: ControlsProps) {
  return (
    <>
      <button
        type="button"
        id="start_stop"
        className="controls-btn"
        onClick={onStart}
      >
        {isPlay ? <IconPause /> : <IconPlay />}
      </button>
      <button
        type="button"
        id="reset"
        className="controls-btn"
        onClick={onReset}
      >
        <IconReset />
      </button>
    </>
  );
}
