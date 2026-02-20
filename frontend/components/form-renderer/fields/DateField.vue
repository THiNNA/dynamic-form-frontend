<template>
  <div>
    <input
      :id="field.id"
      :type="inputType"
      :name="field.name"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClass"
      class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '~/types/form.types'

const props = defineProps<{
  field: FormField
  modelValue: any
  disabled?: boolean
  errors?: string[]
}>()

defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const inputType = computed(() => {
  const map: Record<string, string> = { date: 'date', datetime: 'datetime-local', time: 'time' }
  return map[props.field.type] || 'date'
})

const inputClass = computed(() => ({
  'border-red-300 focus:ring-red-500': props.errors && props.errors.length > 0,
  'border-gray-300': !props.errors || props.errors.length === 0,
  'bg-gray-50 cursor-not-allowed': props.disabled
}))
</script>
