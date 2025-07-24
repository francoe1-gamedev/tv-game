import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReceiverView from '@/views/ReceiverView.vue'
import ControllerView from '@/views/ControllerView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/receiver', component: ReceiverView },
    { path: '/controller', component: ControllerView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
