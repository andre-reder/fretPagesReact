export default function onlyNumbers(text) {
  return text.replace(/[^0-9]/g, '');
}
