import { useState } from 'react'
import './App.css'
import { Input } from './components/Input'

function App() {
  const [myName, setMyName] = useState('Name')
  const [email, setEmail] = useState('Email')
  const list: [string] = [''];

  function checker(e: string, i: string): boolean {
      if(e.includes(i)) {
        alert('Success' + list);
        return true;
      }
      else {
        alert('Not success' + list); 
        return false;
      }
  }

  return (
    <>
      <form onSubmit={() => list.push(myName, email)}>
      <h2>hello world</h2>
      <div>{myName}</div>
      <div>{email}</div>
        <Input 
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
        /> 
        <div></div>
        <Input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <div></div>
        <button onClick={() => checker(email, '@')}>Submit</button>
      </form>
    </>
  )
}

export default App
