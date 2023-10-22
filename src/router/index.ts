import { createRouter, createWebHistory } from 'vue-router'
import Top from '@/views/TopPage.vue'
import NewMemberRegistration from '@/views/MemberRegistration/NewMemberRegistration.vue'
import ComfirmMemberRegistration from '@/views/MemberRegistration/ComfirmMemberRegistration.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
import AdminPage from '@/views/Admin/AdminPage.vue'
import MyPage from '@/views/MyPage/MyPage.vue'

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
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
    },
    {
        path: '/myPage',
        name: 'MyPage',
        component: MyPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router