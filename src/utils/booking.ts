import type { Booking, DayAvailability, NailTechProfile, Service } from '../types'

export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const defaultAvailability = (): DayAvailability[] =>
  WEEK_DAYS.map((day) => ({
    day,
    enabled: day !== 'Sunday',
    startTime: '09:00',
    endTime: day === 'Saturday' || day === 'Sunday' ? '15:00' : '17:00',
  }))

export const formatPrice = (price: number | string) =>
  `R ${Number(price).toLocaleString('en-ZA')}`

export const formatDuration = (minutes: number | string) => {
  const total = Number(minutes)
  const hours = Math.floor(total / 60)
  const mins = total % 60

  if (hours === 0) return `${mins} min`
  if (mins === 0) return hours === 1 ? '1 hr' : `${hours} hrs`
  return `${hours} hr ${mins} min`
}

// Dates are handled as local YYYY-MM-DD strings to avoid timezone shifts.
export const toDateKey = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export const fromDateKey = (key: string) => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const dayNameOf = (key: string) =>
  fromDateKey(key).toLocaleDateString('en-GB', { weekday: 'long' })

export const formatDate = (key: string) =>
  fromDateKey(key).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const fromMinutes = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`

export const lowestPrice = (services: Service[]) => {
  const prices = services.map((service) => Number(service.price)).filter((price) => price > 0)
  return prices.length > 0 ? Math.min(...prices) : null
}

export const isActiveBooking = (booking: Booking) =>
  booking.status === 'Pending' || booking.status === 'Confirmed'

export const isUpcoming = (booking: Booking) => booking.date >= toDateKey(new Date())

// The next `count` days the technician works, starting today if same-day bookings are allowed.
export const getBookableDates = (technician: NailTechProfile, count = 14) => {
  const dates: string[] = []
  const start = new Date()

  if (!technician.sameDayBookings) {
    start.setDate(start.getDate() + 1)
  }

  for (let offset = 0; offset < 28 && dates.length < count; offset++) {
    const date = new Date(start)
    date.setDate(start.getDate() + offset)
    const key = toDateKey(date)
    const workDay = technician.availability.find((item) => item.day === dayNameOf(key))

    if (workDay?.enabled) {
      dates.push(key)
    }
  }

  return dates
}

// 30-minute slots where the whole service fits inside working hours
// and does not overlap an existing pending or confirmed booking.
export const getTimeSlots = (
  technician: NailTechProfile,
  dateKey: string,
  durationMinutes: number,
  bookings: Booking[]
) => {
  const workDay = technician.availability.find((item) => item.day === dayNameOf(dateKey))

  if (!workDay?.enabled) return []

  const dayStart = toMinutes(workDay.startTime)
  const dayEnd = toMinutes(workDay.endTime)

  const taken = bookings
    .filter(
      (booking) =>
        booking.technicianId === technician.id &&
        booking.date === dateKey &&
        isActiveBooking(booking)
    )
    .map((booking) => ({
      start: toMinutes(booking.time),
      end: toMinutes(booking.time) + booking.duration,
    }))

  const now = new Date()
  const isToday = dateKey === toDateKey(now)
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + 60 : 0

  const slots: string[] = []

  for (let start = dayStart; start + durationMinutes <= dayEnd; start += 30) {
    const end = start + durationMinutes
    const overlaps = taken.some((slot) => start < slot.end && end > slot.start)

    if (!overlaps && start >= earliest) {
      slots.push(fromMinutes(start))
    }
  }

  return slots
}
