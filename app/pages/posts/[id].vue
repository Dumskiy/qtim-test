<template>
  <section>
    <div class="container">
      <Loader v-if="loading" />

      <ErrorMessage v-else-if="error" message="Failed to load post" />

      <article v-else-if="post">
        <h1 class="title">{{ post.title }}</h1>

        <div class="image">
          <img
            :src="post.image"
            :alt="post.title"
            width="1216"
            height="700"
          />
        </div>

        <div class="content">
          <h2>About</h2>
          <p>{{ post.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

const route = useRoute()
const { fetchPostById } = usePosts()
const postId = computed(() => route.params.id as string)

const {
  data: post,
  pending: loading,
  error
} = await useAsyncData<Post | null>(
  () => `post-${postId.value}`,
  async () => {
    if (!postId.value) {
      return null
    }

    return await fetchPostById(postId.value)
  }
)
</script>

<style scoped>
.container {
  padding-top: 12rem;
  padding-bottom: 8rem;
}

.title {
  margin-bottom: 7.3rem;
  font-size: 8.4rem;
  font-weight: 400;
  line-height: 1;
}

.image {
  margin-bottom: 8rem;
  width: 100%;
  height: 70rem;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  width: 57.16%;
}

.content h2 {
  margin-bottom: 3.2rem;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1;
}

.content p {
  font-size: 3.6rem;
  line-height: 1.24;
}
</style>