<script setup lang="ts">
import { useDynamicComponent } from '@/composables/useDynamicComponent'
import { ref, watch } from 'vue'
import Menu from '@/components/Menu.vue'
import LayoutSelector from '@/components/LayoutSelector.vue'
import { useLayoutStore } from '@/stores/layout-store.ts'


const layoutStore = useLayoutStore()
let currentLayout = ref(layoutStore.layout)
const { currentComponent, isLoading, setComponent, moduleNames } = useDynamicComponent(
  currentLayout.value,
)
if (currentLayout.value === '') {
  currentLayout.value = moduleNames.shift() ?? ''
  setComponent(currentLayout.value)
}
watch(currentLayout, (newValue) => setComponent(newValue))



const drawer = ref(true)

</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>My Application</v-toolbar-title>

      <v-spacer />

      <LayoutSelector
        :modules="moduleNames"
        :selected-module="currentLayout"
        @update:selectedModule="currentLayout = $event"
      />
    </v-app-bar>

    <Menu :drawer-initial="drawer" @update:drawerInitial="drawer = $event" />

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Status Card -->
        <v-card class="mb-4">
          <v-card-title>
            <v-icon class="me-2">mdi-view-dashboard</v-icon>
            Current Layout: {{ currentLayout }}
          </v-card-title>
        </v-card>

        <!-- Content Area -->
        <v-card>
          <v-card-text>
            <div v-if="isLoading" class="text-center py-8">
              <v-progress-circular indeterminate color="primary" size="64" />
              <div class="mt-4 text-h6">Loading...</div>
            </div>

            <div v-else>
              <component :is="currentComponent" msg="Hello">
                <template #s1>SLOT1</template>
                <template #s2>SLOT2</template>
              </component>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <!-- Footer (opțional) -->
    <v-footer color="grey-lighten-3" class="text-center">
      <div>(ↄ) {{ new Date().getFullYear() }} My App</div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.container {
  margin-top: 1rem;
}
</style>
