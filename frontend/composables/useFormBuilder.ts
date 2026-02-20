import type { DynamicForm, FormField, FieldType, FormSettings } from '~/types/form.types'

const generateId = () => crypto.randomUUID().replace(/-/g, '').slice(0, 9)

const defaultSettings: FormSettings = {
  submitButtonText: 'Submit',
  successMessage: 'Thank you! Your response has been submitted.',
  allowMultipleSubmissions: true,
  requireAuthentication: false,
  notifyOnSubmission: false,
  theme: 'default',
  layout: 'vertical'
}

export const useFormBuilder = () => {
  const form = ref<DynamicForm>({
    id: '',
    title: 'Untitled Form',
    description: '',
    slug: '',
    status: 'draft',
    fields: [],
    settings: { ...defaultSettings },
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1
  })

  const selectedFieldId = ref<string | null>(null)
  const isDirty = ref(false)

  const selectedField = computed(() =>
    form.value.fields.find(f => f.id === selectedFieldId.value) || null
  )

  const addField = (type: FieldType) => {
    const field: FormField = {
      id: generateId(),
      name: `field_${generateId()}`,
      label: `New ${type} field`,
      type,
      validations: [],
      order: form.value.fields.length,
      width: 'full'
    }
    form.value.fields.push(field)
    selectedFieldId.value = field.id
    isDirty.value = true
  }

  const removeField = (fieldId: string) => {
    form.value.fields = form.value.fields.filter(f => f.id !== fieldId)
    if (selectedFieldId.value === fieldId) selectedFieldId.value = null
    isDirty.value = true
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const idx = form.value.fields.findIndex(f => f.id === fieldId)
    if (idx !== -1) {
      form.value.fields[idx] = { ...form.value.fields[idx], ...updates }
      isDirty.value = true
    }
  }

  const reorderFields = (fromIndex: number, toIndex: number) => {
    const fields = [...form.value.fields]
    const [moved] = fields.splice(fromIndex, 1)
    fields.splice(toIndex, 0, moved)
    form.value.fields = fields.map((f, i) => ({ ...f, order: i }))
    isDirty.value = true
  }

  const selectField = (fieldId: string | null) => {
    selectedFieldId.value = fieldId
  }

  const updateFormSettings = (updates: Partial<DynamicForm>) => {
    Object.assign(form.value, updates)
    isDirty.value = true
  }

  const setForm = (newForm: DynamicForm) => {
    form.value = { ...newForm }
    isDirty.value = false
  }

  const resetForm = () => {
    form.value = {
      id: '',
      title: 'Untitled Form',
      description: '',
      slug: '',
      status: 'draft',
      fields: [],
      settings: { ...defaultSettings },
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    }
    selectedFieldId.value = null
    isDirty.value = false
  }

  const sortedFields = computed(() =>
    [...form.value.fields].sort((a, b) => a.order - b.order)
  )

  return {
    form,
    selectedFieldId,
    selectedField,
    isDirty,
    sortedFields,
    addField,
    removeField,
    updateField,
    reorderFields,
    selectField,
    updateFormSettings,
    setForm,
    resetForm
  }
}
