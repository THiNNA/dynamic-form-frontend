<template>
  <div class="space-y-2">
    <label
      v-for="opt in field.options"
      :key="String(opt.value)"
      class="flex items-center space-x-2 cursor-pointer"
    >
      <input
        type="checkbox"
        :value="opt.value"
        :checked="Array.isArray(modelValue) && modelValue.includes(opt.value)"
        :disabled="disabled || opt.disabled"
        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        @change="toggleOption(opt.value)"
      />
      <span class="text-sm text-gray-700">{{ opt.label }}</span>
    </label>
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

const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const toggleOption = (value: string | number) => {
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const idx = current.indexOf(value)
  if (idx === -1) current.push(value)
  else current.splice(idx, 1)
  emit('update:modelValue', current)
}
</script>
