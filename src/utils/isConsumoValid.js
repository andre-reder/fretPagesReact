export default function isConsumoValid(consumo) {
  const maxCon = 20;
  const minCon = 5;
  if (consumo > maxCon || consumo < minCon) {
    return false;
  }
  return true;
}
