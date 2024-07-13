
import { useState } from "react";
import "./PopUpWindow.css";



export default function PopUpWindow() {

    const [viewWindow, setViewWindow] = useState("true");

    const closeWindow = () => {
        setViewWindow(!viewWindow);
    }


    return (
        <>
            <div className={viewWindow ? "completedGame" : "closed"}>
                <img src="/Users/caitlinpomeroy/Desktop/NEW_PROJECTS/ReactGame/react-game/public/images/x.png" alt="x" id="close" onClick={closeWindow} />
                <img src="/Users/caitlinpomeroy/Desktop/NEW_PROJECTS/ReactGame/react-game/public/images/completed.gif" id="completed" alt="transcript: Great Job!" />
            </div>
        </>
    )
}