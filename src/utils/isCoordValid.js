export default function isCoordValid(coord) {
  const regex = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/;
  return regex.test(coord);
}
