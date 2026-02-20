<template>
  <div class="flex items-center space-x-3">
    <button
      type="button"
      :disabled="disabled"
      :class="toggleClass"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="toggle"
    >
      <span
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
      />
    </button>
    <span class="text-sm text-gray-600">{{ modelValue ? 'On' : 'Off' }}</span>
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

const toggleClass = computed(() => ({
  'bg-indigo-600': !!props.modelValue,
  'bg-gray-200': !props.modelValue,
  'opacity-50 cursor-not-allowed': props.disabled
}))

const toggle = () => {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>
