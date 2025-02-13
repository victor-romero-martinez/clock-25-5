import { useEffect, useRef } from "react";

export default function Audio({
  isPlaying,
  stateFn,
}: {
  isPlaying: boolean;
  stateFn: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const newAudioRef = audioRef.current;
    newAudioRef.play();
    newAudioRef.addEventListener("ended", stateFn);

    return () => newAudioRef?.removeEventListener("ended", stateFn);
  }, [isPlaying, stateFn]);

  return (
    <>
      <audio
        ref={audioRef}
        id="beep"
        preload="auto"
        autoPlay={false}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </>
  );
}
