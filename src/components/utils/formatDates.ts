export const formatDateToLocaleDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
