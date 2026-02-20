<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-xl font-bold text-indigo-600">DynamicForm</span>
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/forms" class="text-gray-600 hover:text-indigo-600 text-sm font-medium">
              Admin
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
