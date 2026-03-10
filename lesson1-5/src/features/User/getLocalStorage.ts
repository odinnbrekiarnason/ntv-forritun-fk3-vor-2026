import type { FormValuesType } from "@/features/User/types"
import { useCallback } from "react"


export const getLocalStorageRef = useCallback((emailRef: React.RefObject<HTMLInputElement> ) => {
  if (emailRef.current && emailRef.current.value) {
    const localStorageValue = localStorage.getItem(emailRef.current?.value)
    if (localStorageValue) {
      const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue)
      window.alert(parsedLocalStorageValue.firstName)
      emailRef.current.value = ''
      return parsedLocalStorageValue
    } else {
      window.alert('Email not found')
    }
  } else {
    window.alert('Some bug was found!')
  }
}, [])


export const getLocalStorage = useCallback((data: FormValuesType) => {
  if (data && data.email) {
    const localStorageValue = localStorage.getItem(data?.email)
    if (localStorageValue) {
      const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue)
      window.alert(parsedLocalStorageValue.firstName)
      data.email = ''
      return parsedLocalStorageValue
    } else {
      window.alert('Email not found')
    }
  } else {
    window.alert('Some bug was found!')
  }
}, [])