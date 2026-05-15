<template>
  <section>
    <div class="container">
      <h1 class="header">Articles</h1>

      <Loader v-if="loading" />

      <div v-else>
        <PostsGrid :posts="posts" />

        <PostsPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

const { fetchPosts } = usePosts()

const posts = ref<Post[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)

const loadPosts = async () => {
  loading.value = true
  
  try {
    const response = await fetchPosts(currentPage.value, 8)
    posts.value = response.data
    totalPages.value = response.totalPages
  } catch (err) {
    console.error('Load error:', err)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadPosts()
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.container {
  padding-top: 12rem;
  padding-bottom: 14rem;
}

.header {
  margin-bottom: 6rem;
  font-weight: 400;
  font-size: 8.4rem;
  line-height: 1;
}
</style>