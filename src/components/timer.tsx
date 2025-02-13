import "../styles/timer.css";
import { secondsToString } from "../utils/seconds-string";

export default function Timer({
  session,
  timeLeft,
  isActive,
}: {
  session: boolean;
  timeLeft: number;
  isActive: boolean;
}) {
  return (
    <>
      <div className="timer-container separator">
        <div
          className={`timer-wrapper ${isActive ? "timer-active" : ""}  ${
            timeLeft < 60 && isActive ? "warning" : ""
          }`}
        >
          <span id="timer-label">{session ? "Session" : "Break"}</span>
          <span id="time-left">{secondsToString(timeLeft)}</span>
        </div>
      </div>
    </>
  );
}
