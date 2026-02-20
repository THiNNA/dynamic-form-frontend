<template>
  <div class="space-y-2">
    <div class="flex justify-between text-xs text-gray-500">
      <span>{{ field.min ?? 0 }}</span>
      <span class="font-semibold text-indigo-600 text-sm">{{ modelValue ?? field.min ?? 0 }}</span>
      <span>{{ field.max ?? 100 }}</span>
    </div>
    <input
      :id="field.id"
      type="range"
      :name="field.name"
      :value="modelValue ?? field.min ?? 0"
      :min="field.min ?? 0"
      :max="field.max ?? 100"
      :step="field.step ?? 1"
      :disabled="disabled"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '~/types/form.types'

defineProps<{
  field: FormField
  modelValue: any
  disabled?: boolean
  errors?: string[]
}>()

defineEmits<{ (e: 'update:modelValue', value: any): void }>()
</script>
