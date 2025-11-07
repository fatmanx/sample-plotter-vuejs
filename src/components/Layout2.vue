<script setup lang="ts">
const props = withDefaults(defineProps<{ msg: string }>(), { msg: '' })
</script>

<template>
  <v-banner bg-color="warning">
    <div>
      <router-view />

      <h1>
        {{ props.msg }}
      </h1>

      <h2>
        <slot name="s1"></slot>
      </h2>
      <h6>
        <slot name="s2"></slot>
      </h6>
    </div>
  </v-banner>
</template>

<style scoped></style>
