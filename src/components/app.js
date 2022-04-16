import React, {useState, useEffect} from "react";

function App(){
    const [rest, setRest] = useState(5);
    const [session, setSession] = useState(25);
    useEffect(()=>{
        setTotalSec(session*60);
    },[session]);

    const [totalSec,setTotalSec] = useState(session*60);
    useEffect(() => {console.log(totalSec)}
    ,[totalSec]);

    let minute = Math.floor(totalSec/ 60);
    let sec = totalSec % 60;

    const [start, setStart] = useState(false);
    useEffect(() => {
        let interval = null;
        if(start){
            interval = setInterval(()=> {
                if (totalSec === 0) {
                    setStart(false);
                }else {
                    setTotalSec(prevSec => prevSec - 1)
                }
            }, 1000);
        } else{
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    },[start, totalSec]);


    

    function addSession(){
        setSession(prev => prev + 1);
    }
    function minSession(){
        if (session === 1){
            return;
        }
        setSession(prev => prev - 1);
    }

    function addRest(){
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
        setTotalSec(session*60);
    }

    return(
        <div className="true-container">
            <div className="main-container">

                <div className="container">
                    <div>{rest}</div>
                    <div className="button-container">
                        <button disabled={start? true: false} onClick={addRest}>add</button>
                        <button disabled={start? true: false} onClick={minRest}>reduce</button>
                    </div>
                </div>

                <div className="container">
                    <div>{session}</div>
                    <div className="button-container">
                        <button disabled={start? true: false} onClick={addSession}>add</button>
                        <button disabled={start? true: false} onClick={minSession}>reduce</button>
                    </div>
                </div>

            </div>

            <div className="timer-container">

                <div className="display-timer">{minute.toString().length===1? "0"+minute.toString(): minute}:{sec.toString().length === 1? "0"+sec.toString(): sec}</div>
                <div className="button-container">
                    <button onClick={startTimer}>play</button>
                    <button onClick={stopTimer}>pause</button>
                    <button onClick={resetTimer}>reset</button>
                </div>
                
            </div>

        </div>
        
    );
}

export default App;