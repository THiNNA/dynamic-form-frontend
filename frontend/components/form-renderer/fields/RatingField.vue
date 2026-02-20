<template>
  <div class="flex items-center space-x-1">
    <button
      v-for="star in maxRating"
      :key="star"
      type="button"
      :disabled="disabled"
      :class="star <= (hovered || modelValue || 0) ? 'text-yellow-400' : 'text-gray-300'"
      class="text-3xl focus:outline-none transition-colors hover:scale-110"
      @mouseenter="hovered = star"
      @mouseleave="hovered = 0"
      @click="$emit('update:modelValue', star)"
    >
      ★
    </button>
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

defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const hovered = ref(0)
const maxRating = computed(() => props.field.max || 5)
</script>
