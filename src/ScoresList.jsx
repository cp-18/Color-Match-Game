import { useState, useEffect } from "react";
import './ScoresList.css'

export default function ScoresList({ time, count, isCompleted }) {

    const [scores, setScores] = useState([]);

    const addScore = () => {
        setScores([...scores, `${count} clicks in ${time / 1000} seconds`]);
    }

    useEffect(() => {
        if (isCompleted) {
            addScore();
        }
    }, [isCompleted]);


    return (
        <>
            <ol>
                {scores.map(score => {
                    return (
                        <li key={score}> {score} </li>
                    )
                })}
            </ol>
        </>
    )
}