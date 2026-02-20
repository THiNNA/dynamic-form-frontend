<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ form.title }}</h3>
        <p v-if="form.description" class="text-sm text-gray-500 mt-1">{{ form.description }}</p>
      </div>
      <span :class="statusClass" class="px-2 py-1 text-xs font-medium rounded-full">
        {{ form.status }}
      </span>
    </div>
    <div class="flex items-center justify-between mt-4">
      <span class="text-xs text-gray-400">{{ form.fields.length }} fields</span>
      <div class="flex space-x-2">
        <NuxtLink
          :to="`/forms/${form.id}/edit`"
          class="px-3 py-1 text-xs font-medium text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50"
        >
          Edit
        </NuxtLink>
        <NuxtLink
          :to="`/f/${form.slug}`"
          target="_blank"
          class="px-3 py-1 text-xs font-medium text-green-600 border border-green-200 rounded hover:bg-green-50"
        >
          View
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm } from '~/types/form.types'

const props = defineProps<{ form: DynamicForm }>()

const statusClass = computed(() => {
  const classes: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-500'
  }
  return classes[props.form.status] || 'bg-gray-100 text-gray-500'
})
</script>
