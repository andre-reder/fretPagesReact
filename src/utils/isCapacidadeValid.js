export default function isAnoValid(capacidade) {
  const maxCap = 50;
  const minCap = 7;
  if (capacidade > maxCap || capacidade < minCap) {
    return false;
  }
  return true;
}
