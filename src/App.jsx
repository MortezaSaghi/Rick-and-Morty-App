import { useState } from 'react'
import {allCharacters} from "./../public/data/data"
import './App.css'
// -------- import Components
import Navbar from './components/Navbar'
import CharacterList from './components/CharacterList'
import ChracterDetail from './components/ChracterDetail'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className='app'>
     <Navbar/>
     <div className="main">
       <CharacterList allCharacters={allCharacters}/>
       <ChracterDetail/>
     </div>
    </div>
  )
}

export default App
