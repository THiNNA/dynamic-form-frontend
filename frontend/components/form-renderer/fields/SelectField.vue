<template>
  <div>
    <select
      :id="field.id"
      :name="field.name"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClass"
      class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
      <option
        v-for="opt in field.options"
        :key="String(opt.value)"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
    </select>
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
