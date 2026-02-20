<template>
  <div>
    <label class="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        :name="field.name"
        :checked="!!modelValue"
        :disabled="disabled"
        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span v-if="field.helpText" class="text-sm text-gray-600">{{ field.helpText }}</span>
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
