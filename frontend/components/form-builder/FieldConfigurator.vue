<template>
  <div class="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
    <div v-if="!field" class="p-6 text-center text-gray-400 mt-10">
      <svg class="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
      <p class="text-sm">Select a field to configure</p>
    </div>
    <div v-else class="p-4 space-y-4">
      <div class="border-b border-gray-200 pb-3">
        <h3 class="font-semibold text-gray-800">Configure Field</h3>
        <span class="text-xs text-indigo-500 font-medium uppercase">{{ field.type }}</span>
      </div>

      <!-- Basic settings -->
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Label</label>
        <input
          type="text"
          :value="field.label"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          @input="update({ label: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Field Name</label>
        <input
          type="text"
          :value="field.name"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
          @input="update({ name: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Placeholder</label>
        <input
          type="text"
          :value="field.placeholder"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          @input="update({ placeholder: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Help Text</label>
        <input
          type="text"
          :value="field.helpText"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          @input="update({ helpText: ($event.target as HTMLInputElement).value })"
        />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Width</label>
        <select
          :value="field.width"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          @change="update({ width: ($event.target as HTMLSelectElement).value as any })"
        >
          <option value="full">Full</option>
          <option value="half">Half</option>
          <option value="third">Third</option>
          <option value="quarter">Quarter</option>
        </select>
      </div>

      <!-- Options (for select/radio/checkbox/multi-select) -->
      <div v-if="hasOptions">
        <label class="block text-xs font-medium text-gray-600 mb-2">Options</label>
        <div class="space-y-2">
          <div
            v-for="(opt, i) in field.options || []"
            :key="i"
            class="flex items-center space-x-2"
          >
            <input
              type="text"
              :value="opt.label"
              placeholder="Label"
              class="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
              @input="updateOption(i, 'label', ($event.target as HTMLInputElement).value)"
            />
            <input
              type="text"
              :value="opt.value"
              placeholder="Value"
              class="w-24 px-2 py-1.5 border border-gray-300 rounded text-xs"
              @input="updateOption(i, 'value', ($event.target as HTMLInputElement).value)"
            />
            <button type="button" class="text-red-400 hover:text-red-600 text-xs" @click="removeOption(i)">✕</button>
          </div>
          <button
            type="button"
            class="text-xs text-indigo-600 hover:text-indigo-800"
            @click="addOption"
          >+ Add Option</button>
        </div>
      </div>

      <!-- Validations -->
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-2">Validations</label>
        <div class="space-y-2">
          <div
            v-for="(rule, i) in field.validations"
            :key="i"
            class="border border-gray-200 rounded p-2 text-xs"
          >
            <div class="flex justify-between items-center mb-1">
              <span class="font-medium text-gray-700">{{ rule.type }}</span>
              <button type="button" class="text-red-400 hover:text-red-600" @click="removeValidation(i)">✕</button>
            </div>
            <input
              type="text"
              :value="rule.message"
              placeholder="Error message"
              class="w-full px-2 py-1 border border-gray-200 rounded text-xs"
              @input="updateValidation(i, 'message', ($event.target as HTMLInputElement).value)"
            />
          </div>
          <select
            class="w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white"
            @change="addValidation(($event.target as HTMLSelectElement).value)"
          >
            <option value="">+ Add Validation</option>
            <option value="required">Required</option>
            <option value="minLength">Min Length</option>
            <option value="maxLength">Max Length</option>
            <option value="min">Min Value</option>
            <option value="max">Max Value</option>
            <option value="email">Email</option>
            <option value="url">URL</option>
            <option value="pattern">Pattern (Regex)</option>
          </select>
        </div>
      </div>

      <!-- Toggle disabled -->
      <div class="flex items-center justify-between">
        <label class="text-xs font-medium text-gray-600">Disabled</label>
        <input
          type="checkbox"
          :checked="field.disabled"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded"
          @change="update({ disabled: ($event.target as HTMLInputElement).checked })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormField, ValidationRule, FieldOption } from '~/types/form.types'

const props = defineProps<{ field: FormField | null }>()
const emit = defineEmits<{ (e: 'update', updates: Partial<FormField>): void }>()

const hasOptions = computed(() =>
  props.field && ['select', 'multi-select', 'radio', 'checkbox'].includes(props.field.type)
)

const update = (updates: Partial<FormField>) => emit('update', updates)

const addOption = () => {
  const options = [...(props.field?.options || [])]
  options.push({ label: `Option ${options.length + 1}`, value: `option_${options.length + 1}` })
  update({ options })
}

const removeOption = (index: number) => {
  const options = [...(props.field?.options || [])]
  options.splice(index, 1)
  update({ options })
}

const updateOption = (index: number, key: keyof FieldOption, value: any) => {
  const options = [...(props.field?.options || [])]
  options[index] = { ...options[index], [key]: value }
  update({ options })
}

const addValidation = (type: string) => {
  if (!type) return
  const validations = [...(props.field?.validations || [])]
  validations.push({ type: type as ValidationRule['type'], message: `This field is ${type}` })
  update({ validations })
}

const removeValidation = (index: number) => {
  const validations = [...(props.field?.validations || [])]
  validations.splice(index, 1)
  update({ validations })
}

const updateValidation = (index: number, key: keyof ValidationRule, value: any) => {
  const validations = [...(props.field?.validations || [])]
  validations[index] = { ...validations[index], [key]: value }
  update({ validations })
}
</script>
