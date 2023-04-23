const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const logger = () => {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
};
let intervalId = null;
btnStart.addEventListener('click', () => {
  logger(0);
  intervalId = setInterval(logger, 1000, 0);
  btnStart.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener('click', () => {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(intervalId);
});
