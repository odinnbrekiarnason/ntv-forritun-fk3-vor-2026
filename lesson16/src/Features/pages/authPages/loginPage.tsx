import { useNavigate } from "react-router-dom";
import Input from "../pageComponents/input";
import { useState } from "react";

export function LoginPage() {
  const navTo = useNavigate();

  type inputStates = {
    email: string;
    password: string;
  }

  const [inputs, setInputs] = useState<inputStates>({
    email: '',
    password: ''
  })

  const handleInputChange = (value: string, key: keyof inputStates) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1>Login</h1>
        <p>Don't have an account? <button className="text-primary" onClick={() => navTo('/signup')}>Sign up here!</button></p>
      </header>
      <nav>
        <button onClick={() => navTo('/')}>Go to home</button>
      </nav>
      <Input type="email" value={inputs.email} onChange={(e) => handleInputChange(e, 'email')} />
      <Input type="password" value={inputs.password} onChange={(e) => handleInputChange(e, 'password')} />
    </div>
  )
}