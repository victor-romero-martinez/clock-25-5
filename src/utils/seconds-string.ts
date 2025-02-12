export function secondsToString(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${fixToTwoDigits(minutes)}:${fixToTwoDigits(seconds)}`;
}

function fixToTwoDigits(num: number): string {
  return num.toString().padStart(2, "0");
}
