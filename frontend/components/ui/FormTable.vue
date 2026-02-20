<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fields</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="form in forms" :key="form.id" class="hover:bg-gray-50">
          <td class="px-6 py-4">
            <div class="font-medium text-gray-900">{{ form.title }}</div>
            <div v-if="form.description" class="text-sm text-gray-500 truncate max-w-xs">{{ form.description }}</div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ form.slug }}</td>
          <td class="px-6 py-4">
            <span :class="statusClass(form.status)" class="px-2 py-1 text-xs font-medium rounded-full">
              {{ form.status }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ form.fields.length }}</td>
          <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(form.updatedAt) }}</td>
          <td class="px-6 py-4 text-right">
            <div class="flex justify-end space-x-2">
              <NuxtLink
                :to="`/f/${form.slug}`"
                target="_blank"
                class="text-green-600 hover:text-green-800 text-sm font-medium"
              >View</NuxtLink>
              <NuxtLink
                :to="`/forms/${form.id}/edit`"
                class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >Edit</NuxtLink>
              <button
                class="text-red-500 hover:text-red-700 text-sm font-medium"
                @click="$emit('delete', form.id)"
              >Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm } from '~/types/form.types'

defineProps<{ forms: DynamicForm[] }>()
defineEmits<{ (e: 'delete', id: string): void }>()

const statusClass = (status: string) => {
  const map: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-500'
  }
  return map[status] || 'bg-gray-100 text-gray-500'
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}
</script>
