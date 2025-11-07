import { createRouter, createWebHistory } from 'vue-router'
import Comp1 from '@/components/Comp1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'x', component: Comp1 },
    { path: '/x', name: 'xx', component: Comp1,props: { msg: 'hello'} },
  ],
})

export default router
