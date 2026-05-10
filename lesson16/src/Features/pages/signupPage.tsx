import { useNavigate } from "react-router-dom";
import Input from "./pageComponents/input";
import { useEffect, useState } from "react";
import { Signup, type inputStates } from "../user/signup";



export function SignupPage() {
  const navTo = useNavigate();
  const [pwCheck, setPwCheck] = useState<boolean | undefined>(undefined);

  const [inputs, setInputs] = useState<inputStates>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    setTimeout(() => {
      if(inputs.email.search('@') === -1 && inputs.email.length >= 1) setPwCheck(false);
      
      if(inputs.password.length !== 0 && inputs.confirmPassword.length !== 0) {
        const check = inputs.password === inputs.confirmPassword;
          if(!check) {
            setPwCheck(false);
          } else {
            setPwCheck(true);
          }
        } else if(inputs.password.length >= 0 && inputs.confirmPassword.length === 0) {
          setPwCheck(true);
        }
      }, 500)
    }, []);
  

  const handleInputChange = (value: string, key: keyof inputStates) => {
    setInputs((prevInputs) => ({ ...prevInputs, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <header>
        <h1>Signup</h1>
      </header>
      <Input
        type="email"
        value={inputs.email}
        onChange={(e) => handleInputChange(e, 'email')}
      />
      <Input
        type="password"
        value={inputs.password}
        onChange={(e) => handleInputChange(e, 'password')}
      />
      <Input
        type="confirmPassword"
        value={inputs.confirmPassword}
        onChange={(e) => handleInputChange(e, 'confirmPassword')}
        error={pwCheck === false}
      />
      <main className="flex flex-col gap-4">
        <div className="flex justify-center">
          {pwCheck !== false &&
          <button
            type="submit"
            className="text-blue-500 border-2 rounded-4xl hover:border-purple-500 hover:text-foreground"
            onClick={() => {Signup(inputs) && navTo('/welcome')}}
          >
            Create account
          </button>
          }
        </div>
        <div className="flex justify-center">
          <button className="text-primary border-2 rounded-4xl hover:border-purple-500" onClick={() => navTo('/login')}>
            Already have an account? Log in here!
          </button>
        </div>
      </main>
    </div>
  )
}