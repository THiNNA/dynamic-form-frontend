<template>
  <div class="text-center py-16">
    <h1 class="text-5xl font-extrabold text-gray-900 mb-4">Dynamic Form Builder</h1>
    <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
      Create powerful, dynamic forms with conditional logic, multi-step flows, and real-time validation.
    </p>
    <div class="flex justify-center space-x-4">
      <NuxtLink
        to="/forms/create"
        class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create a Form
      </NuxtLink>
      <NuxtLink
        to="/forms"
        class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
      >
        View All Forms
      </NuxtLink>
    </div>
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Drag & Drop Builder</h3>
        <p class="text-gray-500 text-sm">Easily create forms by dragging and dropping field types.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Conditional Logic</h3>
        <p class="text-gray-500 text-sm">Show or hide fields based on user inputs with powerful conditional logic.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Multi-Step Forms</h3>
        <p class="text-gray-500 text-sm">Break complex forms into manageable steps with progress tracking.</p>
      </div>
    </div>
  </div>
</template>
