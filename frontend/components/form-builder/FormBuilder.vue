<template>
  <div class="flex h-full flex-col">
    <!-- Toolbar -->
    <div class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 flex-shrink-0">
      <div class="flex items-center space-x-4">
        <input
          v-model="form.title"
          type="text"
          placeholder="Form title"
          class="text-lg font-semibold border-0 border-b-2 border-transparent focus:border-indigo-400 focus:outline-none bg-transparent px-1 py-0.5"
        />
        <select
          v-model="form.status"
          class="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div class="flex items-center space-x-3">
        <span v-if="isDirty" class="text-xs text-amber-500">Unsaved changes</span>
        <button
          type="button"
          :disabled="saving"
          class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          @click="saveForm"
        >
          {{ saving ? 'Saving...' : 'Save Form' }}
        </button>
      </div>
    </div>

    <!-- Slug / Description row -->
    <div class="px-6 py-2 bg-gray-50 border-b border-gray-200 flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <label class="text-xs text-gray-500">Slug:</label>
        <input v-model="form.slug" type="text" placeholder="my-form" class="text-xs border border-gray-300 rounded px-2 py-1 font-mono" />
      </div>
      <div class="flex items-center space-x-2 flex-1">
        <label class="text-xs text-gray-500">Description:</label>
        <input v-model="form.description" type="text" placeholder="Form description (optional)" class="text-xs border border-gray-300 rounded px-2 py-1 flex-1" />
      </div>
    </div>

    <!-- Main layout: palette + canvas + configurator -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left: Field Palette -->
      <FieldPalette @add-field="addField" />

      <!-- Center: Canvas -->
      <div class="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div v-if="sortedFields.length === 0" class="flex flex-col items-center justify-center h-64 text-gray-400">
          <svg class="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm">Click a field type from the left to add it</p>
        </div>
        <div v-else class="space-y-3 max-w-2xl mx-auto">
          <FieldPreview
            v-for="field in sortedFields"
            :key="field.id"
            :field="field"
            :is-selected="selectedFieldId === field.id"
            @select="selectField"
            @remove="removeField"
          />
        </div>
      </div>

      <!-- Right: Field Configurator -->
      <FieldConfigurator
        :field="selectedField"
        @update="updateSelectedField"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm, FormField } from '~/types/form.types'

const props = defineProps<{ initialForm?: DynamicForm }>()
const emit = defineEmits<{ (e: 'saved', id: string): void }>()

const { form, selectedFieldId, selectedField, isDirty, sortedFields, addField, removeField, updateField, selectField, setForm } = useFormBuilder()
const { createForm, updateForm } = useFormApi()

const saving = ref(false)

// Initialize from prop
if (props.initialForm) setForm(props.initialForm)

const updateSelectedField = (updates: Partial<FormField>) => {
  if (selectedFieldId.value) updateField(selectedFieldId.value, updates)
}

const saveForm = async () => {
  saving.value = true
  try {
    if (form.value.id) {
      await updateForm(form.value.id, form.value)
    } else {
      const created = await createForm(form.value)
      form.value.id = created.id
      emit('saved', created.id)
    }
  } catch (err) {
    console.error('Save failed:', err)
    alert('Failed to save form. Please try again.')
  } finally {
    saving.value = false
  }
}
</script>
