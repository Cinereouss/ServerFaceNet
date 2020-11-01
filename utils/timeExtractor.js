exports.javaTimeExtractor = timeInString => {
  const data = timeInString.split(' ');
  const dateData = data[0].split('/');
  const day = +dateData[0];
  const month = +dateData[1];
  const year = +dateData[2];

  const timeData = data[1].split(':');
  const hour = +timeData[0];
  const minute = +timeData[1];
  const second = +timeData[2];

  return {
    day,
    month,
    year,
    hour,
    minute,
    second
  };
};

exports.localTimeExtractor = UTCTime => {
  const localTime = new Date(UTCTime);
  const day = localTime.getDate();
  const month = localTime.getMonth() + 1;
  const year = localTime.getFullYear();
  const hour = localTime.getHours();
  const minute = localTime.getMinutes();
  const second = localTime.getSeconds();

  return {
    day,
    month,
    year,
    hour,
    minute,
    second

  }
}

exports.convertSecondToTime = (seconds) => {
  const ss = seconds % 60;
  let hh = Math.floor(seconds / 60);
  const mm = hh % 60;
  hh = Math.floor(hh / 60);

  let hour = '';
  let minute = '';
  let second = '';

  if(hh !== 0) {
    hour = hh + ' giờ ';
  }

  if(mm !== 0) {
    minute = mm + ' phút ';
  }

  if(ss !== 0) {
    second = ss + ' giây';
  }

  return `${hour}${minute}${second}`;
}

exports.javaTimeExtractorToString = timeInString => {
  const data = timeInString.split(' ');
  const dateData = data[0].split('/');
  const day = dateData[0];
  const month = dateData[1];
  const year = dateData[2];

  const timeData = data[1].split(':');
  const hour = timeData[0];
  const minute = timeData[1];
  const second = timeData[2];

  return {
    day,
    month,
    year,
    hour,
    minute,
    second
  };
};