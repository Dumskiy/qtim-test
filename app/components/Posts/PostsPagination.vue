<template>
  <div v-if="totalPages > 1" class="pagination">
    <button 
      v-if="showPrevButton"
      @click="goToPrevPage" 
      class="button prev"
    >
      <Icon name="arrow" :size="24" />
    </button>
    
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="handlePageChange(page)"
      :class="['button', { active: page === currentPage }]"
    >
      {{ page }}
    </button>
    
    <button
      v-if="showNextButton"
      @click="goToNextPage"
      class="button next"
    >
      <Icon name="arrow" :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const visiblePages = computed<number[]>(() => {
  const maxVisible = 5
  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let endPage = startPage + maxVisible - 1
  
  if (endPage > props.totalPages) {
    endPage = props.totalPages
    startPage = Math.max(1, endPage - maxVisible + 1)
  }
  
  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  
  return pages
})

const showPrevButton = computed(() => props.currentPage > 1)
const showNextButton = computed(() => props.currentPage < props.totalPages)

const handlePageChange = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('pageChange', page)
}

const goToPrevPage = () => {
  if (props.currentPage > 1) {
    handlePageChange(props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    handlePageChange(props.currentPage + 1)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 5rem;
  flex-wrap: wrap;
}

.button {
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

.button.active {
  color: var(--color-white);
  background-color: var(--color-dark-primary);
  cursor: default;
}

.button.prev,
.button.next {
  background-color: var(--color-white);
  border: 0.1rem solid var(--color-gray-tertiary);
}

.button.prev svg {
  transform: rotate(180deg);
}

.button:not(.active):hover {
  background-color: var(--color-gray-tertiary);
}
</style>