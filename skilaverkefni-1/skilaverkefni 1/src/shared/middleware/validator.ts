import * as z from 'zod'

type ValidationSuccess<T> = {
  success: true
  data: T
}

type ValidationFailure = {
  success: false
  errors: z.ZodIssue[]
  fieldErrors: Record<string, string[] | undefined>
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure

export const validateSchema = <TSchema extends z.ZodTypeAny>(schema: TSchema, data: unknown): 
ValidationResult<z.infer<TSchema>> => {
  const result = schema.safeParse(data)

  if (result.success) {
    return {
      success: true,
      data: result.data
    }
  }

  const flattened = z.flattenError(result.error)

  return {
    success: false,
    errors: result.error.issues,
    fieldErrors: flattened.fieldErrors
  }
}