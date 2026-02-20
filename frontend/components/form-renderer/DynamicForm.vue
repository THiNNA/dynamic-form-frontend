<template>
  <div :class="themeClass" class="dynamic-form">
    <!-- Form Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ form.title }}</h1>
      <p v-if="form.description" class="text-gray-500 mt-1">{{ form.description }}</p>
    </div>

    <!-- Progress Bar (multi-step) -->
    <div v-if="isMultiStep && form.settings.showProgressBar" class="mb-6">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>Step {{ currentStep + 1 }} of {{ totalSteps }}</span>
        <span>{{ Math.round(((currentStep + 1) / totalSteps) * 100) }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${((currentStep + 1) / totalSteps) * 100}%` }"
        />
      </div>
    </div>

    <!-- Step tabs -->
    <div v-if="isMultiStep" class="flex space-x-2 mb-6 overflow-x-auto">
      <button
        v-for="(step, i) in steps"
        :key="step.id"
        type="button"
        :class="i === currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
        @click="currentStep = i"
      >
        {{ step.title }}
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
      <svg class="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-green-700 font-semibold text-lg">{{ form.settings.successMessage }}</p>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit">
      <FormStep :step="isMultiStep ? steps[currentStep] : undefined">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="field in currentStepFields"
            :key="field.id"
            :class="widthClass(field.width)"
          >
            <div class="space-y-1">
              <label :for="field.id" class="block text-sm font-medium text-gray-700">
                {{ field.label }}
                <span v-if="hasRequired(field)" class="text-red-500 ml-1">*</span>
              </label>
              <component
                :is="getFieldComponent(field.type)"
                :field="field"
                :model-value="formData[field.name]"
                :disabled="isFieldDisabled(field)"
                :errors="fieldErrors[field.name]"
                @update:model-value="setFieldValue(field.name, $event)"
              />
              <p v-if="field.helpText && !fieldErrors[field.name]?.length" class="text-xs text-gray-400">
                {{ field.helpText }}
              </p>
              <p
                v-for="error in fieldErrors[field.name]"
                :key="error"
                class="text-xs text-red-500"
              >
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-6">
        <button
          v-if="isMultiStep && canGoPrev"
          type="button"
          class="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="prevStep"
        >
          Previous
        </button>
        <div v-else />
        <button
          v-if="isMultiStep && !isLastStep"
          type="button"
          class="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          @click="nextStep"
        >
          Next
        </button>
        <button
          v-else
          type="submit"
          :disabled="submitting"
          class="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ submitting ? 'Submitting...' : form.settings.submitButtonText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm, FormField } from '~/types/form.types'
import { getFieldComponent } from './fields/index'

const props = defineProps<{ form: DynamicForm }>()

const formRef = ref(props.form)
const { formData, currentStep, submitted, submitting, visibleFields, currentStepFields, steps, totalSteps, isMultiStep, canGoNext, canGoPrev, isLastStep, nextStep, prevStep, setFieldValue, isFieldDisabled } = useFormRenderer(formRef)
const { validateForm, isFormValid } = useFormValidation()
const { submitForm } = useFormApi()

const fieldErrors = ref<Record<string, string[]>>({})

const themeClass = computed(() => {
  const map: Record<string, string> = {
    default: 'bg-white p-6 rounded-xl shadow-sm border border-gray-200',
    minimal: 'bg-transparent',
    bordered: 'bg-white p-6 rounded-xl border-2 border-indigo-200'
  }
  return map[props.form.settings.theme || 'default']
})

const widthClass = (width: string) => {
  const map: Record<string, string> = {
    full: 'col-span-12',
    half: 'col-span-12 sm:col-span-6',
    third: 'col-span-12 sm:col-span-4',
    quarter: 'col-span-12 sm:col-span-3'
  }
  return map[width] || 'col-span-12'
}

const hasRequired = (field: FormField) => field.validations.some(v => v.type === 'required')

const handleSubmit = async () => {
  // Validate
  const errors = validateForm(visibleFields.value, formData.value)
  fieldErrors.value = errors
  if (!isFormValid(errors)) return

  submitting.value = true
  try {
    await submitForm(props.form.id, formData.value)
    submitted.value = true
  } catch (err) {
    console.error('Form submission failed:', err)
  } finally {
    submitting.value = false
  }
}
</script>
