import { ref } from 'vue'

interface User {
  id: number
  username: string
  email: string
  // Add other user properties as needed
}

export const useUserData = () => {
  const userData = ref<User | null>(null)

  const setUserData = (data: User) => {
    userData.value = data
  }

  const clearUserData = () => {
    userData.value = null
  }

  return {
    userData,
    setUserData,
    clearUserData
  }
} 