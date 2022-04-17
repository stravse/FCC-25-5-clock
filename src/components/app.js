import React, {useState, useEffect} from "react";

function App(){
    const [timerType, setTimerType] = useState("Session")
    const [rest, setRest] = useState(5);
    const [session, setSession] = useState(25);
    useEffect(()=>{
        setTotalSec(session * 60);
    },[session]);
    // useEffect above is SUSGE

    const [totalSec,setTotalSec] = useState(timerType === "Session"? session * 60: rest * 60);
    useEffect(() => {console.log(totalSec)}
    ,[totalSec]);

    let minute = Math.floor(totalSec/ 60);
    let sec = totalSec % 60;

    const [start, setStart] = useState(false);
    useEffect(() => {
        let interval = null;
        if(start){
            interval = setInterval(()=> {
                if (totalSec === 0 && timerType === "Session") {
                    setStart(false);
                    setTimerType("Break");
                    setTotalSec(rest * 60);
                } else if (totalSec === 0 && timerType === "Break") {
                    setStart(false);
                    setTimerType("Session");
                    setTotalSec(session * 60);
                }
                else {
                    setTotalSec(prevSec => prevSec - 1)
                }
            }, 1000);
        } else{
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    },[start, totalSec, rest, session, timerType]);


    

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
        setStart(false);
        setTotalSec(25*60);
        setRest(5);
        setSession(25);
        setTimerType("Session");
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
                <div id="time-left" className="display-timer">{minute.toString().length===1? "0"+minute.toString(): minute}:{sec.toString().length === 1? "0"+sec.toString(): sec}</div>
                <div className="button-container">
                    <button id="start_stop" onClick={start?stopTimer:startTimer}>play</button>
                    <button onClick={stopTimer}>pause</button>
                    <button id="reset" onClick={resetTimer}>reset</button>
                </div>
                
            </div>

        </div>
        
    );
}

export default App;