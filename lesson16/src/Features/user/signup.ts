

export type inputStates = {
    email: string;
    password: string;
    confirmPassword: string;
  }

export function Signup(data: Pick<inputStates, 'email' | 'password'>): boolean {
  const {email, password} = data;
  const userExists = localStorage.getItem(email);

  if(userExists) {
    window.alert('User already exists on this email');
    return false;
  }

  localStorage.setItem(email, JSON.stringify({email, password}));
  return true;
}