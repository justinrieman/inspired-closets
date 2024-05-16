import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  if (date === null) {
    return;
  }
  let yearDayMonth = date.substring(0, 10);
  let dateArr = yearDayMonth.split('-');
  let dayMonthYear = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
  return dayMonthYear;
}
