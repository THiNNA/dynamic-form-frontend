<template>
  <div class="flex items-center">
    <span v-if="field.prefix" class="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600">
      {{ field.prefix }}
    </span>
    <input
      :id="field.id"
      type="number"
      :name="field.name"
      :value="modelValue"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :min="field.min"
      :max="field.max"
      :step="field.step || 1"
      :class="[inputClass, field.prefix ? 'rounded-l-none' : '', field.suffix ? 'rounded-r-none' : '']"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
    <span v-if="field.suffix" class="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">
      {{ field.suffix }}
    </span>
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
