<template>
  <div class="error">
    <p>Error:</p>
    <p>{{ message }}</p>
    <p>Please try refreshing the page</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped>
.error {
  font-size: 2.5rem;
}

.error p + p {
  margin-top: 1rem;
}
</style>