<template>
  <div class="h-full">
    <div v-if="pending" class="flex justify-center items-center h-64 text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center py-12 text-red-500">Failed to load form.</div>
    <FormBuilder v-else-if="form" :initial-form="form" @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
import type { DynamicForm } from '~/types/form.types'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const { getForm } = useFormApi()

const { data: form, pending, error } = await useAsyncData(
  `form-${route.params.id}`,
  () => getForm(route.params.id as string)
)

const handleSaved = (id: string) => {
  router.push('/forms')
}
</script>
