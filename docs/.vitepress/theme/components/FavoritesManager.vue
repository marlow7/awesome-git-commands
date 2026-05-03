<template>
  <div>
    <button
      class="agc-fav-btn"
      :class="{ active: isFavorited }"
      @click.stop="toggleFavorite"
      :title="isFavorited ? '取消收藏' : '收藏命令'"
    >
      {{ isFavorited ? '★' : '☆' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  command: string
}>()

const isFavorited = ref(false)
const STORAGE_KEY = 'agc-favorites'

onMounted(() => {
  loadFavorites()
})

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const favorites: string[] = JSON.parse(stored)
      isFavorited.value = favorites.includes(props.command)
    }
  } catch {
    // ignore
  }
}

function toggleFavorite() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let favorites: string[] = stored ? JSON.parse(stored) : []
    if (isFavorited.value) {
      favorites = favorites.filter((c: string) => c !== props.command)
      isFavorited.value = false
    } else {
      favorites.push(props.command)
      isFavorited.value = true
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // ignore
  }
}
</script>
