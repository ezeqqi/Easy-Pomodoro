const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, paused, mins, seconds;

startBtn.addEventListener("click", () => {
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
        mins = +localStorage.getItem("focusTime") || 25;
    } else {
        mins = +localStorage.getItem("breakTime") || 5;
    }

    seconds = mins * 60;
    setTimeout(decrement(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

function decrement() {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        seconds --;
        initial = window.setTimeout("decrement()", 1000);
      } else {
        mins = 0;
        seconds = 0;
        bell.play();
        let btn = localStorage.getItem("btn");

        if (btn === "focus") {
            startBtn.textContent = "start break";
            startBtn.classList.add("break");
            localStorage.setItem("btn", "break");
        } else {
            startBtn.classList.remove("break");
            startBtn.textContent = "start focus";
            localStorage.setItem("btn", "focus");
        }
        startBtn.style.transform = "scale(1)"
    }
}