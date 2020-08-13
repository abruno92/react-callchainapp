import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState(1);
  const [result, setResult] = useState(null);

  const makeCall = useCallback(() => {
     fetch(`http://localhost:3001/person/${input}`).then(response => response.json()).then(data => {
      fetch(`http://localhost:3001/facility/${data.val1}`).then(response => response.json()).then(dataNext => {
        fetch(`http://localhost:3001/exposure/${data.val2}`).then(response => response.json()).then(d => {
          setResult(d.val5 * dataNext?.val3)
        })
      })
    })
  })

  return (
    <div class="container">
      <h2>Pick a number between 1 - 10:</h2>
      <div class="input-field">
          <input type="number" id="userinput" value={input} onChange={e=> setInput(e.target.value)}></input>
      </div>
      <button onClick={makeCall} disabled={input < 1 || input > 10}>Show Result</button>
       {result !== null && <div class="resultBox"><h1 class="result">{result}</h1></div>}
    </div>
  );
}

export default App;