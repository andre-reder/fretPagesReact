export default function isAnoValid(ano) {
  const currentYear = new Date().getFullYear();
  const oldestYear = 2000;
  if (ano > currentYear || ano < oldestYear) {
    return false;
  }
  return true;
}
