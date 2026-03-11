import type { FormValuesType } from "@/features/User/types"


export const onSubmitRef = (dataRef: React.RefObject<FormValuesType>) => {
  const { firstName, email } = dataRef.current
  localStorage.setItem(email, JSON.stringify(dataRef.current))
  window.alert(`Hello ${firstName}; email address ${email}`)
}

export const onSubmit = (data: FormValuesType) => {
  const {firstName, email} = data
  localStorage.setItem(email, JSON.stringify(data))
  window.alert(`Hello ${firstName}; email address ${email}`)
}