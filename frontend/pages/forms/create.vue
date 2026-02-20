<template>
  <div class="h-full">
    <FormBuilder @saved="handleSaved" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const router = useRouter()
const handleSaved = (id: string) => {
  router.push(`/forms/${id}/edit`)
}
</script>
