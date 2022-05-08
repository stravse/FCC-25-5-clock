import React, {useState, useEffect} from "react";


const SESSION = "Session";
const REST = "Break";
const red = {color: "red"};
const white = {color: "white"};


function App(){
    const [rest, setRest] = useState(5 * 60); // saved in seconds displayed in setting break tim
    const [session, setSession] = useState(25 * 60); // saved in seconds displayed in setting session time
    const [timerType, setTimerType] = useState(SESSION);
    const [timeNow, setTimeNow] = useState(25 * 60); // used for displaying timeLeft
    const [playTimer, setPlayTimer] = useState(false);
    let timeout;
    

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
            if ((rest <= 60 && value < 0) || (rest === 60 * 60 && value > 0) || playTimer){
                return
            }
            setRest(prev => prev + value);
        } else {
            if ((session <= 60 && value < 0) || (session === 60 * 60 && value > 0) || playTimer){
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
        audioBeep.volume = 0.5;
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
            timeout = setTimeout(() => {
                if (playTimer && timeNow) {
                    setTimeNow(timeNow - 1);
                }
            }, 1000);
            resetTimer();
        } else{
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        clock();
    }, [playTimer, timeout, timeNow]); // timeout will become an interval since timenow will be reduced by clock and will be called when timenow will be reduced like an infinite loop

    return(
        <div className="main-container">
            <div className="title-container">
                <h1 className="title">25 + 5 Clock</h1>
            </div>
            <div className="body-container">
                
                <div className="controller timer-wrapper">
                    <div className="length-title big-title" id="timer-label" style={timeNow<60? red: white}>{timerType === SESSION? "Session": "Break"}</div>
                    <div className="time big-time" id="time-left" style={timeNow<60? red: white}>{mmssTimeFormat(timeNow)}</div>
                    <div className="button-control-container">
                        <button className="control-button" id="start_stop" onClick={startTimer}>{playTimer === true? <i className="bi bi-pause-circle"></i>: <i className="bi bi-play-circle"></i>}</button>
                        <button className="control-button" id="reset" onClick={handleReset}><i className="bi bi-arrow-repeat"></i></button>
                    </div>
                </div>

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

                <audio 
                id="beep" 
                preload="auto" 
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
            </div>

        </div>
    )
};

function LengthTimer({title, titleId, addId, minId, timeId, timeFormat, time, type, changeTime, disable}){
    return(
        <div className="controller">
            <div className="length-title" id={titleId}>
                {title}
            </div>
            <div className="time-container">
                <div className="adjust-button" id={minId} onClick={() => changeTime(-60, type)} value="-" disabled={disable}><i className="bi bi-arrow-down-circle"></i></div>
                <div className="time" id={timeId}>{timeFormat(time)}</div>
                <div  className="adjust-button"  id={addId} onClick={() => changeTime(60, type)} value="+" disabled={disable}><i className="bi bi-arrow-up-circle"></i></div>
            </div>
        </div>
    )
}

export default App;