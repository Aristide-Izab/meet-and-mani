// Shared types for the Meet&Mani frontend prototype.
// These shapes are a starting point for the future Spring Boot API and MySQL tables.

export type AccountType = 'customer' | 'nail-tech'

export type CurrentUser = {
  role: AccountType
  firstName: string
  lastName: string
  email: string
}

export type BusinessInfo = {
  businessName: string
  city: string
  serviceArea: string
  yearsExperience: string
  bio: string
}

export type Service = {
  id: number
  name: string
  description: string
  price: string
  duration: string
}

export type PortfolioImage = {
  id: number
  preview: string
  file?: File
}

export type DayAvailability = {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

export type Review = {
  id: number
  author: string
  rating: number
  comment: string
  date: string
}

export type NailTechProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  business: BusinessInfo
  services: Service[]
  portfolio: PortfolioImage[]
  availability: DayAvailability[]
  sameDayBookings: boolean
  rating: number | null
  reviews: Review[]
  isDemo: boolean
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Declined' | 'Cancelled'

export type Booking = {
  id: string
  technicianId: string
  technicianName: string
  customerName: string
  customerEmail: string
  serviceName: string
  price: number
  duration: number
  date: string // YYYY-MM-DD
  time: string // HH:mm
  notes: string
  status: BookingStatus
}
