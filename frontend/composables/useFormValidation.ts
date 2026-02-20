import type { FormField, ValidationRule } from '~/types/form.types'

export const useFormValidation = () => {
  const validateField = (field: FormField, value: any): string[] => {
    const errors: string[] = []

    for (const rule of field.validations) {
      const error = applyRule(rule, value, field)
      if (error) errors.push(error)
    }

    return errors
  }

  const applyRule = (rule: ValidationRule, value: any, field: FormField): string | null => {
    switch (rule.type) {
      case 'required':
        if (value === null || value === undefined || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
          return rule.message
        }
        break
      case 'min':
        if (typeof value === 'number' && value < Number(rule.value)) {
          return rule.message
        }
        break
      case 'max':
        if (typeof value === 'number' && value > Number(rule.value)) {
          return rule.message
        }
        break
      case 'minLength':
        if (typeof value === 'string' && value.length < Number(rule.value)) {
          return rule.message
        }
        break
      case 'maxLength':
        if (typeof value === 'string' && value.length > Number(rule.value)) {
          return rule.message
        }
        break
      case 'pattern':
        if (typeof value === 'string' && rule.value) {
          const regex = new RegExp(String(rule.value))
          if (!regex.test(value)) return rule.message
        }
        break
      case 'email':
        if (typeof value === 'string' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) return rule.message
        }
        break
      case 'url':
        if (typeof value === 'string' && value) {
          try {
            new URL(value)
          } catch {
            return rule.message
          }
        }
        break
    }
    return null
  }

  const validateForm = (fields: FormField[], formData: Record<string, any>): Record<string, string[]> => {
    const errors: Record<string, string[]> = {}

    for (const field of fields) {
      const fieldErrors = validateField(field, formData[field.name])
      if (fieldErrors.length > 0) {
        errors[field.name] = fieldErrors
      }
    }

    return errors
  }

  const isFormValid = (errors: Record<string, string[]>): boolean => {
    return Object.values(errors).every(e => e.length === 0)
  }

  return { validateField, validateForm, isFormValid }
}
