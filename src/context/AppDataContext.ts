import { createContext } from 'react'
import type {
  Booking,
  BookingStatus,
  CurrentUser,
  NailTechProfile,
} from '../types'

export const MY_PROFILE_ID = 'my-profile'

export type NewBooking = Omit<Booking, 'id' | 'status'>

export type AppDataValue = {
  currentUser: CurrentUser | null
  logIn: (user: CurrentUser) => void
  logOut: () => void

  // The nail technician profile created through onboarding.
  myProfile: NailTechProfile
  updateMyProfile: (changes: Partial<NailTechProfile>) => void
  isMyProfileComplete: boolean

  // Every profile customers can find: demo profiles plus yours once it's complete.
  technicians: NailTechProfile[]
  getTechnician: (id: string) => NailTechProfile | undefined

  bookings: Booking[]
  addBooking: (booking: NewBooking) => Booking
  updateBookingStatus: (id: string, status: BookingStatus) => void

  favourites: string[]
  toggleFavourite: (technicianId: string) => void
}

export const AppDataContext = createContext<AppDataValue | null>(null)
