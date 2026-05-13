<template>
  <svg
    :class="className"
    :width="widthValue"
    :height="heightValue"
    aria-hidden="true"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Имя иконки */
  name: string
  /** Ширина в пикселях */
  width?: number
  /** Высота в пикселях */
  height?: number
  /** Размер в пикселях (устанавливает и width и height одинаковыми) */
  size?: number
  /** Дополнительный CSS класс */
  class?: string
}>()

const widthValue = computed(() => {
  if (props.size) return props.size
  return props.width
})

const heightValue = computed(() => {
  if (props.size) return props.size
  return props.height
})

const className = computed(() => props.class || '')
</script>
