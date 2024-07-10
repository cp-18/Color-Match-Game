import "./MainGameContent.css";
import Stopwatch from "./Stopwatch";
import Square from "./Square";
import PopUpWindow from "./PopUpWindow";
import ScoresList from "./ScoresList";
import { useState, useEffect } from "react";


const colorsArray = [
    "#52c3be",
    "#5ad1a7",
    "#FF8b13",
    "#Fcc70e",
    "#Ff5757",
    "#7ed957",
    "#Ff9a9a"
]


/*below: the function randomPick accepts an array. "Index" creates a random number between 1 and the length of 
the array, which will be 7, since the array that will eventually be passed in is "colorsArray" which has 7 hexcodes. 
ColorsArray is passed via props from app.jsx. When RandomPick is called (in the Square component), it will return an 
element from that array, whose index is set to the random number chosen by "index."*/
function randomPick(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

/* genRandomColors will return newArray, which is an array of 5 random colors pulled from the colorsArray, 
with no repeats. The state of "initialColors" uses genRandomColors to set up the initial 5 squares, and the colors
for each square starts off with what is generated for "initialColors." How the splice part works (to get an array 
with no repeating colors), is that it uses a for loop to create a random number 1-7 (from colorArrayCopy), then 
[splicedItem] is using the splice method to basically cut out that random number from colorsArrayCopy and then push 
it onto newArray. This happens 5 times  */
const genRandomColors = (colorsArray) => {
    const colorArrayCopy = [...colorsArray];
    const newArray = [];

    for (let i = 0; i < 5; i++) {
        const randNum = Math.floor(Math.random() * colorArrayCopy.length);
        const [splicedItem] = colorArrayCopy.splice(randNum, 1);
        newArray.push(splicedItem);
    }
    return newArray;
};

/*allColorsEqual is a function that accepts 'colors' (useState declared withing GroupOfSquares). 
Uses the .every array method. This method uses a callback function (to execute for each element 
in the array) where you must pass in the element being processed (color), but can also pass 
in the index and array. By also passing arr into parameters, I can check if each color is 
equal to arr[0]. */
const allColorsEqual = (colors) =>
    colors.every((color, i, arr) => color === arr[0]);


/*below:

count/setCount-- to update the count for how many times the squares have been clicked, the first
piece of state listed is to set the count. 

initialColors --the initial state of colors. This is the solution to the problem I was having when I first started 
this project--I needed to add an additional piece of state that would not change, but would be used to set the intial 
colors to start with. The function passed into useState is genRandomColors, which generates a random set of 5 colors 
with no repeats (which is why I had to create a copy of the array, an empty array for pushing onto, and use the "splice" 
logic there). That's the only time initialColors is used, other than being passed to setColors in the reset function. 

colors/setColors--setting/updating the colors of the individual squares. 

timerOn/setTimerOn--setTimerOn detects whether the timer has be engaged or not.  

isCompleted/setIsCompleted--compute the initial value from the initial colors state value. state is set to a fuction, 
which is the allColorsEqual function declared above (colors is passed to it). Because all colors will not be equal when 
this is first rendered, essentially isCompleted is initially set to false. useEffect below will change this to true
when they are all equal.

** remember: useEffect runs with every render of the component; renders initially when it first loads, but also renders 
whenever the state changes. Dependencies tell useEffect to work when just those things change/rerender **
*/
export default function MainGameContent() {
    const [count, setCount] = useState(0);
    const [initialColors] = useState(() => genRandomColors(colorsArray));
    const [colors, setColors] = useState(initialColors);
    const [isCompleted, setIsCompleted] = useState(
        () => allColorsEqual(colors)
    );
    const [timerOn, setTimerOn] = useState(false);
    const [time, setTime] = useState(0);


    /*compute and update the isCompleted state when the colors state updates. The allColorsEqual 
    function will be passed into setIsCompleted, checking if all five boxes are the same color--which 
    results in a true or false value. So essentially if that runs and they are not the same value, 
    setIsCompleted is set to 'false'*/
    useEffect(() => {
        setIsCompleted(allColorsEqual(colors));
    }, [colors]);

    //hook to end the timer when the isCompleted state is true
    useEffect(() => {
        if (isCompleted) {
            setTimerOn(false);
        }
    }, [isCompleted]);


    /* If timerOn is activated/set to true, setInterval logic is used to start keeping time (setTime), 
    otherwise the interval is cleared and returns to null value. When any square is clicked, this sets 
    timer on to be true (see Square props) */
    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);


    /*Resets click count and timer to zero, stop the timer from running, and
    generates a new random array of colors */
    const reset = () => {
        setCount(0);
        setColors(genRandomColors(colorsArray));
        setTime(0);
        setTimerOn(false);
    };

    /* below: This is how multiple Square components are created. Rather than listing out 5 (or however many I want) and 
    repeating all of the props to be passed, the map function is used to map over "colors" and create these square components. 
    In my previous version I was using a loop to render these, but I also only had one piece of state that existed in the 
    Square component, so this has been reworked.
    
    "Colors" is mapped over to create a square for each of them. Parameters are the element being mapped and its index. Each 
    square passed the props key, color, and onClick (which contains a function). Within that function, there is an updater 
    function to update the count, and setTimerOn is set to true (so right away when any square is clicked the timer begins). Also
    to update the colors when clicked, a map function is passed to setColors. Again, colors is being mapped over, and it will 
    update that square and ONLY that square (hence index === i) with a new random color */


    return (
        <>

            <div className="gameContainer">
                {isCompleted &&
                    <PopUpWindow />}
                <Stopwatch
                    time={time} />
                <div
                    className="rowOfSquares"
                    style={{ pointerEvents: isCompleted ? "none" : "auto" }}
                >
                    {colors.map((color, i) => (
                        <Square
                            key={i}
                            color={color}
                            onClick={() => {
                                setColors((colors) =>
                                    colors.map((color, index) =>
                                        index === i ? randomPick(colorsArray) : color
                                    )
                                );
                                setCount((count) => count + 1);
                                setTimerOn(true);
                            }}
                        />
                    ))}
                </div>
                <div className="clicksContainer">
                    <div className="clicksDisplay">
                        <span id="numClicks">{count} Clicks</span>
                    </div>
                    <button onClick={reset}>reset</button>
                </div>
                <ScoresList time={time} count={count} isCompleted={isCompleted} />

            </div>
        </>
    );
}
