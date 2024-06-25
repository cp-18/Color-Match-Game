import './App.css'
import GroupOfSquares from './GroupOfSquares'

//below: Predetermined set of colors to use. It is passed onto GroupOfSquares.jsx

const colorsArray = [
  "#52c3be",
  "#5ad1a7",
  "#FF8b13",
  "#Fcc70e",
  "#Ff5757",
  "#7ed957",
  "#Ff9a9a"
]

function App() {

  return (
    <div className="Rename">
      <img src="src/images/title.png" alt="" />
      <ol>
        <li>Click on the squares to change their color</li>
        <li>Match all 5 squares to stop the timer...and rosie stinks!!!!</li>
        <li>Aim for the least amount of clicks in the shortest time</li>
      </ol>
      <GroupOfSquares colorsArray={colorsArray} />
    </div>
  )
}

export default App
