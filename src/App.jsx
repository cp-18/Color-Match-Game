import './App.css'
import MainGameContent from './MainGameContent'


function App() {

  return (
    <>
      <div className="container">
        <div className="gameBackground">
          <img src="/Users/caitlinpomeroy/Desktop/NEW_PROJECTS/ReactGame/react-game/public/images/title.png" alt="transcript: Color Match" id="gameTitle" />
          <MainGameContent />
        </div>
      </div>
    </>
  )
}

export default App
