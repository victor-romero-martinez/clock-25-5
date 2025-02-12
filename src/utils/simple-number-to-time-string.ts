export function numberToTimeString(num: number) {
  return `${num.toString().padStart(2, "0")}:00`;
}
