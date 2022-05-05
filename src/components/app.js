import React, {useState, useEffect, useRef} from "react";
import acccurateInterval from "./accurateInterval";
const SESSION = "Session";
const REST = "Rest";


function App(){
    const [rest, setRest] = useState(5 * 60); // saved in seconds
    const [session, setSession] = useState(25 * 60); // saved in seconds
    const [timerType, setTimerType] = useState(SESSION);
    const audioBeep = useRef();

    let timeNow = timerType === SESSION? session: rest; 
    let timedInts;

    
    const [start, setStart] = useState(false);
    useEffect(() => {
        if (start === true){
            let timeStart = Math.floor(Date.now() / 1000);
            if (timerType === "Session"){
                timedInts = setInterval(() => {
                    let timeNow = Math.floor(Date.now() / 1000);
                    if (timeNow > timeStart ){
                        timeStart = timeNow;
                    }
                }, 300)
            } else{
                timedInts = setInterval(() => {
                    let timeNow = Math.floor(Date.now() / 1000);
                    if (timeNow > timeStart ){
                        timeStart = timeNow;
                    }
                }, 300)
            }
            
        } else{
            clearInterval(timedInts);
        }
    },[start, timerType, timedInts]) // useffect for time interval hasnt been finished yet 
    // need to add a condition for timer type



    const mTimeFormat = (time) => {
        let minutes = Math.floor(time / 60);
        return minutes;
    }

    const mmssTimeFormat = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return (minutes < 10? "0"+minutes: minutes) + ":" + (seconds < 10? "0"+ seconds: seconds);
    }

    const changeTime = (value, type) =>{
        if (type === REST){
            if ((rest <= 60 && value < 0) || (rest === 60 * 60 && value > 0)){
                return
            }
            setRest(prev => prev + value);
        } else {
            if ((session <= 60 && value < 0) || (session === 60 * 60 && value > 0)){
                return
            }
            setSession(prev => prev + value);
        }
    }

    const handleBeep = (_time) =>{
        if (_time === 0){
            audioBeep.current.play();
        }
    }
    

    const startTimer = () => {
        setStart(prev => !prev)
        
    }
    const resetTimer = () => {
        setSession(25 * 60);
        setRest(5 * 60);
        setTimerType(SESSION);
        setStart(false);
        audioBeep.current.pause();
        audioBeep.current.currentTime = 0;
    }

    return(
        <div className="main-container">

            <div className="controller-container">
                <LengthTimer 
                title="Break Length"
                titleId="break-label"
                addId="break-increment"
                minId="break-decrement"
                timeId="break-length"
                timeFormat={mTimeFormat}
                time={rest}
                type={REST}
                changeTime={changeTime}
                disable={start}
                />
                <LengthTimer 
                title="Session Length"
                titleId="session-label"
                addId="session-increment"
                minId="session-decrement"
                timeId="session-length"
                timeFormat={mTimeFormat}
                time={session}
                type={SESSION}
                changeTime={changeTime}
                disable={start}
                />
            </div>
            <div className="controller">
                <div id="timer-label">{timerType === SESSION? "Session": "Break"}</div>
                <div id="time-left">{mmssTimeFormat(timeNow)}</div>
                <div className="button-control-container">
                    <button id="start_stop" className="changing-content" onClick={startTimer}>{start === true? "pause": "play"}</button>
                    <button id="reset" onClick={resetTimer}>reset</button>
                </div>
            </div>
            <audio 
                id="beep" 
                preload="auto" 
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                ref={audioBeep}
            />


        </div>
    )
}

function LengthTimer({title, titleId, addId, minId, timeId, timeFormat, time, type, changeTime, disable}){
    return(
        <div className="controller">
            <div id={titleId}>
                {title}
            </div>
            <div id={timeId}>{timeFormat(time)}</div>
            <div className="button-container">
                <button id={minId} onClick={() => changeTime(-60, type)} value="-" disabled={disable}>-</button>
                <button id={addId} onClick={() => changeTime(60, type)} value="+" disabled={disable}>+</button>
            </div>
        </div>
    )
}

export default App;