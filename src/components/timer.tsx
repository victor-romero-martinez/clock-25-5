import "../styles/timer.css";

export default function Timer({
  session,
  timeLeft,
}: {
  session: boolean;
  timeLeft: string;
}) {
  return (
    <>
      <div className="timer-container">
        <div className="timer-wrapper">
          <span id="timer-label">{session ? "Session" : "Break"}</span>
          <span id="time-left">{timeLeft}</span>
        </div>
      </div>
    </>
  );
}
