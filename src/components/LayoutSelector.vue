<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modules: Array<string>
    selectedModule: string
  }>(),
  {
    modules: () => [],
    selectedModule: '',
  },
)

const emit = defineEmits<{
  'update:selectedModule': [value: string]
}>()

const selMod = computed({
  get: () => props.selectedModule,
  set: (value) => emit('update:selectedModule', value),
})
</script>

<template>
  <v-select
    v-model="selMod"
    :items="props.modules"
    item-title="title"
    item-value="value"
    label="Layout"
    variant="outlined"
    density="compact"
    style="max-width: 150px"
    hide-details
  />
</template>

<style scoped></style>
