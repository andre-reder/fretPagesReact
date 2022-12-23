export default function isDiasOperantesMesValid(dias) {
  const max = 30;
  const min = 1;
  if (dias > max || dias < min) {
    return false;
  }
  return true;
}
