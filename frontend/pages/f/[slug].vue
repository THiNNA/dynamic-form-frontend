<template>
  <div class="max-w-2xl mx-auto py-8">
    <div v-if="pending" class="text-center py-12 text-gray-500">Loading form...</div>
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 text-lg">Form not found.</p>
      <NuxtLink to="/" class="text-indigo-600 hover:underline mt-4 block">← Back to home</NuxtLink>
    </div>
    <DynamicForm v-else-if="form" :form="form" />
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm } from '~/types/form.types'

const route = useRoute()
const { getFormBySlug } = useFormApi()

const { data: form, pending, error } = await useAsyncData(
  `form-slug-${route.params.slug}`,
  () => getFormBySlug(route.params.slug as string)
)
</script>
