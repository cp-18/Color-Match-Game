import "./GroupOfSquares.css";
import Stopwatch from "./Stopwatch";
import Square from "./Square";
import { useState, useEffect } from "react";


/*below: the function randomPick accepts an array. "Index" creates a random number between 1 and the length of 
the array, which will be 7, since the array that will eventually be passed in is "colorsArray" which has 7 hexcodes. 
ColorsArray is passed via props from app.jsx. When RandomPick is called, it will return an element from that array, 
whose index is set to the random number chosen by "index."*/


function randomPick(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

/*below: The array of colors has been passed as a prop from app.jsx. GroupOfSquares uses 5 pieces of state, 
and one useEffect, which are also passed onto the Square component and Stopwatch component. 

To update the count for how many times the squares have been clicked, the first piece of state listed is to set the 
count. The second piece of state is to update the colors of the squares when clicked. 

The initial state of colors is "initialColors." This is the solution to the problem I was having when I first started 
this project--I needed to add an additional piece of state that would not change, but would be used to set the intial 
colors to start with. The function passed into useState is genRandomColors, which generates a random set of 5 colors 
with no repeats (which is why I had to create a copy of the array, an empty array for pushing onto, and use the "splice" 
logic there).

That's the only time initialColors is used, other than being passed to setColors in the reset function. 
The reset function also brings the count back to zero when the reset button in pressed.*/

export default function GroupOfSquares({ colorsArray }) {

    const genRandomColors = () => {
        let colorArrayCopy = [...colorsArray];

        let newArray = [];

        for (let i = 0; i < 5; i++) {
            let randNum = Math.floor(Math.random() * colorArrayCopy.length);
            let splicedItem = colorArrayCopy.splice(randNum, 1)[0]
            newArray.push(splicedItem);
        }
        return newArray;
    }

    genRandomColors(colorsArray);


    /* useState and useEffect logic ************************/

    const [count, setCount] = useState(0);
    const [initialColors] = useState(genRandomColors);
    const [colors, setColors] = useState(initialColors);

    // used this tutorial to help write this logic for the stopwatch: https://www.youtube.com/watch?v=sSWGdj8a5Fs

    const [timerOn, setTimerOn] = useState(false);
    //state pertaining to whether or not the timer is running
    const [time, setTime] = useState(0);
    //keeps track of # of ms our timer has been on

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timerOn])

    /************************************************ */

    /*above: this is the state/effect logic to control the stopwatch aspect of the game. setTimerOn detects whether the timer has be engaged or not.
    if timerOn is activated/set to true, setInterval logic is used to start keeping time (setTime), otherwise the interval is cleared and returns to null
    value. the return function at the end is extra precaution that timer ends up returning to zero. UseEffect is being used here becuase ......*/

    //useEffect runs every time the timerOn state changes

    const reset = () => {
        setCount(0);
        setColors(genRandomColors);
        setTime(0);
    };

    /*below: This is how multiple Square components are created. Rather than listing out 5 (or however many I want) and 
    repeating all of the props to be passed, the map function is used to map over "colors" and create these square components. 
    In my previous version I was using a loop to render these, but I also only had one piece of state that existed in the 
    Square component, so this has been reworked.

    For each color and index of colors, a square component is created with the props: key, color, and onClick, which holds the 
    logic for the onClick functionality (changing the square's color and updating the total count).

    OnClick{} is passed a function that does the following for a single square: setColors is passed an updater function. Passing 
    in its previous value, those values are spread into a new array called "next". Using "i" from the map function that created 
    the square, next[i] (this particular square) is set to randomPick(colorsArray)--which picks a new random color for the square 
    to be. Then next is returned. Additionally, an updater function in passed to setCount to update the count by one. */


    const squares = colors.map((color, i) => (
        <Square
            key={i}
            color={color}
            onClick={() => {
                setColors((prev) => {
                    const next = [...prev];
                    next[i] = randomPick(colorsArray);
                    return next;
                });
                setCount((prev) => prev + 1);
            }}
        />
    ));

    /* Below: logic for testing if all 5 squares have the same color. If so, the game stops; isCompleted is used to render the word "Matched!"
    in the return statement below if it's found to be true */

    const newSquares = squares.map((square) => {
        return square.props.color;
    });

    const allColorsEqual = function (newSquares) {
        return newSquares.every(val => val === newSquares[0]);
    }

    const isCompleted = allColorsEqual(newSquares);


    //below: The row of squares is rendered by passing {squares} into a div. Number of clicks is rendered by passing in {count}, and
    //reset button works by passing {reset} to onClick within the button element. PointerEvents disabled if isCompleted is true.

    return (
        <div className="Container">
            <Stopwatch
                Start={() => setTimerOn(true)}
                Stop={() => setTimerOn(false)}
                Time={time}
            />

            <div className="RowOfSquares" style={{ pointerEvents: isCompleted ? 'none' : 'auto' }} >{squares}</div>
            {isCompleted && <h3>Matched!</h3>}
            <div className="clicks">
                <div className="numClicks">
                    <span>{count} Clicks</span>
                </div>
                <button onClick={reset}>reset</button>
            </div>

        </div>
    );
}


