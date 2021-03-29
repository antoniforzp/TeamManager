export function checkIfBlank(str: string): boolean {
  return !str || /^\s*$/.test(str);
}
