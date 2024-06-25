
import "./Square.css";


export default function Square({ color, onClick }) {

    //below: the logic for onClick is passed from GroupOfSquares, as is color. Background color of the
    //individual square is set to color.


    return (
        <div
            onClick={onClick}
            className="Square"
            style={{ backgroundColor: color }}
        ></div>
    )
}