import './Stopwatch.css';

export default function Stopwatch({ Start, Time, Stop }) {

    return (

        <div>
            <div>
                <span>{("0" + Math.floor((Time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((Time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((Time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="buttons">
                <button onClick={Start}>start</button>
                <button onClick={Stop}>stop</button>
            </div>
        </div>
    );
}