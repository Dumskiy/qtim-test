<template>
  <div class="main-container">
    <CommonHeader />
    <main>
      <slot />
    </main>
    <CommonFooter />
    <div v-html="sprite" style="display: none;" />
  </div>
</template>

<script setup>
import sprite from '~/assets/icons/sprite.svg?raw'
</script>

<style scoped>
.main-container {
  margin: 0 auto;
  max-width: 144rem;
}
</style>
