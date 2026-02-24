import { useState } from 'react'
import './App.css'

function App() {
  const [myName, setMyName] = useState('Hjalti')
  const [email, setEmail] = useState('')
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //prump(e.target.value)
    //prump(e.target.value)
    //prump(e.target.value)
    //prump(e.target.value)
    setMyName(e.target.value)
  }

  return (
    <>
      <h2>hello world</h2>
      <div>myName</div>
      <div>{myName}</div>
      <div>
        <input
          type="text"
          value={myName}
          onChange={(e) => handleChange(e)}
        />
       <input
          type="email"
          //if email has no @ then show error message
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => alert("submitted:" +email)}>Submit</button>
      </div>

    </>
  )
}

export default App
