<template>
  <div class="agc-command-card" @click="handleClick">
    <div class="card-title">{{ command }}</div>
    <div class="card-desc">{{ description }}</div>
    <button
      class="card-copy-btn"
      @click.stop="copyCommand"
      :title="'复制 ' + command"
    >
      {{ copied ? '已复制' : '复制' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  command: string
  description: string
  link?: string
}>()

const copied = ref(false)

function copyCommand() {
  navigator.clipboard.writeText(props.command).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

function handleClick() {
  if (props.link) {
    window.location.href = props.link
  }
}
</script>
