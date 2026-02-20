import { defineAsyncComponent } from 'vue'
import type { FieldType } from '~/types/form.types'

export const fieldRegistry: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  text: defineAsyncComponent(() => import('./TextField.vue')),
  email: defineAsyncComponent(() => import('./TextField.vue')),
  password: defineAsyncComponent(() => import('./TextField.vue')),
  color: defineAsyncComponent(() => import('./TextField.vue')),
  textarea: defineAsyncComponent(() => import('./TextareaField.vue')),
  number: defineAsyncComponent(() => import('./NumberField.vue')),
  select: defineAsyncComponent(() => import('./SelectField.vue')),
  'multi-select': defineAsyncComponent(() => import('./MultiSelectField.vue')),
  radio: defineAsyncComponent(() => import('./RadioField.vue')),
  checkbox: defineAsyncComponent(() => import('./CheckboxField.vue')),
  date: defineAsyncComponent(() => import('./DateField.vue')),
  datetime: defineAsyncComponent(() => import('./DateField.vue')),
  time: defineAsyncComponent(() => import('./DateField.vue')),
  file: defineAsyncComponent(() => import('./FileField.vue')),
  image: defineAsyncComponent(() => import('./FileField.vue')),
  toggle: defineAsyncComponent(() => import('./ToggleField.vue')),
  slider: defineAsyncComponent(() => import('./SliderField.vue')),
  rating: defineAsyncComponent(() => import('./RatingField.vue')),
  group: defineAsyncComponent(() => import('./GroupField.vue')),
  repeater: defineAsyncComponent(() => import('./RepeaterField.vue'))
}

export const getFieldComponent = (type: FieldType) => {
  return fieldRegistry[type] || fieldRegistry['text']
}
