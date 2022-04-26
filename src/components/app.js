import React, {useState, useEffect} from "react";

function App(){
    const defaultRest = 5;
    const defaultSession = 25;
    const defaultTimerType = "Session";
    const defaultStart = false;
    const audioBeep = document.getElementById("beep");


    const [timerType, setTimerType] = useState(defaultTimerType);
    const [rest, setRest] = useState(defaultRest);
    const [session, setSession] = useState(defaultSession);
    useEffect(()=>{
        setTotalSec(timerType === "Session"? session * 60: rest * 60);
    },[session,timerType,rest]);
    // useEffect above is SUSGE

    const [totalSec,setTotalSec] = useState(timerType === "Session"? session * 60: rest * 60);

    const [start, setStart] = useState(defaultStart);
    useEffect(() => {
        let interval = null;
        if(start){
            interval = setInterval(()=> {
                if (totalSec === 0 && timerType === "Session") {
                    //when timer goes zero go directly to break and start timer
                    audioBeep.currentTime = 0;
                    audioBeep.play();
                    setTimerType("Break");
                    setTotalSec(rest * 60);
                } else if (totalSec === 0 && timerType === "Break") {
                    // when timer goes zero go directly to session and start timer
                    
                    audioBeep.currentTime = 0;
                    audioBeep.play();
                    setTimerType("Session");
                    setTotalSec(session * 60);
                }
                else {
                    if (totalSec < 0){
                        setTotalSec(prevSec => prevSec + 1)
                    } else {
                        setTotalSec(prevSec => prevSec - 1)
                    }
                }
            }, 10);
        } else{
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    },[start, totalSec, rest, session, timerType, audioBeep]);


    

    function addSession(){
        if (session === 60){
            return;
        }
        setSession(prev => prev + 1);
    }
    function minSession(){
        if (session === 1){
            return;
        }
        setSession(prev => prev - 1);
    }

    function addRest(){
        if (rest === 60){
            return;
        } 
        setRest(prev => prev + 1);
    }
    function minRest(){
        if (rest === 1) {
            return;
        }
        setRest(prev=> prev - 1);
    }
    function startTimer(){
       
        setStart(true);
    }
    function stopTimer(){
        setStart(false);
    }
    function resetTimer(){
        setStart(defaultStart);
        setRest(defaultRest);
        setSession(defaultSession);
        setTimerType(defaultTimerType);
        setTotalSec(defaultSession * 60);
        audioBeep.pause();
    }

    function digClock(){
        let minute = null;
        let sec = null;
        if (totalSec<0){
            let posTot = totalSec * -1;
            minute = Math.floor(posTot/ 60)
            sec = posTot % 60;
            sec = sec < 10 ? "0" + sec: sec;
            minute = minute< 10? "0" + minute: minute;
            return "-" + minute + ":" + sec;
        } else {
            minute = Math.floor(totalSec/ 60)
            sec = totalSec % 60;
            sec = sec < 10 ? "0" + sec: sec;
            minute = minute< 10? "0" + minute: minute;
            return minute + ":" + sec;
        }
    }

    return(
        <div className="true-container">
            <div className="main-container">
                <div className="container">
                    <div id="break-label">Break Length</div>
                    <div id="break-length">{rest}</div>
                    <div className="button-container">
                        <button id="break-increment" disabled={start? true: false} onClick={addRest}>add</button>
                        <button id="break-decrement" disabled={start? true: false} onClick={minRest}>reduce</button>
                    </div>
                </div>

                <div className="container">
                    <div id="session-label">Session Length</div>
                    <div id="session-length">{session}</div>
                    <div className="button-container">
                        <button id="session-increment" disabled={start? true: false} onClick={addSession}>add</button>
                        <button id="session-decrement" disabled={start? true: false} onClick={minSession}>reduce</button>
                    </div>
                </div>
            </div>

            <div className="timer-container">
                <div id="timer-label">{timerType}</div>
                <div id="time-left" className="display-timer">{digClock()}</div>
                <div className="button-container">
                    <button id="start_stop" onClick={start?stopTimer:startTimer}>play</button>
                    <button onClick={stopTimer}>pause</button>
                    <button id="reset" onClick={resetTimer}>reset</button>
                </div>
                
            </div>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>

        </div>
        
    );
}

export default App;