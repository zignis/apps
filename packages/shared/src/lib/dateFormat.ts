import {
  addDays,
  format,
  isEqual,
  isSameDay,
  isSameYear,
  subDays,
} from 'date-fns';

export const oneMinute = 60;
export const oneHour = 3600;
export const oneDay = 86400;
export const oneYear = oneDay * 365;

export function postDateFormat(
  value: Date | number | string,
  now = new Date(),
): string {
  const date = new Date(value);

  // Calculate time delta in seconds.
  const dt = (now.getTime() - date.getTime()) / 1000;

  if (dt <= oneMinute) {
    return 'Now';
  }

  if (isSameDay(date, now)) {
    return 'Today';
  }

  if (isSameDay(date, subDays(now, 1))) {
    return 'Yesterday';
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
  };
  if (!isSameYear(date, now)) {
    options.year = 'numeric';
  }
  return date.toLocaleString('en-US', options);
}

export function commentDateFormat(
  value: Date | number | string,
  now = new Date(),
): string {
  const date = new Date(value);
  const dt = (now.getTime() - date.getTime()) / 1000;

  if (dt <= oneMinute) {
    return 'Now';
  }

  if (dt <= oneHour) {
    const numMinutes = Math.round(dt / oneMinute);
    return `${numMinutes} ${numMinutes === 1 ? 'min' : 'mins'}`;
  }

  if (dt <= oneDay) {
    const numHours = Math.round(dt / oneHour);
    return `${numHours} ${numHours === 1 ? 'hr' : 'hrs'}`;
  }

  if (dt <= oneYear) {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const isDateOnlyEqual = (left: Date, right: Date): boolean => {
  const formattedLeft = new Date(
    left.getFullYear(),
    left.getMonth(),
    left.getDate(),
  );
  const formattedRight = new Date(
    right.getFullYear(),
    right.getMonth(),
    right.getDate(),
  );

  return isEqual(formattedLeft, formattedRight);
};

export const getReadHistoryDateFormat = (currentDate: Date): string => {
  const today = new Date();

  if (isDateOnlyEqual(today, currentDate)) {
    return 'Today';
  }

  if (isDateOnlyEqual(today, addDays(currentDate, 1))) {
    return 'Yesterday';
  }

  const dayOfTheWeek = format(currentDate, 'EEE');
  const dayOfTheMonth = currentDate.getDate();
  const month = format(currentDate, 'MMM');
  const currentYear = currentDate.getFullYear();
  const year = currentYear === today.getFullYear() ? '' : ` ${currentYear}`;

  return `${dayOfTheWeek}, ${dayOfTheMonth} ${month}${year}`;
};

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const Weekends = [Day.Saturday, Day.Sunday];
