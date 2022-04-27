import React, {useState, useEffect} from "react";


function App(){
    const [rest, setRest] = useState(5*60); // saved in seconds
    const [session, setSession] = useState(25*60); // saved in seconds
    const timeFormat = (time) => {
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
    return(
        <div>
            <LengthTimer 
            title="Break Length"
            titleId="break-label"
            addId="break-increment"
            minId="break-decrement"
            timeId="break-length"
            timeFormat={timeFormat}
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
            timeFormat={timeFormat}
            time={session}
            type="session"
            changeTime={changeTime}
            />

        </div>
    )
}

function LengthTimer({title, titleId, addId, minId, timeId,timeFormat, time, type, changeTime}){
    return(
        <div>
            <div id={titleId}>
                {title}
            </div>
            <div timeId>{timeFormat(time)}</div>
            <div>
                <button id={minId} onClick={() => changeTime(-60, type)} value="-">-</button>
                <button id={addId} onClick={() => changeTime(60, type)} value="+">+</button>
            </div>
        </div>
    )
}

export default App;