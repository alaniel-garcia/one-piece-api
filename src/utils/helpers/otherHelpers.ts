export function sortBounties(value: Array<string>): Array<string> {
  return value.sort((a, b) => parseInt(b.replaceAll(',', '')) - parseInt(a.replaceAll(',', '')));
}
