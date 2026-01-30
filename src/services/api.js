const API_BASE_URL = 'https://fakerapi.it/api/v2'

export const fetchUsers = async (quantity = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?_quantity=${quantity}`)
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных')
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error)
    throw error
  }
}
