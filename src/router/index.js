import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuth } from 'stores/useAuth' // 👈

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // ✅ Navigation Guard
  Router.beforeEach((to, from, next) => {
    const auth = useAuth()

    const isPublic = to.path === '/login'
    const isAuthenticated = auth.isLoggedIn

    if (!isAuthenticated && !isPublic) {
      next('/login') // 🔒 Перенаправити незалогінених
    } else if (isAuthenticated && isPublic) {
      next('/') // 🔁 Залогінених не пускаємо на login
    } else {
      next() // ✅ Все ок
    }
  })

  return Router
})
