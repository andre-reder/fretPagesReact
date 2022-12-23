export default function isValorValid(valor) {
  const formatedValor = Number(valor.replace(/\D/g, '')) / 100;
  const maxVal = 30000;
  const minVal = 5000;
  if (formatedValor > maxVal || formatedValor < minVal) {
    return false;
  }
  return true;
}
