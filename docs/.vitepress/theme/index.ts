import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style/index.css'
import CommandCard from './components/CommandCard.vue'
import FavoritesManager from './components/FavoritesManager.vue'
import CopyButton from './components/CopyButton.vue'
import BackToTop from './components/BackToTop.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CommandCard', CommandCard)
    app.component('FavoritesManager', FavoritesManager)
    app.component('CopyButton', CopyButton)
    app.component('BackToTop', BackToTop)
  },
} satisfies Theme
