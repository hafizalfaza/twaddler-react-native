export function convertDate(date) {
    let correctDate = '';

    const convertedPostDate = new Date(date);
    const currentDate = new Date();

    const second = (currentDate - convertedPostDate) / 1000;
    const minute = second / 60;
    const hour = minute / 60;
    const day = hour / 24;
    const week = day / 7;
    const month = week / 30;
    const year = month / 12;

    const secondStatement = Math.floor(second) + 's';
    const minuteStatement = Math.floor(minute) + 'm';
    const hourStatement = Math.floor(hour) + 'h';
    const dayStatement = Math.floor(day) + 'd';
    const weekStatement = Math.floor(week) + 'w';
    const monthStatement = Math.floor(month) + 'mo';
    const yearStatement = Math.floor(year) + 'y';
    const recentStatement = 'a moment ago';

    if (second >= 1 && minute < 1) {
      correctDate = secondStatement;
    }

    if (minute >= 1 && hour < 1) {
      correctDate = minuteStatement;
    }

    if (hour >= 1 && day < 1) {
      correctDate = hourStatement;
    }

    if (day >= 1 && week < 1) {
      correctDate = dayStatement;
    }

    if (week >= 1 && month < 1) {
      correctDate = weekStatement;
    }

    if (month >= 1 && year < 1) {
      correctDate = monthStatement;
    }

    if (year > 1) {
      correctDate = yearStatement;
    }

    if (second < 1) {
      correctDate = 'now';
    }

    return correctDate;
  }	