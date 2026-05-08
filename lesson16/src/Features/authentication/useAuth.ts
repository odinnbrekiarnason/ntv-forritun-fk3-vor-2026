
export type inputFields = {
  action: 'login' | 'signup';
  email: string;
  password: string;
  confirmPassword?: string;
}

export function useAuth(data: inputFields): boolean {
  const { action, email, password, confirmPassword }: Partial<inputFields> = data;
  
  if (action === 'login') {
    const userExists = localStorage.getItem(email);
    if (userExists) {
      const checkPassword = JSON.parse(userExists).password === password;
      if(!checkPassword) {
        window.alert('Incorrect email or password');
        return false;
      }
      window.alert('Login successful');
      return true
    }
  }

  if (action === 'signup') {
    if(password !== confirmPassword) {
      window.alert('Passwords do not match');
      return false;
    }
    if(localStorage.getItem(email)) {
      window.alert('User already exists on this email');
      return false;
    }
    localStorage.setItem(email, JSON.stringify({ email, password }));
    window.alert('Signup successful');
    
    return true;
  }
  window.alert('No action specified!');
  return false
} 
