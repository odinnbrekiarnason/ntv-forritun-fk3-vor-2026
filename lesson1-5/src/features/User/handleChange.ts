import type { FormValuesType } from "@/features/User/types"
import { useCallback } from "react"

   
   
export const handleRefChange = useCallback((dataRef: React.RefObject<FormValuesType>, key: keyof FormValuesType, value: string) => {
  dataRef.current[key] = value 
}, [])

export const handleStateChange = useCallback((data: FormValuesType, key: keyof FormValuesType, value: string) => {
  data[key] = value
}, [])