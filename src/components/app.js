import React, {useState, useEffect} from "react";

const SESSION = "Session";
const REST = "Break";


function App(){
    const [rest, setRest] = useState(5 * 60); // saved in seconds displayed in setting break tim
    const [session, setSession] = useState(25 * 60); // saved in seconds displayed in setting session time
    const [timerType, setTimerType] = useState(SESSION);
    const [timeNow, setTimeNow] = useState(25 * 60); // used for displaying timeLeft
    const [playTimer, setPlayTimer] = useState(false);

    let timeout = setTimeout(() => {
        if (playTimer && timeNow) {
            setTimeNow(timeNow - 1);
        }
    }, 1000);

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
            setTimeNow(prev => prev + value);
        }
    }
    
    const startTimer = () => {
        clearTimeout(timeout);
        setPlayTimer(prev => !prev)
        
    }

    const handleReset = () => {
        setSession(25 * 60);
        setRest(5 * 60);
        setTimeNow( 25 * 60);
        setTimerType(SESSION);
        setPlayTimer(false);
        const audioBeep = document.getElementById("beep");
        audioBeep.pause();
        audioBeep.currentTime = 0;
        clearTimeout(timeout);
    }

    const resetTimer = () => {
        const audioBeep = document.getElementById("beep");
        if(!timeNow && timerType === SESSION){
            setTimeNow(rest);
            setTimerType("Break");
            audioBeep.play()
        } else if (!timeNow && timerType === REST) {
            setTimeNow(session);
            setTimerType("Session");
            audioBeep.play()
        }
    }

    const clock = () => {
        if (playTimer){
            timeout;
            resetTimer();
        } else{
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        clock()
    }, [playTimer, timeout, timeNow]);

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
                disable={playTimer}
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
                disable={playTimer}
                />
            </div>
            <div className="controller">
                <div id="timer-label">{timerType === SESSION? "Session": "Break"}</div>
                <div id="time-left">{mmssTimeFormat(timeNow)}</div>
                <div className="button-control-container">
                    <button id="start_stop" className="changing-content" onClick={startTimer}>{playTimer === true? "pause": "play"}</button>
                    <button id="reset" onClick={handleReset}>reset</button>
                </div>
            </div>
            <audio 
                id="beep" 
                preload="auto" 
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />


        </div>
    )
};

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