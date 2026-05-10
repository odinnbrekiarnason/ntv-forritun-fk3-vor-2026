const inputTypes = {
  text: 'text',
  email: 'email',
  password: 'password',
  confirmPassword: 'Confirm Password'
} as const;

type InputProps<T extends keyof typeof inputTypes> = {
  type: T;
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
}


export function Input<T extends keyof typeof inputTypes>({type, value, onChange, ...props}: InputProps<T>) {
  const componentClass = `border rounded-md px-3 py-2`;

  if(type === 'confirmPassword') {
    const error = props.error;
    const compClass = [
      "border rounded-md px-3 py-2 focus:outline-none focus:ring-2",error ? 
      "border-red-500 focus:border-red-500 focus:ring-red-200" : 
      "focus:border-blue-500 focus:ring-blue-200"].join(" ");
    
    return (
      <div>
        <label className={error ? "block mb-1 text-red-500" : "block mb-1"}>{error ? 'Passwords Do Not Match' : 'Confirm Password'}</label>
        <input 
          placeholder={`Confirm Password`}
          className={compClass}
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
          />
      </div>
    )
  } 
  else return (
    <div>
       <label className="block mb-1">{type}</label>
        <input 
          placeholder={`input ${type}`}
          className={componentClass }
          type={inputTypes[type] || 'text'} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
          />
    </div>
  )
}

export default Input;