import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      startButton.setAttribute('disabled', true); // Блокируем кнопку при ошибке
      return;
    }

    startButton.removeAttribute('disabled'); // Разблокируем кнопку при правильной дате
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

updateTimerDisplay(0);

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', () => {
  const datetimePicker = document.querySelector('#datetime-picker');
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
    return;
  }

  startButton.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      startButton.removeAttribute('disabled');
    } else {
      updateTimerDisplay(timeDifference);
    }
  }, 1000);
});





