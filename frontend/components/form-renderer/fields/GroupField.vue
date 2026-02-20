<template>
  <div class="border border-gray-200 rounded-lg p-4 space-y-4">
    <template v-for="child in field.children" :key="child.id">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ child.label }}</label>
        <component
          :is="getFieldComponent(child.type)"
          :field="child"
          :model-value="modelValue?.[child.name]"
          :disabled="disabled"
          @update:model-value="updateChild(child.name, $event)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '~/types/form.types'
import { getFieldComponent } from './index'

const props = defineProps<{
  field: FormField
  modelValue: any
  disabled?: boolean
  errors?: string[]
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const updateChild = (name: string, value: any) => {
  emit('update:modelValue', { ...(props.modelValue || {}), [name]: value })
}
</script>
