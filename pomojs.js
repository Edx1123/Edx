const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountsDisplay = document.querySelector('.pomoCountsDisplay');


const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundcompleted = false; 
let totalCount = 0;
let paused = false;


const updateTitle = (msg) => {
    title.textContent = msg;
}

const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
}

const countDown = (time) => {
    return () => {
        const mins = Math.floor(time/60).toString().padStart(2, '0');
        const secs = Math.floor(time % 60).toString().padStart(2, '0');
        timer.textContent = `${mins} : ${secs}`;
        time--;
        if( time < 0){
            stopTimer();
            if(!oneRoundcompleted){
                timerID = startTimer(BREAK_TIME);
                oneRoundcompleted = true;
                updateTitle("It's Break Time!");

            }
            else{
                updateTitle("Succesfully completed 1 round of Pomodoro technique!");
                setTimeout(() => updateTitle("Start Timer Again!"), 3000);
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
            }
        }
    }
}
const startTimer = (startTime) => {
    if(timerID !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
}

const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

const getTimeInSeconds = (timeString) => {
    const[minutes, seconds] = timeString.split(":");
    return parseInt(minutes * 60) + parseInt(seconds) ; 
}

startBtn.addEventListener('click', ()=>{
    timerID = startTimer(WORK_TIME); 
    updateTitle("It's Study Time!");
});

resetBtn.addEventListener('click', ()=>{
    stopTimer();
    timer.textContent = "25:00";
    updateTitle("Click start to stat timer");
});

pauseBtn.addEventListener('click', ()=>{
    stopTimer();
    paused = true;
    updateTitle("Timer Paused");
});

resumeBtn.addEventListener('click', ()=>{
   if(paused){
        const currentTime = getTimeInSeconds(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;
        (!oneRoundcompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time")
   }
});


const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pompCounts"));
    console.log(counts);
     if(totalCount > 0){
        pomoCountsDisplay.style.display = "flex";
    } 
    pomoCountsDisplay.firstElementChild.textContent = totalCount;
}

showPomoCounts();