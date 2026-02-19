import { useState } from 'react'
import './App.css'

function App() {
  const [myName, setName] = useState('UserName');
  const [email, setEmail] = useState('Email');

  return (
    <>
      <h1>Hello World</h1>
      <div className="card">
        <div> Name <input type='text' value={myName} onChange={(e) => setName(e.target.value)}></input></div>
        <div> Email <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input></div>
        <div> <button onClick={() => alert(`${myName} and ${email} have been submitted` ) }>Submit</button></div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
