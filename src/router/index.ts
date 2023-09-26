import { createRouter, createWebHistory } from 'vue-router'
import Top from '@/views/TopPage.vue'

const routes = [
    {
        path: '/top',
        name: 'Top',
        component: Top
    }
]

const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_API_BASE_URL),
    routes
})

export default router