export function getFormattedDate(dateStr: string) {
  const date = new Date(dateStr);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;

  return `${dd}-${mm}-${yy}, ${hours12}:${minutes}${period}`;
}
