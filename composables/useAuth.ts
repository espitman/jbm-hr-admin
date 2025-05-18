import { ref } from 'vue'

interface User {
  id: number
  username: string
  email: string
  name: string
  role: string
  // Add other user properties as needed
}

export const useAuth = () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)

  const getLocalStorage = () => {
    if (import.meta.client) {
      return window.localStorage
    }
    return null
  }

  const checkAuth = () => {
    const token = useCookie('auth_token')
    const storedUser = getLocalStorage()?.getItem('user')
    if (token.value && storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role === 'admin') {
        isAuthenticated.value = true
        user.value = parsedUser
      } else {
        isAuthenticated.value = false
        user.value = null
      }
    } else {
      isAuthenticated.value = false
      user.value = null
    }
  }

  const login = async (token: string, userData: User) => {
    try {
      const authToken = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })
      authToken.value = token
      
      if (getLocalStorage()) {
        getLocalStorage()?.setItem('user', JSON.stringify(userData))
      }
      
      isAuthenticated.value = true
      user.value = userData

      // Set user data in global state
      const { setUserData } = useUserData()
      setUserData(userData)

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    const authToken = useCookie('auth_token')
    authToken.value = null
    
    if (getLocalStorage()) {
      getLocalStorage()?.removeItem('user')
    }
    
    isAuthenticated.value = false
    user.value = null

    // Clear user data from the global state
    const { clearUserData } = useUserData()
    clearUserData()

    // Force a page reload to ensure auth state is cleared
    if (import.meta.client) {
      window.location.href = '/admin/login'
    }
  }

  // Check auth state on initialization
  checkAuth()

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth
  }
} 