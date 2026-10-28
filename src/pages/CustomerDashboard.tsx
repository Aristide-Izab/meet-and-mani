import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Heart,
  History,
  Search,
  Sparkles,
} from 'lucide-react'
import BookingStatusBadge from '../components/BookingStatusBadge'
import DashboardHeader from '../components/DashboardHeader'
import TechnicianCard from '../components/TechnicianCard'
import { useAppData } from '../context/useAppData'
import type { Booking } from '../types'
import { formatDate, formatPrice, isActiveBooking, isUpcoming } from '../utils/booking'

const byDateTime = (a: Booking, b: Booking) =>
  `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)

function CustomerDashboard() {
  const navigate = useNavigate()
  const { currentUser, bookings, updateBookingStatus, favourites, technicians } =
    useAppData()

  const [city, setCity] = useState('')

  const myBookings = bookings.filter(
    (booking) => booking.customerEmail === currentUser?.email
  )
  const upcoming = myBookings
    .filter((booking) => isActiveBooking(booking) && isUpcoming(booking))
    .sort(byDateTime)
  const history = myBookings
    .filter((booking) => !(isActiveBooking(booking) && isUpcoming(booking)))
    .sort(byDateTime)
    .reverse()

  const savedTechnicians = technicians.filter((technician) =>
    favourites.includes(technician.id)
  )
  const suggestions = [...technicians]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3)

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(city.trim() ? `/nail-techs?city=${encodeURIComponent(city.trim())}` : '/nail-techs')
  }

  const handleCancel = (booking: Booking) => {
    if (window.confirm(`Cancel your ${booking.serviceName} on ${formatDate(booking.date)}?`)) {
      updateBookingStatus(booking.id, 'Cancelled')
    }
  }

  const stats = [
    { icon: CalendarDays, label: 'Upcoming bookings', value: upcoming.length },
    { icon: Heart, label: 'Saved nail techs', value: savedTechnicians.length },
    { icon: History, label: 'Total bookings', value: myBookings.length },
  ]

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <DashboardHeader label="Customer account" />

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Welcome + search */}
        <section className="bg-[#fcf1ee] rounded-[32px] px-7 py-10 sm:px-10 md:px-14 mb-10">
          <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
            <Sparkles size={17} />
            YOUR BEAUTY SPACE
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3">
            Hi {currentUser?.firstName},{' '}
            <span className="italic text-[#b76f85]">ready for fresh nails?</span>
          </h1>

          <p className="text-gray-500 mb-8 max-w-lg">
            Find a nail technician near you and book your next appointment.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <div className="flex items-center gap-3 flex-1 px-3">
              <Search className="text-[#b76f85]" size={20} />
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Enter your city or area"
                aria-label="Your city or area"
                className="outline-none w-full py-3 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-[#a55c72] hover:bg-[#87465b] text-white px-6 py-3 rounded-xl flex justify-center items-center gap-2 transition"
            >
              Find nail techs <ArrowRight size={17} />
            </button>
          </form>
        </section>

        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-5 mb-10">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white border border-rose-100 rounded-3xl p-6 flex items-center gap-4"
            >
              <div className="w-11 h-11 shrink-0 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                <Icon size={20} className="text-[#a55c72]" />
              </div>
              <div>
                <p className="font-serif text-3xl leading-none mb-1">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Bookings */}
        <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9 mb-12">
          <h2 className="font-serif text-3xl mb-1">My bookings</h2>
          <p className="text-sm text-gray-500 mb-7">
            Requests stay pending until the nail tech accepts them.
          </p>

          {upcoming.length > 0 ? (
            <ul className="space-y-3">
              {upcoming.map((booking) => (
                <li
                  key={booking.id}
                  className="rounded-2xl border border-[#e7c1cc] bg-[#fffafb] p-4 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="md:w-32 shrink-0">
                    <p className="text-sm font-medium">{formatDate(booking.date)}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={13} />
                      {booking.time}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{booking.serviceName}</p>
                    <Link
                      to={`/nail-techs/${booking.technicianId}`}
                      className="text-xs text-gray-500 hover:text-[#a55c72] mt-1 inline-block"
                    >
                      {booking.technicianName}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-sm font-medium">{formatPrice(booking.price)}</p>
                    <BookingStatusBadge status={booking.status} />
                    <Link
                      to={`/bookings/${booking.id}`}
                      className="text-xs text-[#a55c72] hover:underline"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleCancel(booking)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl bg-[#fff7f9] px-6 py-12 text-center">
              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <CalendarDays size={24} className="text-[#a55c72]" />
              </div>
              <h3 className="font-serif text-2xl mb-2">No upcoming bookings</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-6">
                Find a nail technician you love and request your first appointment.
              </p>
              <Link
                to="/nail-techs"
                className="inline-flex items-center gap-2 bg-[#a55c72] hover:bg-[#87465b] text-white rounded-full px-6 py-3 text-sm font-medium transition"
              >
                Find a nail tech <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-8 pt-7 border-t border-rose-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Past & cancelled</h3>
              <ul className="space-y-2">
                {history.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500"
                  >
                    <span className="w-28">{formatDate(booking.date)}</span>
                    <span className="flex-1">
                      {booking.serviceName} · {booking.technicianName}
                    </span>
                    <BookingStatusBadge status={booking.status} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Saved or suggested nail techs */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-3xl mb-1">
                {savedTechnicians.length > 0 ? 'Saved nail techs' : 'Nail techs you may like'}
              </h2>
              <p className="text-sm text-gray-500">
                {savedTechnicians.length > 0
                  ? 'Your favourites, ready to book again.'
                  : 'Tap the heart on a profile to save it here.'}
              </p>
            </div>
            <Link
              to="/nail-techs"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#a55c72]"
            >
              Explore more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(savedTechnicians.length > 0 ? savedTechnicians : suggestions).map(
              (technician) => (
                <TechnicianCard key={technician.id} technician={technician} />
              )
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CustomerDashboard
