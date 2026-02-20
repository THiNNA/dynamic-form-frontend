import type { DynamicForm, FormField, ConditionalLogic } from '~/types/form.types'

export const useFormRenderer = (form: Ref<DynamicForm | null>) => {
  const formData = ref<Record<string, any>>({})
  const currentStep = ref(0)
  const submitted = ref(false)
  const submitting = ref(false)

  const initializeForm = () => {
    if (!form.value) return
    const data: Record<string, any> = {}
    for (const field of form.value.fields) {
      data[field.name] = field.defaultValue ?? null
    }
    formData.value = data
  }

  const evaluateCondition = (condition: ConditionalLogic): boolean => {
    const fieldValue = formData.value[condition.fieldName]
    switch (condition.operator) {
      case 'equals': return fieldValue === condition.value
      case 'not_equals': return fieldValue !== condition.value
      case 'contains': return String(fieldValue).includes(String(condition.value))
      case 'greater_than': return Number(fieldValue) > Number(condition.value)
      case 'less_than': return Number(fieldValue) < Number(condition.value)
      case 'is_empty': return !fieldValue || fieldValue === ''
      case 'is_not_empty': return !!fieldValue && fieldValue !== ''
      default: return true
    }
  }

  const isFieldVisible = (field: FormField): boolean => {
    if (field.hidden) return false
    if (!field.conditions || field.conditions.length === 0) return true

    for (const condition of field.conditions) {
      const result = evaluateCondition(condition)
      if (condition.action === 'show' && !result) return false
      if (condition.action === 'hide' && result) return false
    }
    return true
  }

  const isFieldDisabled = (field: FormField): boolean => {
    if (field.disabled) return true
    if (!field.conditions) return false

    for (const condition of field.conditions) {
      const result = evaluateCondition(condition)
      if (condition.action === 'disable' && result) return true
      if (condition.action === 'enable' && !result) return true
    }
    return false
  }

  const visibleFields = computed(() => {
    if (!form.value) return []
    return form.value.fields
      .filter(f => isFieldVisible(f))
      .sort((a, b) => a.order - b.order)
  })

  const steps = computed(() => form.value?.settings.steps || [])
  const totalSteps = computed(() => steps.value.length)
  const isMultiStep = computed(() => totalSteps.value > 1)

  const currentStepFields = computed(() => {
    if (!isMultiStep.value) return visibleFields.value
    const step = steps.value[currentStep.value]
    if (!step) return []
    return visibleFields.value.filter(f => step.fieldIds.includes(f.id))
  })

  const canGoNext = computed(() => currentStep.value < totalSteps.value - 1)
  const canGoPrev = computed(() => currentStep.value > 0)
  const isLastStep = computed(() => !isMultiStep.value || currentStep.value === totalSteps.value - 1)

  const nextStep = () => { if (canGoNext.value) currentStep.value++ }
  const prevStep = () => { if (canGoPrev.value) currentStep.value-- }

  const setFieldValue = (fieldName: string, value: any) => {
    formData.value[fieldName] = value
    // Apply set_value conditions
    if (form.value) {
      for (const field of form.value.fields) {
        if (field.conditions) {
          for (const condition of field.conditions) {
            if (condition.action === 'set_value' && evaluateCondition(condition)) {
              formData.value[field.name] = condition.targetValue
            }
          }
        }
      }
    }
  }

  watch(form, initializeForm, { immediate: true })

  return {
    formData,
    currentStep,
    submitted,
    submitting,
    visibleFields,
    currentStepFields,
    steps,
    totalSteps,
    isMultiStep,
    canGoNext,
    canGoPrev,
    isLastStep,
    nextStep,
    prevStep,
    setFieldValue,
    isFieldVisible,
    isFieldDisabled,
    initializeForm
  }
}
