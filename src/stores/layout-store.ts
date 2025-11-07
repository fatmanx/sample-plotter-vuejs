import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<string>(localStorage.getItem('store-layout') || '')

  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  watch(
    layout,
    (newLayout) => {
      localStorage.setItem('store-layout', newLayout)
    },
    { immediate: false },
  )

  function increment() {
    count.value++
  }

  function setLayout(newLayout: string) {
    layout.value = newLayout
  }

  return {
    count,
    doubleCount,
    layout,
    increment,
    setLayout,
  }
})
