function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

startButton.addEventListener('click', () => {
  if (intervalId) return; 

  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  if (!intervalId) return;

  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);

  clearInterval(intervalId);
  intervalId = null;
});