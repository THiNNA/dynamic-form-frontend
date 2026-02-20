<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border border-gray-200 rounded-lg p-4 relative"
    >
      <button
        v-if="canRemove"
        type="button"
        class="absolute top-2 right-2 text-red-400 hover:text-red-600"
        @click="removeItem(index)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="text-xs text-gray-400 font-medium mb-3">#{{ index + 1 }}</div>
      <div v-for="child in field.children" :key="child.id" class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ child.label }}</label>
        <component
          :is="getFieldComponent(child.type)"
          :field="child"
          :model-value="item[child.name]"
          :disabled="disabled"
          @update:model-value="updateItem(index, child.name, $event)"
        />
      </div>
    </div>
    <button
      v-if="canAdd"
      type="button"
      class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
      @click="addItem"
    >
      + Add Item
    </button>
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

const items = computed(() => Array.isArray(props.modelValue) ? props.modelValue : [{}])

const canAdd = computed(() => !props.field.maxItems || items.value.length < props.field.maxItems)
const canRemove = computed(() => !props.field.minItems || items.value.length > props.field.minItems)

const addItem = () => emit('update:modelValue', [...items.value, {}])
const removeItem = (index: number) => {
  const newItems = [...items.value]
  newItems.splice(index, 1)
  emit('update:modelValue', newItems)
}
const updateItem = (index: number, name: string, value: any) => {
  const newItems = [...items.value]
  newItems[index] = { ...newItems[index], [name]: value }
  emit('update:modelValue', newItems)
}
</script>
