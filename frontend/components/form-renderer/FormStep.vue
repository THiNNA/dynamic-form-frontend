<template>
  <div>
    <div v-if="step" class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900">{{ step.title }}</h2>
      <p v-if="step.description" class="text-gray-500 text-sm mt-1">{{ step.description }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { FormStep } from '~/types/form.types'

defineProps<{ step?: FormStep }>()
</script>
