import { FormInput } from "lucide-react"
import type { HTMLInputTypeAttribute } from "react";


const inputTypes = {
  text: 'text',
  email: 'email',
  password: 'password'
} as const;

type InputProps = {
  type: keyof typeof inputTypes,
  classname?: string,
  label?: string,
  error?: string,
  value?: string,
  onChange: (value: string) => void
}


export function Input({type, classname, label, error, value, onChange, ...props}: InputProps) {
  const componentClass = `border rounded-md px-3 py-2 ${classname}`;

  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      {error && <span className="text-red-500 text-sm">{error}</span>}
        <input 
          className={componentClass} 
          type={inputTypes[type]} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
          />
    </div>
  )
}

export default Input;