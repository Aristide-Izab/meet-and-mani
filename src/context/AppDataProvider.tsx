import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { demoTechnicians } from '../data/demoTechnicians'
import type { Booking, BookingStatus, CurrentUser, NailTechProfile } from '../types'
import { defaultAvailability } from '../utils/booking'
import {
  AppDataContext,
  MY_PROFILE_ID,
  type AppDataValue,
  type NewBooking,
} from './AppDataContext'

// Temporary in-memory store for the frontend prototype.
// Everything resets when the page is refreshed. The Spring Boot API and
// MySQL database will replace this later, using the same data shapes.

const emptyProfile: NailTechProfile = {
  id: MY_PROFILE_ID,
  firstName: '',
  lastName: '',
  email: '',
  business: {
    businessName: '',
    city: '',
    serviceArea: '',
    yearsExperience: '',
    bio: '',
  },
  services: [],
  portfolio: [],
  availability: defaultAvailability(),
  sameDayBookings: false,
  rating: null,
  reviews: [],
  isDemo: false,
}

function AppDataProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [myProfile, setMyProfile] = useState<NailTechProfile>(emptyProfile)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favourites, setFavourites] = useState<string[]>([])

  const logIn = useCallback((user: CurrentUser) => setCurrentUser(user), [])
  const logOut = useCallback(() => setCurrentUser(null), [])

  const updateMyProfile = useCallback((changes: Partial<NailTechProfile>) => {
    setMyProfile((current) => ({ ...current, ...changes }))
  }, [])

  const isMyProfileComplete =
    myProfile.business.businessName.trim() !== '' &&
    myProfile.services.length > 0 &&
    myProfile.portfolio.length > 0 &&
    myProfile.availability.some((day) => day.enabled)

  const technicians = useMemo(
    () => (isMyProfileComplete ? [myProfile, ...demoTechnicians] : demoTechnicians),
    [isMyProfileComplete, myProfile]
  )

  const getTechnician = useCallback(
    (id: string) => technicians.find((technician) => technician.id === id),
    [technicians]
  )

  const addBooking = useCallback((booking: NewBooking) => {
    const newBooking: Booking = {
      ...booking,
      id: `MM${Date.now().toString(36).toUpperCase()}`,
      status: 'Pending',
    }

    setBookings((current) => [...current, newBooking])
    return newBooking
  }, [])

  const updateBookingStatus = useCallback((id: string, status: BookingStatus) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status } : booking))
    )
  }, [])

  const toggleFavourite = useCallback((technicianId: string) => {
    setFavourites((current) =>
      current.includes(technicianId)
        ? current.filter((id) => id !== technicianId)
        : [...current, technicianId]
    )
  }, [])

  const value: AppDataValue = {
    currentUser,
    logIn,
    logOut,
    myProfile,
    updateMyProfile,
    isMyProfileComplete,
    technicians,
    getTechnician,
    bookings,
    addBooking,
    updateBookingStatus,
    favourites,
    toggleFavourite,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export default AppDataProvider
