import type { CreateProjectInput } from "@/features/projects/types/CreateProjectType"
import type { CreateTaskInput } from "@/features/tasks/types/createTaskType"

export function handleInputChange(key: keyof CreateTaskInput | keyof CreateProjectInput, value: string, setInput: React.Dispatch<React.SetStateAction<CreateTaskInput & CreateProjectInput>>) {
  setInput(prev => ({...prev, [key]: value }))
  const result = setInput(prev => ({...prev, [key]: value }))
  return result
}