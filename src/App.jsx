import './App.css'
import MainGameContent from './MainGameContent'


function App() {

  return (
    <>
      <div className="container">
        <div className="gameBackground">
          <img src="/images/title.png" alt="transcript: Color Match" id="gameTitle" />
          <MainGameContent />
        </div>
      </div>
    </>
  )
}

export default App
