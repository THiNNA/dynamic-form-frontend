<template>
  <div class="w-64 bg-white border-r border-gray-200 overflow-y-auto">
    <div class="p-4 border-b border-gray-200">
      <h3 class="font-semibold text-gray-800 text-sm">Field Types</h3>
    </div>
    <div class="p-3 space-y-1">
      <div
        v-for="type in fieldTypes"
        :key="type.type"
        class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
        draggable="true"
        @click="$emit('add-field', type.type)"
      >
        <span class="text-lg">{{ type.icon }}</span>
        <div>
          <div class="text-sm font-medium text-gray-700 group-hover:text-indigo-700">{{ type.label }}</div>
          <div class="text-xs text-gray-400">{{ type.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FieldType } from '~/types/form.types'

defineEmits<{ (e: 'add-field', type: FieldType): void }>()

const fieldTypes = [
  { type: 'text' as FieldType, label: 'Text', icon: '✏️', description: 'Single line text' },
  { type: 'textarea' as FieldType, label: 'Textarea', icon: '📝', description: 'Multi-line text' },
  { type: 'number' as FieldType, label: 'Number', icon: '🔢', description: 'Numeric input' },
  { type: 'email' as FieldType, label: 'Email', icon: '📧', description: 'Email address' },
  { type: 'password' as FieldType, label: 'Password', icon: '🔒', description: 'Password input' },
  { type: 'select' as FieldType, label: 'Select', icon: '📋', description: 'Dropdown select' },
  { type: 'multi-select' as FieldType, label: 'Multi-Select', icon: '☑️', description: 'Multiple choices' },
  { type: 'radio' as FieldType, label: 'Radio', icon: '⭕', description: 'Single choice' },
  { type: 'checkbox' as FieldType, label: 'Checkbox', icon: '✅', description: 'Boolean toggle' },
  { type: 'date' as FieldType, label: 'Date', icon: '📅', description: 'Date picker' },
  { type: 'datetime' as FieldType, label: 'DateTime', icon: '🕐', description: 'Date & time' },
  { type: 'time' as FieldType, label: 'Time', icon: '⏰', description: 'Time picker' },
  { type: 'file' as FieldType, label: 'File', icon: '📎', description: 'File upload' },
  { type: 'toggle' as FieldType, label: 'Toggle', icon: '🔘', description: 'On/Off toggle' },
  { type: 'slider' as FieldType, label: 'Slider', icon: '🎚️', description: 'Range slider' },
  { type: 'rating' as FieldType, label: 'Rating', icon: '⭐', description: 'Star rating' },
  { type: 'group' as FieldType, label: 'Group', icon: '📦', description: 'Field group' },
  { type: 'repeater' as FieldType, label: 'Repeater', icon: '🔁', description: 'Repeatable fields' }
]
</script>
