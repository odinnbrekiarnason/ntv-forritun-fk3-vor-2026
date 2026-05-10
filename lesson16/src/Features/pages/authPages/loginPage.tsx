import { NavLink, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col gap-4 items-center justify-center">
      <header className="text-center">
        <h1 className="mb-3" >Login</h1>
        <p>Don't have an account? Sign up <NavLink to="/signup">here!</NavLink></p>
      </header>
      <nav>
        <button onClick={() => navTo(-1)}>Go to back</button>
      </nav>
      <Input type="email" value={inputs.email} onChange={(e) => handleInputChange(e, 'email')} />
      <Input type="password" value={inputs.password} onChange={(e) => handleInputChange(e, 'password')} />
      <main>
        <button
          type="submit"
          className="text-blue-500 border-2 hover:border-purple-500 hover:text-foreground"
          onClick={() => {
            const user = localStorage.getItem(inputs.email)
            if(!user) {
              window.alert('Incorrect email or password');
              return navTo('/login');
            }
            const parsedUser = JSON.parse(user);
            if(parsedUser.password !== inputs.password) {
              window.alert('Incorrect email or password');
              return navTo('/login');
            }
            window.alert('Login successful');
            return navTo('/welcome');
          }}
          >Submit</button>
      </main>
    </div>
  )
}