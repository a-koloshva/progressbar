import './progressBarBlock.css';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const radius = 90;
let rotationAngle = 0;

let isRotating = false;
let isHide = false;
let animationId;

let start = 0;
let end = 0;
let direction;

const gradient = ctx.createLinearGradient(centerX, centerY - radius, centerX, centerY + radius);
gradient.addColorStop(0, '#4158d0');
gradient.addColorStop(1, '#c850c0');

const drawProgressBar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#dae6ec';
    ctx.lineWidth = 14;
    ctx.stroke();

    if (direction === 'up' && start < end) {
        start += 1;
    } else if (start > end) {
        start -= 1;
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * (start / 100));
    ctx.strokeStyle = '#005cff';
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 14;
    ctx.stroke();

    if (direction === 'up') {
        if (start < end) {
            requestAnimationFrame(drawProgressBar);
        }
    } else if (direction === 'down') {
        if (start > end) {
            requestAnimationFrame(drawProgressBar);
        }
    } else {
        cancelAnimationFrame(drawProgressBar);
    }
};

const moveProgressBar = () => {
    if (rotationAngle === 360) {
        rotationAngle = 0;
    } else {
        rotationAngle += 4;
    }
    canvas.style.transform = `rotate(${rotationAngle}deg)`;
    animationId = requestAnimationFrame(moveProgressBar);
};

const startProgressBar = () => {
    if (!isRotating) {
        isRotating = true;
        startButton.classList.add('toggle-btn_active');
        moveProgressBar();
    } else {
        isRotating = false;
        startButton.classList.remove('toggle-btn_active');
        cancelAnimationFrame(animationId);
    }
};

const hideProgressBar = () => {
    if (!isHide) {
        isHide = true;
        hideButton.classList.add('toggle-btn_active');
        canvas.classList.add('progress_hide');
    } else {
        isHide = false;
        hideButton.classList.remove('toggle-btn_active');
        canvas.classList.remove('progress_hide');
    }
};

const draw = (percentage) => {
    direction = end < percentage ? 'up' : 'down';
    end = Math.floor(+percentage);
    drawProgressBar();
};

export const progressBarControl = {
    drawProgressBar,
    startProgressBar,
    hideProgressBar,
    draw,
};
