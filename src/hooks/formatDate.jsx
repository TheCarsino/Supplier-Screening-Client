export function convertDateFormat(dateString) {
  const parts = dateString.split("-");

  if (parts.length === 3) {
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return formattedDate;
  }
  return dateString;
}
