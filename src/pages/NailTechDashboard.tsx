import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  Check,
  Clock,
  Eye,
  Image,
  Inbox,
  MapPin,
  Scissors,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react'
import BookingStatusBadge from '../components/BookingStatusBadge'
import DashboardHeader from '../components/DashboardHeader'
import { MY_PROFILE_ID } from '../context/AppDataContext'
import { useAppData } from '../context/useAppData'
import type { Booking } from '../types'
import { formatDate, formatDuration, formatPrice, isUpcoming } from '../utils/booking'

const byDateTime = (a: Booking, b: Booking) =>
  `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)

const quickActions = [
  {
    title: 'Business details',
    text: 'Update your business name, area and bio.',
    to: '/nail-tech/business-details?mode=edit',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Services & pricing',
    text: 'Add, edit or remove the services you offer.',
    to: '/nail-tech/services?mode=edit',
    icon: Scissors,
  },
  {
    title: 'Portfolio',
    text: 'Showcase your latest work and choose a cover photo.',
    to: '/nail-tech/portfolio?mode=edit',
    icon: Image,
  },
  {
    title: 'Availability',
    text: 'Update your working days and hours.',
    to: '/nail-tech/availability?mode=edit',
    icon: CalendarDays,
  },
]

function NailTechDashboard() {
  const location = useLocation()
  const { currentUser, myProfile, isMyProfileComplete, bookings, updateBookingStatus } =
    useAppData()

  const [showSetupBanner, setShowSetupBanner] = useState(
    Boolean((location.state as { setupComplete?: boolean } | null)?.setupComplete)
  )

  const myBookings = bookings.filter((booking) => booking.technicianId === MY_PROFILE_ID)
  const requests = myBookings
    .filter((booking) => booking.status === 'Pending' && isUpcoming(booking))
    .sort(byDateTime)
  const confirmed = myBookings
    .filter((booking) => booking.status === 'Confirmed' && isUpcoming(booking))
    .sort(byDateTime)
  const earnings = myBookings
    .filter((booking) => booking.status === 'Confirmed')
    .reduce((total, booking) => total + booking.price, 0)

  const setupSteps = [
    {
      label: 'Business details',
      done: myProfile.business.businessName.trim() !== '',
      to: '/nail-tech/business-details',
    },
    { label: 'Services & pricing', done: myProfile.services.length > 0, to: '/nail-tech/services' },
    { label: 'Portfolio', done: myProfile.portfolio.length > 0, to: '/nail-tech/portfolio' },
    {
      label: 'Availability',
      done: myProfile.availability.some((day) => day.enabled),
      to: '/nail-tech/availability',
    },
  ]
  const nextStep = setupSteps.find((step) => !step.done)

  const stats = [
    { label: 'New requests', value: String(requests.length), icon: Inbox },
    { label: 'Upcoming appointments', value: String(confirmed.length), icon: CalendarCheck },
    { label: 'Confirmed earnings', value: formatPrice(earnings), icon: Wallet },
  ]

  const bookingRow = (booking: Booking, actions: React.ReactNode) => (
    <li
      key={booking.id}
      className="rounded-2xl border border-[#e7c1cc] bg-[#fffafb] p-4 flex flex-col md:flex-row md:items-center gap-4"
    >
      <div className="md:w-32 shrink-0">
        <p className="text-sm font-medium">{formatDate(booking.date)}</p>
        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
          <Clock size={13} />
          {booking.time} · {formatDuration(booking.duration)}
        </p>
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">{booking.serviceName}</p>
        <p className="text-xs text-gray-400 mt-1">{booking.customerName}</p>
        {booking.notes && (
          <p className="text-xs text-gray-500 mt-2 italic">"{booking.notes}"</p>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-sm font-medium">{formatPrice(booking.price)}</p>
        {actions}
      </div>
    </li>
  )

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <DashboardHeader label="Nail technician account" />

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Setup complete banner */}
        {showSetupBanner && isMyProfileComplete && (
          <div className="bg-[#a55c72] text-white rounded-2xl px-5 py-4 mb-8 flex items-start gap-3">
            <Check size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed flex-1">
              <span className="font-semibold">Setup complete.</span> Your profile now
              shows up when customers search in this prototype.
            </p>
            <button
              type="button"
              onClick={() => setShowSetupBanner(false)}
              aria-label="Dismiss"
              className="shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Welcome */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
            <Sparkles size={17} />
            YOUR BUSINESS
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Welcome back,{' '}
            <span className="italic text-[#b76f85]">{currentUser?.firstName}.</span>
          </h1>
        </section>

        {/* Profile status */}
        {isMyProfileComplete ? (
          <section className="bg-white border border-rose-100 rounded-[32px] p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={myProfile.portfolio[0]?.preview}
              alt="Your cover photo"
              className="w-full sm:w-24 h-40 sm:h-24 rounded-2xl object-cover bg-[#f9e9ed]"
            />
            <div className="flex-1">
              <p className="font-serif text-2xl">{myProfile.business.businessName}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={14} />
                {myProfile.business.serviceArea}, {myProfile.business.city}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {myProfile.services.length} services · {myProfile.portfolio.length} photos ·{' '}
                {myProfile.availability.filter((day) => day.enabled).length} working days
              </p>
            </div>
            <Link
              to={`/nail-techs/${MY_PROFILE_ID}`}
              className="inline-flex items-center justify-center gap-2 border border-rose-100 hover:border-[#a55c72] text-[#a55c72] rounded-full px-5 py-2.5 text-sm font-medium transition"
            >
              <Eye size={16} />
              View public profile
            </Link>
          </section>
        ) : (
          <section className="bg-[#f9e9ed] rounded-[32px] p-7 sm:p-9 mb-10">
            <h2 className="font-serif text-3xl mb-2">Finish setting up your profile</h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              Customers can find and book you once these steps are done.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {setupSteps.map((step) => (
                <Link
                  key={step.label}
                  to={step.to}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 text-sm hover:ring-1 hover:ring-[#a55c72] transition"
                >
                  <span
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${
                      step.done ? 'bg-[#a55c72] text-white' : 'border border-[#dca7b6]'
                    }`}
                  >
                    {step.done && <Check size={14} />}
                  </span>
                  {step.label}
                </Link>
              ))}
            </div>

            {nextStep && (
              <Link
                to={nextStep.to}
                className="inline-flex items-center gap-2 bg-[#a55c72] hover:bg-[#87465b] text-white rounded-full px-6 py-3 text-sm font-medium transition"
              >
                Continue with {nextStep.label.toLowerCase()}
                <ArrowRight size={16} />
              </Link>
            )}
          </section>
        )}

        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-5 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-rose-100 rounded-3xl p-6">
              <div className="w-11 h-11 rounded-full bg-[#f9e9ed] flex items-center justify-center mb-5">
                <Icon size={20} className="text-[#a55c72]" />
              </div>
              <p className="font-serif text-4xl mb-1">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <div className="space-y-8">
            {/* Requests */}
            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
              <h2 className="font-serif text-3xl mb-1">Booking requests</h2>
              <p className="text-sm text-gray-500 mb-7">
                Accept or decline new requests from customers.
              </p>

              {requests.length > 0 ? (
                <ul className="space-y-3">
                  {requests.map((booking) =>
                    bookingRow(
                      booking,
                      <>
                        <button
                          type="button"
                          onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                          className="inline-flex items-center gap-1 bg-[#a55c72] hover:bg-[#87465b] text-white text-xs font-medium rounded-full px-4 py-2 transition"
                        >
                          <Check size={14} />
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBookingStatus(booking.id, 'Declined')}
                          className="inline-flex items-center gap-1 border border-rose-100 hover:border-red-200 text-gray-500 hover:text-red-500 text-xs font-medium rounded-full px-4 py-2 transition"
                        >
                          <X size={14} />
                          Decline
                        </button>
                      </>
                    )
                  )}
                </ul>
              ) : (
                <div className="rounded-3xl bg-[#fff7f9] px-6 py-10 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Inbox size={22} className="text-[#a55c72]" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">No new requests</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                    {isMyProfileComplete
                      ? 'To test this, log out, sign up as a customer, find your business and request a booking.'
                      : 'Requests will appear here once your profile is complete.'}
                  </p>
                </div>
              )}
            </section>

            {/* Upcoming */}
            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
              <h2 className="font-serif text-3xl mb-1">Upcoming appointments</h2>
              <p className="text-sm text-gray-500 mb-7">Bookings you've accepted.</p>

              {confirmed.length > 0 ? (
                <ul className="space-y-3">
                  {confirmed.map((booking) =>
                    bookingRow(booking, <BookingStatusBadge status={booking.status} />)
                  )}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No confirmed appointments yet.</p>
              )}
            </section>
          </div>

          {/* Quick actions */}
          <section>
            <h2 className="font-serif text-3xl mb-5">Manage your profile</h2>

            <div className="space-y-3">
              {quickActions.map(({ title, text, to, icon: Icon }) => (
                <Link
                  key={title}
                  to={to}
                  className="group flex items-center gap-4 bg-white border border-rose-100 hover:border-[#a55c72] rounded-2xl p-5 transition"
                >
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                    <Icon size={20} className="text-[#a55c72]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{text}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-gray-300 group-hover:text-[#a55c72] transition"
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default NailTechDashboard
