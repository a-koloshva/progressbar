import './controlBlock.css';
import { progressBarControl } from '../ProgressBarBlock/progressBarBlock';

export default function initProject() {
    const lengthInput = document.querySelector('#lengthInput');
    const startButton = document.querySelector('#startButton');
    const hideButton = document.querySelector('#hideButton');

    startButton.addEventListener('click', progressBarControl.startProgressBar);
    hideButton.addEventListener('click', progressBarControl.hideProgressBar);

    let time;

    lengthInput.addEventListener('input', () => {
        clearTimeout(time);
        if (lengthInput.value > 100) {
            lengthInput.value = 100;
        } else if (lengthInput.value < 0) {
            lengthInput.value = 0;
        }
        time = setTimeout(() => {
            progressBarControl.draw(lengthInput.value);
        }, 400);
    });

    progressBarControl.draw(lengthInput.value);
}
