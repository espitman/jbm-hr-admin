import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin((nuxtApp) => {
  const { isAuthenticated, checkAuth } = useAuth()

  // Add global navigation guard (for SPA navigation)
  nuxtApp.hook('app:created', () => {
    checkAuth()
    const router = useRouter()
    
    router.beforeEach((to, from, next) => {
      if (!isAuthenticated.value && to.path !== '/login') {
        next('/login')
        return
      }
      if (isAuthenticated.value && to.path === '/login') {
        next('/')
        return
      }
      next()
    })
  })

  // Add client-side auth check and redirect on app mount (for manual refresh)
  nuxtApp.hook('app:mounted', () => {
    checkAuth()
    const router = useRouter()
    const route = useRoute()
    if (!isAuthenticated.value && route.path !== '/login') {
      router.push('/login')
    }
    if (isAuthenticated.value && route.path === '/login') {
      router.push('/')
    }
  })
}) 