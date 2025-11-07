import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useFormulaStore = defineStore('formula', () => {
  const formula = ref<string>(localStorage.getItem('store-formula') || 'f(x,y) = -x^2 + y^2')

  watch(
    formula,
    (newFormula) => {
      localStorage.setItem('store-formula', newFormula)
    },
    { immediate: false },
  )

  function setFormula(newFormula: string) {
    formula.value = newFormula
  }

  return {
    formula,
    setFormula,
  }
})
