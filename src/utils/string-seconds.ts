export function stringToSeconds(timerString: string): number {
  const [minutos, segundos] = timerString.split(":").map(Number);
  return minutos * 60 + segundos;
}
