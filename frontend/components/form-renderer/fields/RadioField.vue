<template>
  <div class="space-y-2">
    <label
      v-for="opt in field.options"
      :key="String(opt.value)"
      class="flex items-center space-x-2 cursor-pointer"
    >
      <input
        type="radio"
        :name="field.name"
        :value="opt.value"
        :checked="String(modelValue) === String(opt.value)"
        :disabled="disabled || opt.disabled"
        class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        @change="$emit('update:modelValue', opt.value)"
      />
      <span class="text-sm text-gray-700">{{ opt.label }}</span>
    </label>
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
