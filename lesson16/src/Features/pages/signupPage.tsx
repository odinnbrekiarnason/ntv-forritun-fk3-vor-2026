import { useNavigate } from "react-router-dom";
import Input from "./pageComponents/input";
import { useEffect, useState } from "react";


export function SignupPage() {
  const navTo = useNavigate();
  const [matcher, setMatcher] = useState<boolean | undefined>(undefined);
  
  type inputStates = {
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [inputs, setInputs] = useState<inputStates>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if(inputs.password.length !== 0 && inputs.confirmPassword.length !== 0) {
      const check = inputs.password === inputs.confirmPassword;
      if(!check) {
        setMatcher(false);
      } else {
        setMatcher(true);
      }
    } 
  }, [inputs.confirmPassword, inputs.password]);

  const handleInputChange = (value: string, key: keyof inputStates) => {
    setInputs((prevInputs) => ({ ...prevInputs, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1>Signup</h1>
      <button onClick={() => navTo('/')}>Go to home</button>
      <Input
        type="email"
        placeholder="Email"
        label="Email"
        value={inputs.email}
        onChange={(e) => handleInputChange(e, 'email')}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        value={inputs.password}
        onChange={(e) => handleInputChange(e, 'password')}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={inputs.confirmPassword}
        label={matcher === undefined ? 'Confirm Password' : matcher ? 'Passwords match' : 'Passwords do not match'}
        classname={matcher === undefined ? '' : matcher ? 'border-green-500' : 'border-red-500 bg-red-500/50'}
        onChange={(e) => handleInputChange(e, 'confirmPassword')}
      />
      <main>
        <button type="submit" className="text-muted-foreground hover:bg-muted hover:text-foreground" hidden={matcher === false && inputs.email.search('@') === -1}>
          Create account
        </button>
      </main>
    </div>
  )
}