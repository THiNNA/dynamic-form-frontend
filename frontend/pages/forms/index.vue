<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Forms</h2>
      <NuxtLink
        to="/forms/create"
        class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
      >
        + Create Form
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-12 text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center py-12 text-red-500">Failed to load forms.</div>
    <div v-else-if="!forms || forms.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">No forms yet.</p>
      <NuxtLink to="/forms/create" class="text-indigo-600 font-medium hover:underline">Create your first form</NuxtLink>
    </div>
    <div v-else>
      <FormTable :forms="forms" @delete="handleDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm } from '~/types/form.types'

definePageMeta({ layout: 'admin' })

const { getForms, deleteForm } = useFormApi()
const { data: forms, pending, error, refresh } = await useAsyncData('forms', () => getForms())

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this form?')) return
  await deleteForm(id)
  await refresh()
}
</script>
