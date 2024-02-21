import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button[data-start]');
const selectedDates = document.querySelector('input#datetime-picker');
let userSelectedDate = null;
btnStart.disabled = true;

const fp = flatpickr(selectedDates, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    userSelectedDate = new Date(selectedDates[0]);
    const timeAtStart = Date.now();
    if (userSelectedDate > timeAtStart) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        close: true,
        timeout: 2000,
        closeOnClick: true,
        closeOnEscape: true,
      });
    }
  },
});

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.isActive = false;
    this.intervalId = null;
    this.userSelectedDate = userSelectedDate;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const ms = userSelectedDate - currentTime;
      const time = convertMs(ms);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    if (this.ms < 1000) {
      this.isActive = false;
      clearInterval(this.intervalId);
    }
  }
}

const timer = new Timer({
  onTick: updateTimerface,
});

btnStart.addEventListener('click', () => {
  timer.start();
  btnStart.disabled = true;
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
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;
}


