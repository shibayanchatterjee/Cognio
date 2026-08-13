import { createRouter, createWebHistory } from 'vue-router'

import ActivitiesPage from '../pages/ActivitiesPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import HomePage from '../pages/HomePage.vue'
import ParentsPage from '../pages/ParentsPage.vue'

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/activities', name: 'activities', component: ActivitiesPage },
    { path: '/parents', name: 'parents', component: ParentsPage },
    { path: '/auth', name: 'auth', component: AuthPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
