<template>
  <div class="posts-grid">
    <PostsCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

defineProps<{
  posts: Post[]
}>()
</script>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem 3.2rem;
}
</style>