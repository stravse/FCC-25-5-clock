import React, {useState, useEffect} from "react";


function App(){
    const [rest, setRest] = useState(5*60); // saved in seconds
    const [session, setSession] = useState(25*60); // saved in seconds
    const [timerType, setTimerType] = useState("Session");
    let timeNow = timerType === "Session"? session: rest; 
    const [start, setStart] = useState(false);
    let timedInts;
    useEffect(() => {
        if (start === true){
            let timeStart = Math.floor(Date.now()/1000);
            if (timerType === "Session"){
                timedInts = setInterval(() => {
                    let timeNow = Math.floor(Date.now()/1000);
                    if (timeNow > timeStart ){
                        timeStart = timeNow;
                    }
                }, 300)
            } else{
                timedInts = setInterval(() => {
                    let timeNow = Math.floor(Date.now()/1000);
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
        let minutes = Math.floor(time/60);
        return minutes;
    }

    const mmssTimeFormat = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return (minutes<10? "0"+minutes: minutes) + ":" + (seconds<10? "0"+ seconds: seconds);
    }

    const changeTime = (value, type) =>{
        if (type === "break"){
            if ((rest <= 60 && value < 0) || (rest === 60*60 && value > 0)){
                return
            }
            setRest(prev => prev + value);
        } else {
            if ((session <= 60 && value < 0) || (session === 60*60 && value > 0)){
                return
            }
            setSession(prev => prev + value);
        }
    }
    

    const startTimer = () => {
        setStart(prev => !prev)
        
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
                type="break"
                changeTime={changeTime}
                />
                <LengthTimer 
                title="Session Length"
                titleId="session-label"
                addId="session-increment"
                minId="session-decrement"
                timeId="session-length"
                timeFormat={mTimeFormat}
                time={session}
                type="session"
                changeTime={changeTime}
                />
            </div>
            <div className="controller">
                <div id="timer-label">{timerType === "Session"? "Session": "Break"}</div>
                <div id="time-left">{mmssTimeFormat(timeNow)}</div>
                <div className="button-control-container">
                    <button id="start_stop" className="changing-content" onClick={() => {startTimer()}}>{start === true? "pause": "play"}</button>
                    <button>reset</button>
                </div>
            </div>
            

        </div>
    )
}
//ecchi.iwara.tv/users/greeeeeenen
function LengthTimer({title, titleId, addId, minId, timeId, timeFormat, time, type, changeTime}){
    return(
        <div className="controller">
            <div id={titleId}>
                {title}
            </div>
            <div id={timeId}>{timeFormat(time)}</div>
            <div className="button-container">
                <button id={minId} onClick={() => changeTime(-60, type)} value="-">-</button>
                <button id={addId} onClick={() => changeTime(60, type)} value="+">+</button>
            </div>
        </div>
    )
}

export default App;