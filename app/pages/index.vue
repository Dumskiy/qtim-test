<template>
  <section>
    <div class="container">
      <h1 class="header">Articles</h1>

      <Loader v-if="loading" />

      <ErrorMessage  v-else-if="error" :message="error" />

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

const route = useRoute()
const router = useRouter()
const { fetchPosts } = usePosts()

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

const getPageFromQuery = (): number => {
  const page = Number(route.query.page)
  if (!isNaN(page) && page >= 1) {
    return page
  }
  return 1
}

const updateUrlPage = (page: number) => {
  router.replace({
    path: '/',
    query: page > 1 ? { page: page.toString() } : {}
  })
}

const loadPosts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetchPosts(currentPage.value, 8)

    posts.value = response.data
    totalPages.value = response.totalPages

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
      updateUrlPage(totalPages.value)

      return
    }
  } catch (err) {
    console.error('Load error:', err)
    error.value = 'Failed to load posts'
  } finally {
    loading.value = false
  }
}

const handlePageChange = async (page: number) => {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
  updateUrlPage(page)

  await loadPosts()
}

onMounted(async () => {
  currentPage.value = getPageFromQuery()

  await loadPosts()
})

watch(
  () => route.query.page,
  async () => {
    const page = getPageFromQuery()

    if (page === currentPage.value) {
      return
    }

    currentPage.value = page

    await loadPosts()
  }
)
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