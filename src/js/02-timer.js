import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

let selectedDate = null;
let currentDate = null;

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }

  start(selectedDate, currentDate) {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    updateTimer(selectedDate - currentDate);
    currentDate += 1000;

    this.intervalId = setInterval(() => {
      let remainder = selectedDate - currentDate;
      currentDate += 1000;
      updateTimer(remainder);
    }, 1000);
    Notiflix.Notify.success('Timer started');
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer();

const dataTime = document.getElementById('datetime-picker');
const options = {
  theme: 'material_red',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    refs.btnStart.disabled = false;
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (selectedDate < currentDate) {
      refs.btnStart.disabled = true;
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

const updateTimer = remainder => {
  const time = timer.convertMs(remainder);
  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
};

const onStartBtnClick = () => {
  //   updateTimer(remainder);
  timer.start(selectedDate, currentDate);

  refs.btnStart.disabled = true;
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
flatpickr(dataTime, options);
refs.btnStart.addEventListener('click', onStartBtnClick);
