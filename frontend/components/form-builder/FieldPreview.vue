<template>
  <div
    :class="isSelected ? 'ring-2 ring-indigo-400 bg-indigo-50' : 'bg-white hover:bg-gray-50'"
    class="border border-gray-200 rounded-lg p-4 cursor-pointer transition-all group relative"
    @click="$emit('select', field.id)"
  >
    <!-- Field actions -->
    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1 transition-opacity">
      <button
        type="button"
        class="p-1 text-gray-400 hover:text-red-500 transition-colors"
        @click.stop="$emit('remove', field.id)"
        title="Remove field"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Field label -->
    <div class="flex items-center space-x-2 mb-2">
      <span class="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase">
        {{ field.type }}
      </span>
      <span class="text-sm font-medium text-gray-800">{{ field.label }}</span>
    </div>

    <!-- Field preview input -->
    <div class="opacity-50 pointer-events-none">
      <template v-if="['text', 'email', 'password', 'color'].includes(field.type)">
        <input type="text" :placeholder="field.placeholder || 'Text input'" class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white" disabled />
      </template>
      <template v-else-if="field.type === 'textarea'">
        <textarea :placeholder="field.placeholder || 'Text area'" class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white h-16" disabled />
      </template>
      <template v-else-if="field.type === 'number'">
        <input type="number" placeholder="0" class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white" disabled />
      </template>
      <template v-else-if="['select'].includes(field.type)">
        <select class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white" disabled>
          <option>Select option...</option>
        </select>
      </template>
      <template v-else-if="['date', 'datetime', 'time'].includes(field.type)">
        <input type="date" class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white" disabled />
      </template>
      <template v-else-if="field.type === 'toggle'">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-5 bg-gray-200 rounded-full" />
          <span class="text-xs text-gray-500">Off</span>
        </div>
      </template>
      <template v-else-if="field.type === 'rating'">
        <div class="text-yellow-400 text-xl">★★★☆☆</div>
      </template>
      <template v-else-if="field.type === 'slider'">
        <input type="range" class="w-full" disabled />
      </template>
      <template v-else-if="['checkbox', 'radio', 'multi-select'].includes(field.type)">
        <div class="space-y-1">
          <div v-for="opt in (field.options || [{label: 'Option 1'}, {label: 'Option 2'}]).slice(0, 3)" :key="opt.label" class="flex items-center space-x-2">
            <input :type="field.type === 'checkbox' ? 'checkbox' : 'radio'" disabled class="w-3.5 h-3.5" />
            <span class="text-xs text-gray-600">{{ opt.label }}</span>
          </div>
        </div>
      </template>
      <template v-else-if="['file', 'image'].includes(field.type)">
        <div class="border-2 border-dashed border-gray-300 rounded p-3 text-center text-xs text-gray-400">
          Click to upload
        </div>
      </template>
      <template v-else>
        <div class="h-8 bg-gray-100 rounded text-xs text-gray-400 flex items-center px-3">{{ field.type }} field</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormField } from '~/types/form.types'

defineProps<{
  field: FormField
  isSelected?: boolean
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'remove', id: string): void
}>()
</script>
