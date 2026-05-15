<template>
  <section>
    <div class="container">
      <h1 class="header">Articles</h1>

      <Loader v-if="loading" />

      <ErrorMessage  v-else-if="error" message="Failed to load posts" />

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
const currentPage = ref(getPageFromQuery())

function getPageFromQuery(): number {
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

const {
  data,
  pending: loading,
  error
} = await useAsyncData(
  () => `posts-page-${currentPage.value}`,
  async () => {
    const response = await fetchPosts(currentPage.value, 8)

    if (currentPage.value > response.totalPages) {
      currentPage.value = response.totalPages
      updateUrlPage(response.totalPages)

      return await fetchPosts(response.totalPages, 8)
    }

    return response
  },
  {
    watch: [currentPage]
  }
)

const posts = computed<Post[]>(() => data.value?.data || [])
const totalPages = computed(() => data.value?.totalPages || 1)

const handlePageChange = async (page: number) => {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
  updateUrlPage(page)
}

watch(
  () => route.query.page,
  () => {
    currentPage.value = getPageFromQuery()
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