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

    audioRef.current.play();
    audioRef.current.addEventListener("ended", stateFn);

    return () => audioRef.current?.removeEventListener("ended", stateFn);
  }, [isPlaying]);

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
