import { useEffect, useState } from "react"


function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('timeout')
      setDebounceValue(value);
    }, delay);
    return (
      clearTimeout(30)
    )
  }, [value, delay])
}