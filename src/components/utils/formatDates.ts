export const formatDateToLocaleDate = (date: Date) =>
  date.toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
