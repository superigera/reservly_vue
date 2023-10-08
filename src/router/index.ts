import { createRouter, createWebHistory } from 'vue-router'
import Top from '@/views/TopPage.vue'
import NewMemberRegistration from '@/views/MemberRegistration/NewMemberRegistration.vue'
import ComfirmMemberRegistration from '@/views/MemberRegistration/ComfirmMemberRegistration.vue'
import LoginPage from '@/views/Login/LoginPage.vue'

const routes = [
    {
        path: '/top',
        name: 'Top',
        component: Top
    },
    {
        path: '/newMemberRegistration',
        name: 'NewMemberRegistration',
        component: NewMemberRegistration,
    },
    {
        path: '/newMemberRegistration/comfirm',
        name: 'ComfirmMemberRegistration',
        component: ComfirmMemberRegistration,
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.VUE_APP_API_BASE_URL),
    routes
})

export default router