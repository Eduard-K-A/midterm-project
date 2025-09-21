import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ReactNode } from 'react'

interface User {
  name: string
}

interface Booking {
  id: number
  spaceId: number
  spaceName: string
  timeSlot: string
  date: string
}

interface AuthContextType {
  user: User | null
  bookings: Booking[]
  login: (name: string) => void
  logout: () => void
  bookSpace: (spaceId: number, spaceName: string, timeSlot: string) => void
  cancelBooking: (bookingId: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>('user', null)
  const [storedBookings, setStoredBookings] = useLocalStorage<Booking[]>('bookings', [])

  const [user, setUser] = useState<User | null>(storedUser)
  const [bookings, setBookings] = useState<Booking[]>(storedBookings)

  useEffect(() => {
    setStoredUser(user)
    setStoredBookings(bookings)
  }, [user, bookings, setStoredUser, setStoredBookings])

  const login = (name: string) => {
    setUser({ name })
  }

  const logout = () => {
    setUser(null)
    setBookings([])
  }

  const bookSpace = (spaceId: number, spaceName: string, timeSlot: string) => {
    if (!user) return
    const newBooking: Booking = {
      id: Date.now(),  // Simple ID generation
      spaceId,
      spaceName,
      timeSlot,
      date: new Date().toLocaleDateString()  // Hardcoded to today
    }
    setBookings([...bookings, newBooking])
  }

  const cancelBooking = (bookingId: number) => {
    setBookings(bookings.filter((b) => b.id !== bookingId))
  }

  const value: AuthContextType = {
    user,
    bookings,
    login,
    logout,
    bookSpace,
    cancelBooking
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}