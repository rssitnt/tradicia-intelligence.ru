// Основные типы данных для приложения Tradicia Intelligence

export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface DatabaseResponse<T> {
  data: T | null
  error: Error | null
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
} 