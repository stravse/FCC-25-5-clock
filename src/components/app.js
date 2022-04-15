import React, {useState} from "react";

function App(){
    const [rest, setRest] = useState(5);
    const [session, setSession] = useState(25);

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

    return(
        <div className="true-container">
            <div className="main-container">
                <div className="container">
                    <div>{rest}</div>
                    <div className="button-container">
                        <button onClick={addRest}>add</button>
                        <button onClick={minRest}>reduce</button>
                    </div>
                </div>
                <div className="container">
                    <div>{session}</div>
                    <div className="button-container">
                        <button onClick={addSession}>add</button>
                        <button onClick={minSession}>reduce</button>
                    </div>
                </div>
            </div>

            <div className="timer-container">
                <div className="display-timer">{session}</div>
                <div className="button-container">
                    <button>play</button>
                    <button>pause</button>
                    <button>reset</button>
                </div>
            </div>

        </div>
        
    );
}

export default App;