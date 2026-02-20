<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md flex-shrink-0">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <NuxtLink to="/" class="text-xl font-bold text-indigo-600">DynamicForm</NuxtLink>
      </div>
      <nav class="mt-6 px-4 space-y-1">
        <NuxtLink
          to="/forms"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-700"
          active-class="bg-indigo-50 text-indigo-700"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          All Forms
        </NuxtLink>
        <NuxtLink
          to="/forms/create"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-700"
          active-class="bg-indigo-50 text-indigo-700"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Form
        </NuxtLink>
      </nav>
    </div>
    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white shadow-sm flex items-center px-8 border-b border-gray-200">
        <h1 class="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
      </header>
      <main class="flex-1 p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
