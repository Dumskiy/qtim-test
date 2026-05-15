<template>
  <div class="loader">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loader {
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