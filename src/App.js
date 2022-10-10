import './App.css';
import './game/Rock';
import Rock from './game/Rock';
import React, {useState} from "react";
import axios from 'axios';


function App() {
  const [choices, setChoices] = useState([]);
  const [rootUrl, setRootUrl] = useState("https://codechallenge.boohma.com");
  
    const getChoices = () => {
      axios
          .get(`${rootUrl}/choices`)
          .then((res) => {
            setChoices(res.data)
          })
    }

    const resetChoices = () => {
      setChoices([]);
    }

    const handleSetRootUrl = (url) => {
      console.log(url);
      setRootUrl(url);
    }


  return (
    <div className="App">
      <Rock handleSetRootUrl= {handleSetRootUrl} rootUrl= {rootUrl} handleClick={getChoices} choices={choices} handleResetClick={resetChoices}>
      </Rock>

    </div>
  );
}

export default App;
