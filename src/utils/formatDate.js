export default function formatDate(date) {
  const getFullDate = date.includes('T') ? date.split('T')[0] : date;
  const splittedDate = getFullDate.split('-');
  const year = splittedDate[0];
  const month = splittedDate[1];
  const day = splittedDate[2];

  return `${day}/${month}/${year}`;
}
