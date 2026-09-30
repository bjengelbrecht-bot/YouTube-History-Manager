/**
 * Return a Date representing the date that is a given number
 * of months before the supplied date.
 *
 * @param {Date} date The starting date.
 * @param {number} months Number of months to subtract.
 * @returns {Date} The calculated date.
 */
export function subtractMonths(date, months) {
  const result = new Date(date);

  result.setMonth(result.getMonth() - months);

  return result;
}

/**
 * Convert a Date object to YYYY-MM-DD format.
 *
 * @param {Date} date The date to format.
 * @returns {string} A date such as 2026-08-28.
 */
export function formatDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Return the date that represents the beginning
 * of the supplied day.
 *
 * @param {Date} date The supplied date.
 * @returns {Date} A Date at midnight.
 */
export function startOfDay(date) {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

/**
 * Return the date that represents the end
 * of the supplied day.
 *
 * @param {Date} date The supplied date.
 * @returns {Date} A Date at 23:59:59.999.
 */
export function endOfDay(date) {
  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
}