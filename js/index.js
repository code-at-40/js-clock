const clock = document.querySelector('.container__clock-circle');
const secondsLine = document.querySelector('.container__clock-seconds');
const minutesLine = document.querySelector('.container__clock-minutes');
const hoursLine = document.querySelector('.container__clock-hours');

const clockRadius = clock.r.baseVal.value;
const clockCenterX = clock.cx.baseVal.value;
const clockCenterY = clock.cy.baseVal.value;

const secondsLineLenght = clockRadius - 20;
const minutesLineLenght = clockRadius - 20;
const hoursLineLenght = clockRadius - 100;

const getTime = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours
  };
};

const degreeToRadians = (degree) => {
  const radians = degree * (Math.PI / 180);

  return radians;
};

const moveLine = (lineTime, line, lineLength) => {
  const angleDegreesSecondsMinutes = 360 / 60;
  const angleDegreesHours = 360 / 12;
  let angleNow = 0;

  if (line.id === 'hours') {
    angleNow = lineTime * angleDegreesHours;
  } else {
    angleNow = lineTime * angleDegreesSecondsMinutes;
  }

  const radians = degreeToRadians(90 - angleNow);

  const newX1 = clockCenterX + Math.round(lineLength * Math.cos(radians));
  const newY1 = clockCenterY - lineLength + Math.round(lineLength - lineLength * Math.sin(radians));

  line.x1.baseVal.value = newX1;
  line.y1.baseVal.value = newY1;
};

const moveLines = () => {
  const time = getTime();

  moveLine(time.seconds, secondsLine, secondsLineLenght);
  moveLine(time.minutes, minutesLine, minutesLineLenght);
  moveLine(time.hours, hoursLine, hoursLineLenght);
};

moveLines();

setInterval(() => {
  moveLines();
}, 1000);
