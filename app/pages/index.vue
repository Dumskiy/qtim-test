<template>
  <section>
    <div class="container">
      <h1 class="header">Articles</h1>
      
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>

      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <img :src="post.image" :alt="post.title" class="post-image" />
          <p class="post-preview">{{ post.preview }}</p>
          <button class="read-more-btn" @click="navigateTo(`/posts/${post.id}`)">
            Read more
          </button>
        </div>
      </div>
      
      <div v-if="totalPages > 1" class="pagination">
        <button 
          v-if="showPrevButton"
          @click="goToPrevPage" 
          class="pagination-button prev"
        >
          <Icon name="arrow" :size="24" />
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="handlePageChange(page)"
          :class="['pagination-button', { active: page === currentPage }]"
        >
          {{ page }}
        </button>
        
        <button
          v-if="showNextButton"
          @click="goToNextPage"
          class="pagination-button next"
        >
          <Icon name="arrow" :size="24" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

const { fetchPosts } = usePosts()

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const totalPosts = ref(0)

const loadPosts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetchPosts(currentPage.value, 8)
    posts.value = response.data
    totalPages.value = response.totalPages
    totalPosts.value = response.total
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    console.error('Load error:', err)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadPosts()
}

const visiblePages = computed<number[]>(() => {
  const maxVisible = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let endPage = startPage + maxVisible - 1
  
  if (endPage > totalPages.value) {
    endPage = totalPages.value
    startPage = Math.max(1, endPage - maxVisible + 1)
  }
  
  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const showPrevButton = computed(() => currentPage.value > 1)

const showNextButton = computed(() => currentPage.value < totalPages.value)

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    handlePageChange(currentPage.value - 1)
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    handlePageChange(currentPage.value + 1)
  }
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem 3.2rem;
}

.post-card {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.post-image {
  width: 28rem;
  height: 28rem;
}

.post-preview {
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

.read-more-btn {
  padding: 0;
  font-size: 2rem;
  line-height: 1.2;
  color: var(--color-purple-primary);
  background-color: transparent;
  border: none;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out;
}

.post-card:hover,
.post-card:focus-within {
  transform: translateY(-2rem);
}

.post-card:hover .read-more-btn,
.post-card:focus-within .read-more-btn {
  transform: translateY(0);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 5rem;
  flex-wrap: wrap;
}

.pagination-button {
  width: 4.4rem;
  height: 4.4rem;
  padding: 0;
  line-height: 0.5;
  text-align: center;
  background-color: var(--color-gray-secondary);
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.pagination-button.active {
  color: var(--color-white);
  background-color: var(--color-dark-primary);
}

.pagination-button.prev,
.pagination-button.next {
  background-color: var(--color-white);
  border: 0.1rem solid var(--color-gray-tertiary);
}

.pagination-button.prev svg {
  transform: rotate(180deg);
}

.pagination-button:not(.active):hover {
  background-color: var(--color-gray-tertiary);
}

.loading-state {
  text-align: center;
  padding: 3rem;
  font-size: 2rem;
}

.spinner {
  width: 7rem;
  height: 7rem;
  border: 0.5rem solid var(--color-gray-secondary);
  border-top-color: var(--color-purple-secondary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>