<template>
  <section>
    <div class="container">
      <Loader v-if="loading" />

      <article v-if="post">
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

const { fetchPostById } = usePosts()
const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)

const loadPost = async () => {
  const id = route.params.id as string
  if (!id) return
  
  loading.value = true
  try {
    post.value = await fetchPostById(id)
  } catch (error) {
    console.error('Failed to load post:', error)
    post.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadPost()
})
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