import { Counter } from './counter.js';

const counter = new Counter();
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');

incrementBtn.addEventListener('click', () => {
    counter.increment();
    counterDisplay.textContent = counter.getValue();
});