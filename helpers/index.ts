export function getFormattedNumber(number: number): string {
  return Number(number.toFixed(2)).toLocaleString()
}
