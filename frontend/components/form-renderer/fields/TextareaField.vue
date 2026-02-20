<template>
  <div>
    <textarea
      :id="field.id"
      :name="field.name"
      :value="modelValue"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :class="inputClass"
      rows="4"
      class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-y"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
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

const inputClass = computed(() => ({
  'border-red-300 focus:ring-red-500': props.errors && props.errors.length > 0,
  'border-gray-300': !props.errors || props.errors.length === 0,
  'bg-gray-50 cursor-not-allowed': props.disabled
}))
</script>
