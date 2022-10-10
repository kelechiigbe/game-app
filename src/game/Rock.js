import './Rock.css';
import axios from 'axios';
import React, {useState} from "react";


  function Rock(props){

    const [choice, setChoice] = useState({});
    const [scores, setScores] = useState([]);

    function playGame(selectedChoice){
      console.log(selectedChoice);
      axios
      .post(`${props.rootUrl}/play`, {Player: selectedChoice.id})
      .then((res) => {
        console.log(res.data);
        setScores(scores => [...scores, res.data]);
        setChoice(res.data)
        console.log(scores);

      })
    }

    const [randomChoice, setRandomChoice] = useState([]);
  
    const getRandomChoice = () => {
      axios
          .get(`${props.rootUrl}/choice`)
          .then((res) => {
            setRandomChoice(res.data)
          })
    }

    const resetGame = () => {
      setChoice({});
      setScores([]);
      props.handleResetClick()
    }

   const handleInputChange = (e) => {
     props.handleSetRootUrl(e.target.value);
  }

    return (
      <div>
        <h1>Rock Paper Scissors Lizard Spock</h1>
      <p>
        This is a mock front-end to test your RPSLS API against.
      </p>
      <h3>Step 1: Put your root URL here</h3>
      <input name="rootUrl" onChange={(e) => {handleInputChange(e)}} style={{width:"300px"}}
        type="text"
        value={props.rootUrl}
      />
      <h3>Step 2: Populate choices from the /choices endpoint</h3>
      <button onClick={props.handleClick}>
        Click me!
      </button>
      <div>
        <ul style={{listStyleType:"none"}}>
          {
            props.choices.map((choice) => (
              <li key={choice.id}>
               <button onClick={()=> playGame(choice)}>{choice.name}</button> 
              </li>
  
            ))}
        </ul>
      </div>
      <h3
        >Step 3: Click an above choice to play against the computer with the /play
        endpoint</h3
      >
      <div>
       
        {
          choice?.player ? <p>You played {props.choices[choice.player -1]?.name} & the computer played {props.choices[choice.computer - 1]?.name}. You {choice.results}</p> : ""
        }
        <p>
          {
             choice?.player ? <button onClick={resetGame}>  Reset Game!</button> : ""
          }
        </p>
      </div>
      <h3>Random Choice</h3>
      <div id="choice">
        <button onClick={getRandomChoice}>
          Get Random Choice from /choice endpoint
        </button>
        <p>{randomChoice?.name}</p>
      </div>
      <button
        id="butwhy"
        onClick={()=> alert('We just want to keep it nice and lo-fi :)')}
      >
        But why this ugly page?
      </button>
    
      {
      scores.length ? <div>
       <hr />
      <h4 style={{color:"red"}}>My Score Board</h4>
      <ul style={{listStyleType:"none"}}>
          {
            scores.map((score, index) => (
              <li key={index}>
              <p>You played {props.choices[score.player -1]?.name} & the computer played {props.choices[score.computer - 1]?.name}. You {score.results}</p>
              </li>
  
            ))}
            {

              <div>
                <h4>Game Summary</h4>
                You played: {scores.length} (times). You won {scores.filter(s => s.results == 'win').length} and You lose {scores.filter(s => s.results == 'lose').length}
              </div>
            }
        </ul>
 
      </div> : ""
    }
      </div>
    );
  }


export default Rock;