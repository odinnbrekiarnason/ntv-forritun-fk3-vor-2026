

export function Input({ value, onChange, } : {value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
  }

  return (
    <input
      type='text'
      placeholder={value}
      onChange={(e) => handleChange(e)}
    />
  )
} 
