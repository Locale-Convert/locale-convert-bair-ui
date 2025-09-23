export function formatNumberWithSpaces(value) {
  const number = typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value;

  if (isNaN(number)) return value;

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}