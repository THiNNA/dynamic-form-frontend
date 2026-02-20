import type { DynamicForm, FormResponse } from '~/types/form.types'

export const useFormApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const getForms = () =>
    $fetch<DynamicForm[]>('/forms', { baseURL })

  const getForm = (id: string) =>
    $fetch<DynamicForm>(`/forms/${id}`, { baseURL })

  const getFormBySlug = (slug: string) =>
    $fetch<DynamicForm>(`/forms/slug/${slug}`, { baseURL })

  const createForm = (data: Partial<DynamicForm>) =>
    $fetch<DynamicForm>('/forms', { method: 'POST', body: data, baseURL })

  const updateForm = (id: string, data: Partial<DynamicForm>) =>
    $fetch<DynamicForm>(`/forms/${id}`, { method: 'PUT', body: data, baseURL })

  const deleteForm = (id: string) =>
    $fetch(`/forms/${id}`, { method: 'DELETE', baseURL })

  const submitForm = (id: string, data: Record<string, any>) =>
    $fetch<FormResponse>(`/forms/${id}/submit`, { method: 'POST', body: { data }, baseURL })

  const getResponses = (id: string) =>
    $fetch<FormResponse[]>(`/forms/${id}/responses`, { baseURL })

  return { getForms, getForm, getFormBySlug, createForm, updateForm, deleteForm, submitForm, getResponses }
}
