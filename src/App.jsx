import { useEffect, useState , useRef } from 'react'
import './App.css'

function App() {

  const TIME = 30
  
const [words,setWords] = useState("");
const [isStarted , setIsStarted] = useState(false);
const [count,setCount] = useState(0);
const [timeRemaining , setTimeRemaining] =useState(TIME);
const textRef = useRef(null);

const handleChange = (event)=> {
  const {value} = event.target;
  setWords(value);

}

const calculateWords = ()=> {
  const numWords = words.replace( /\s\s+/g, ' ' ).split(" ").length;
  setCount(numWords);
}

useEffect(()=> {
    if( isStarted && timeRemaining > 0){
      textRef.current.focus()
      setTimeout(handleTime, 1000)
    } else if( timeRemaining === 0){
      endGame()
    }
} , [timeRemaining,isStarted])

const handleTime = () => {

      setTimeRemaining(prevState => prevState -1);
  }

const startGame = ()=>{
  setIsStarted(true);
  setCount(0);
  setTimeRemaining(TIME);
  setWords("");
  

}

const endGame = () => {
  setCount(calculateWords);
  setIsStarted(false);
}

  return (
    <div className='container'>
      <h1 className='header' >How fast do you type?</h1>
      <textarea ref={textRef} disabled={!isStarted} onPaste={(e)=>e.preventDefault()}  className='textarea' name="words" onChange={(e)=>handleChange(e)} value={words} />
      <h3 className='time-remaining' >Time remaining: {timeRemaining}</h3>
      <button disabled={isStarted} onClick={startGame} className='btn'>start</button>
      {
        
        timeRemaining===0 && <h2 className='result'>Word Count: {count}</h2>
      }
    </div>
  )
}

export default App
