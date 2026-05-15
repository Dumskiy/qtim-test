<template>
  <article class="card">
    <div class="image">
      <img :src="post.image" :alt="post.title" width="280" height="280" />
    </div>
    <p class="preview">{{ post.preview }}</p>
    <NuxtLink class="link" :to="`/posts/${post.id}`">
      Read more
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

const props = defineProps<{
  post: Post
}>()
</script>

<style scoped>
.card {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.image {
  width: 100%;
  height: 28rem;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 7.4rem;
  margin-top: 2.4rem;
  margin-bottom: 1.2rem;
  padding: 0;
  font-size: 2rem;
}

.link {
  display: block;
  padding: 0;
  font-size: 2rem;
  line-height: 1.2;
  color: var(--color-purple-primary);
  background-color: transparent;
  border: none;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out;
}

.card:hover,
.card:focus-within {
  transform: translateY(-2rem);
}

.card:hover .link,
.card:focus-within .link {
  transform: translateY(0);
}
</style>