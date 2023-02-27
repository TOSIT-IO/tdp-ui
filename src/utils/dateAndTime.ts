/**
 * Returns the time parameter with date and time format.
 * @param time - The date and hour to format
 * @returns The time parameter with date and time format
 * @example format as "Fri, Jan 20, 2023, 7:44:02 PM"
 */
export function dateAndTime(time: Date) {
  return time.toLocaleString('en-EN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
}

/**
 * Returns the time parameter with date and time format.
 * @param time - The date and hour to format
 * @returns The time parameter with date and time format
 * @example format as "Fri, Jan 20, 2023, 7:44:02 PM"
 */
export function onlyTime(time: Date) {
  return time.toLocaleString('en-EN', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
}
