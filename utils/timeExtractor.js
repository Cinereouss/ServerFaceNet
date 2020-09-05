module.exports = timeInString => {
  const arrOfDay = timeInString.split(' ');
  const weekday = arrOfDay[0];
  const day = +arrOfDay[2];
  const month = arrOfDay[1];
  const year = +arrOfDay[5];

  const arrOfTime = arrOfDay[3].split(':');
  const hour = +arrOfTime[0];
  const minute = +arrOfTime[1];
  const second = +arrOfTime[2];

  return {
    weekday,
    day,
    month,
    year,
    hour,
    minute,
    second
  };
};
