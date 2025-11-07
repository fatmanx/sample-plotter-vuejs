import { ref, shallowRef, watch } from 'vue'
import { useLayoutStore } from '@/stores/layout-store.ts'

export function useDynamicComponent(initialName: string, basePath = '/src/components/') {
  const componentName = ref(initialName)
  const currentComponent = shallowRef<any>(null)
  const isLoading = ref(true)

  const layoutStore = useLayoutStore()

  const modules = import.meta.glob('/src/components/*.vue')

  const moduleNames = Array.from(Object.keys(modules))
    .map((key) => key.replace('/src/components/', '').replace('.vue', ''))
    .filter((name) => name.startsWith('Layout') && name !== 'LayoutSelector')

  const loadComponent = async (name: string) => {
    try {
      isLoading.value = true
      const modulePath = `${basePath}${name}.vue`

      if (modules[modulePath]) {
        const component = await modules[modulePath]()
        currentComponent.value = (component as any).default
      }
    } catch (error) {
      console.error(`Failed to load component: ${name}`, error)
    } finally {
      isLoading.value = false
    }
  }

  loadComponent(initialName)
  watch(componentName, loadComponent)

  return {
    componentName,
    currentComponent,
    isLoading,
    moduleNames, // Export modules
    setComponent: (name: string) => {
      // string, nu keyof
      componentName.value = name
      layoutStore.setLayout(name)
    },
  }
}
