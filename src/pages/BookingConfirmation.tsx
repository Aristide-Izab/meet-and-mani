import { ArrowRight, CalendarDays, Check, Clock, MapPin, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import BookingStatusBadge from '../components/BookingStatusBadge'
import SiteHeader from '../components/SiteHeader'
import { useAppData } from '../context/useAppData'
import { formatDate, formatDuration, formatPrice } from '../utils/booking'

function BookingConfirmation() {
  const { bookingId } = useParams()
  const { bookings, getTechnician, currentUser } = useAppData()

  const booking = bookings.find((item) => item.id === bookingId)
  const technician = booking ? getTechnician(booking.technicianId) : undefined
  const canView = booking && currentUser?.email === booking.customerEmail

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        {!booking || !canView ? (
          <section className="bg-white border border-rose-100 rounded-[32px] p-8 sm:p-12 text-center">
            <h1 className="font-serif text-3xl mb-3">Booking not found</h1>
            <p className="text-gray-500 leading-relaxed mb-8">
              We couldn't find this booking. In this prototype, bookings are only
              kept until the page is refreshed.
            </p>
            <Link
              to="/nail-techs"
              className="inline-flex bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-3.5 px-7 font-semibold transition"
            >
              Find a nail tech
            </Link>
          </section>
        ) : (
          <>
            <section className="text-center mb-10">
              <div className="mx-auto mb-7 w-20 h-20 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#a55c72] flex items-center justify-center">
                  <Check size={30} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
                <Sparkles size={17} />
                REQUEST SENT
              </div>

              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                Your booking is{' '}
                <span className="italic text-[#b76f85]">requested.</span>
              </h1>

              <p className="text-gray-500 leading-relaxed max-w-md mx-auto">
                {booking.technicianName} will review your request. You'll see the
                status change on your dashboard once they accept it.
              </p>
            </section>

            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs tracking-widest font-semibold text-[#a55c72] mb-1">
                    BOOKING {booking.id}
                  </p>
                  <h2 className="font-serif text-2xl">{booking.serviceName}</h2>
                </div>
                <BookingStatusBadge status={booking.status} />
              </div>

              <dl className="space-y-4 text-sm border-t border-rose-100 pt-6">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Nail tech</dt>
                  <dd className="text-right">{booking.technicianName}</dd>
                </div>
                {technician && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> Area
                    </dt>
                    <dd className="text-right">
                      {technician.business.serviceArea}, {technician.business.city}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <CalendarDays size={14} /> Date
                  </dt>
                  <dd>{formatDate(booking.date)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> Time
                  </dt>
                  <dd>
                    {booking.time} ({formatDuration(booking.duration)})
                  </dd>
                </div>
                {booking.notes && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500 shrink-0">Your notes</dt>
                    <dd className="text-right text-gray-600">{booking.notes}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-t border-rose-100 pt-4">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-serif text-2xl">{formatPrice(booking.price)}</dd>
                </div>
              </dl>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/customer/dashboard"
                  className="flex-1 bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
                >
                  View my bookings
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/nail-techs"
                  className="px-7 border border-rose-100 hover:border-[#a55c72] text-gray-600 hover:text-[#a55c72] rounded-xl py-4 font-medium flex items-center justify-center transition"
                >
                  Keep browsing
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default BookingConfirmation
