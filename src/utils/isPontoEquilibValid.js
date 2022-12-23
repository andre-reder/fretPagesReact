export default function isPontoEquilibValid(pontoEquilib) {
  const maxPe = 100;
  const minPe = 50;
  if (pontoEquilib > maxPe || pontoEquilib < minPe) {
    return false;
  }
  return true;
}
