<script setup lang="ts">
import { computed, ref, toRef, watch, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    drawerInitial: boolean
  }>(),
  {
    drawerInitial: false,
  },
)

const emit = defineEmits<{
  'update:drawerInitial': [value: boolean]
}>()

const drawer = computed({
  get: () => props.drawerInitial,
  set: (value) => emit('update:drawerInitial', value),
})
</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" />
      <v-list-item prepend-icon="mdi-account" title="Account" value="account" />
      <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings" />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
