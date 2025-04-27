export default function capitaliseFirstLetter(inputString: string): string {
  if (!inputString) {
    return inputString;
  }
  const modifiedString =
    inputString.charAt(0).toUpperCase() + inputString.slice(1);
  return modifiedString;
}
