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
    <div className="App">
      {result !== null && <h1>{result}</h1>}
      <input type="number" value={input} onChange={e=> setInput(e.target.value)}></input>
      <button onClick={makeCall} disabled={input < 1 || input > 10}>Click</button>
     </div>
  );
}

export default App;