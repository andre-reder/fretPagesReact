export default function isDataInativoAteValid(data) {
  const currentDate = new Date();
  const inputDate = new Date(data);
  if (inputDate > currentDate) {
    return true;
  }
  return false;
}
