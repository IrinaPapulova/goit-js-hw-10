import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button[data-start]');
const selectedDates = document.querySelector('input#datetime-picker');
let userSelectedDate = null;
let isActive = false;
let intervalId;
btnStart.disabled = true;
let ms = null;

const fp = flatpickr(selectedDates, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const timeAtStart = Date.now();
    if (selectedDates[0] < timeAtStart) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        close: true,
        timeout: 2000,
        closeOnClick: true,
        closeOnEscape: true,
      });
    } else {
      btnStart.disabled = false;
      userSelectedDate = new Date(selectedDates).getTime(selectedDates);
    }
  },
});

function startTimer() {
  if (!isActive) {
    isActive = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      ms = userSelectedDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
      updateTimerface({ days, hours, minutes, seconds });

      if (ms < 1000) {
        stop();
      }
    }, 1000);
  }
}

function stop() {
  isActive = false;
  clearInterval(intervalId);
}

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  startTimer();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

function updateTimerface({ days, hours, minutes, seconds }) {
  daysTimer.textContent = days;
  hoursTimer.textContent = hours;
  minutesTimer.textContent = minutes;
  secondsTimer.textContent = seconds;
}
