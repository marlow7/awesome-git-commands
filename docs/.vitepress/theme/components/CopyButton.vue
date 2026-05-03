<template>
  <button
    class="agc-copy-btn"
    @click="copyText"
    :title="'复制代码'"
  >
    {{ copied ? '✓' : '复制' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const copied = ref(false)

function copyText() {
  navigator.clipboard.writeText(props.text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<style scoped>
.agc-copy-btn {
  background: var(--agc-brand-soft);
  border: 1px solid var(--agc-border);
  color: var(--agc-brand);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.agc-copy-btn:hover {
  background: var(--agc-brand);
  color: #fff;
}
</style>
