<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <div v-html="sprite" style="display: none;" />
  </div>
</template>

<script setup>
import sprite from '~/assets/icons/sprite.svg?raw'
</script>
