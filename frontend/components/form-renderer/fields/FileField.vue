<template>
  <div>
    <label
      :for="field.id"
      class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      :class="borderClass"
    >
      <div class="text-center">
        <svg class="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-sm text-gray-500">
          <span class="font-medium text-indigo-600">Click to upload</span> or drag and drop
        </p>
        <p v-if="field.accept" class="text-xs text-gray-400 mt-1">{{ field.accept }}</p>
      </div>
      <input
        :id="field.id"
        type="file"
        :name="field.name"
        :accept="field.accept"
        :disabled="disabled"
        class="hidden"
        @change="handleFileChange"
      />
    </label>
    <p v-if="fileName" class="text-sm text-gray-600 mt-2">Selected: {{ fileName }}</p>
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

const fileName = ref<string>('')

const borderClass = computed(() => ({
  'border-red-300': props.errors && props.errors.length > 0,
  'border-gray-300': !props.errors || props.errors.length === 0
}))

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    fileName.value = file.name
    emit('update:modelValue', file)
  }
}
</script>
