import { useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { useAppData } from '../context/useAppData'
import {
  formatDate,
  formatDuration,
  formatPrice,
  fromDateKey,
  getBookableDates,
  getTimeSlots,
} from '../utils/booking'
import NotFound from './NotFound'

function BookAppointment() {
  const { id = '' } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { getTechnician, currentUser, bookings, addBooking } = useAppData()

  const technician = getTechnician(id)

  const [serviceId, setServiceId] = useState(() => {
    const requested = Number(searchParams.get('service'))
    const exists = technician?.services.some((service) => service.id === requested)
    return exists ? requested : (technician?.services[0]?.id ?? 0)
  })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  if (!technician) {
    return <NotFound />
  }

  const service = technician.services.find((item) => item.id === serviceId)
  const duration = Number(service?.duration ?? 0)
  const dates = getBookableDates(technician)
  const slots = date && service ? getTimeSlots(technician, date, duration, bookings) : []
  const selectedTime = slots.includes(time) ? time : ''

  const isCustomer = currentUser?.role === 'customer'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!service || !date || !selectedTime) {
      setError('Please choose a service, date and time.')
      return
    }

    if (!currentUser) return

    const booking = addBooking({
      technicianId: technician.id,
      technicianName: technician.business.businessName,
      customerName: `${currentUser.firstName} ${currentUser.lastName}`.trim(),
      customerEmail: currentUser.email,
      serviceName: service.name,
      price: Number(service.price),
      duration,
      date,
      time: selectedTime,
      notes: notes.trim(),
    })

    navigate(`/bookings/${booking.id}`)
  }

  const optionClass = (selected: boolean) =>
    `rounded-2xl border px-4 py-3 text-sm transition ${
      selected
        ? 'border-[#a55c72] bg-[#fff7f9] text-[#a55c72] font-medium'
        : 'border-rose-100 bg-white hover:border-[#dca7b6]'
    }`

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <Link
          to={`/nail-techs/${technician.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-8"
        >
          <ArrowLeft size={17} />
          Back to profile
        </Link>

        <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
          <Sparkles size={17} />
          BOOK AN APPOINTMENT
        </div>

        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10">
          Book with{' '}
          <span className="italic text-[#b76f85]">
            {technician.business.businessName}
          </span>
        </h1>

        {!isCustomer ? (
          /* Must be logged in as a customer to book */
          <section className="bg-white border border-rose-100 rounded-[32px] p-8 sm:p-12 text-center max-w-xl">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#f9e9ed] flex items-center justify-center">
              <UserRound size={24} className="text-[#a55c72]" />
            </div>

            <h2 className="font-serif text-3xl mb-3">Log in to book</h2>

            <p className="text-gray-500 leading-relaxed mb-8">
              {currentUser?.role === 'nail-tech'
                ? "You're logged in as a nail technician. Log out and use a customer account to make a booking."
                : 'Create a free customer account or log in to request this appointment.'}
            </p>

            {currentUser?.role !== 'nail-tech' && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/login"
                  state={{ from: location.pathname + location.search, accountType: 'customer' }}
                  className="bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-3.5 px-7 font-semibold transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  state={{ from: location.pathname + location.search }}
                  className="border border-rose-100 hover:border-[#a55c72] text-[#a55c72] rounded-xl py-3.5 px-7 font-medium transition"
                >
                  Create account
                </Link>
              </div>
            )}
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start"
          >
            <div className="space-y-8">
              {/* 1. Service */}
              <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72] mb-2">
                  STEP 1
                </p>
                <h2 className="font-serif text-2xl mb-5">Choose a service</h2>

                <div className="space-y-3">
                  {technician.services.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-4 cursor-pointer ${optionClass(
                        item.id === serviceId
                      )}`}
                    >
                      <input
                        type="radio"
                        name="service"
                        checked={item.id === serviceId}
                        onChange={() => {
                          setServiceId(item.id)
                          setError('')
                        }}
                        className="accent-[#a55c72]"
                      />
                      <span className="flex-1">
                        <span className="block text-gray-800">{item.name}</span>
                        <span className="block text-xs text-gray-400 mt-0.5">
                          {formatDuration(item.duration)}
                        </span>
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(item.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 2. Date */}
              <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72] mb-2">
                  STEP 2
                </p>
                <h2 className="font-serif text-2xl mb-5">Pick a date</h2>

                {dates.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {dates.map((dateKey) => {
                      const day = fromDateKey(dateKey)

                      return (
                        <button
                          key={dateKey}
                          type="button"
                          onClick={() => {
                            setDate(dateKey)
                            setTime('')
                            setError('')
                          }}
                          className={`text-center ${optionClass(date === dateKey)}`}
                        >
                          <span className="block text-xs text-gray-400">
                            {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                          </span>
                          <span className="block text-lg font-serif">{day.getDate()}</span>
                          <span className="block text-xs">
                            {day.toLocaleDateString('en-GB', { month: 'short' })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    This nail tech has no available days at the moment.
                  </p>
                )}
              </section>

              {/* 3. Time */}
              <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72] mb-2">
                  STEP 3
                </p>
                <h2 className="font-serif text-2xl mb-5">Choose a time</h2>

                {!date ? (
                  <p className="text-sm text-gray-500">Pick a date first to see open times.</p>
                ) : slots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setTime(slot)
                          setError('')
                        }}
                        className={optionClass(selectedTime === slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No open times on {formatDate(date)} for this service. Try another date.
                  </p>
                )}
              </section>

              {/* 4. Notes */}
              <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72] mb-2">
                  STEP 4 · OPTIONAL
                </p>
                <h2 className="font-serif text-2xl mb-5">Anything to add?</h2>

                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder="e.g. colour ideas, nail length, or inspiration you'll bring along"
                  className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
                <p className="text-right text-xs text-gray-400 mt-1">{notes.length}/300</p>
              </section>
            </div>

            {/* Summary */}
            <aside className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9 lg:sticky lg:top-6">
              <h2 className="font-serif text-2xl mb-6">Booking summary</h2>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={technician.portfolio[0]?.preview}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover bg-[#f9e9ed]"
                />
                <div>
                  <p className="font-medium">{technician.business.businessName}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={13} />
                    {technician.business.serviceArea}
                  </p>
                </div>
              </div>

              <dl className="space-y-3 text-sm border-t border-rose-100 pt-5 mb-5">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Service</dt>
                  <dd className="text-right">{service?.name ?? '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <CalendarDays size={14} /> Date
                  </dt>
                  <dd>{date ? formatDate(date) : '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> Time
                  </dt>
                  <dd>
                    {selectedTime
                      ? `${selectedTime} (${formatDuration(duration)})`
                      : '—'}
                  </dd>
                </div>
              </dl>

              <div className="flex justify-between items-center border-t border-rose-100 pt-5 mb-6">
                <p className="font-medium">Total</p>
                <p className="font-serif text-2xl">
                  {service ? formatPrice(service.price) : '—'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Request booking
                <Check size={18} />
              </button>

              <p className="text-xs text-gray-400 leading-relaxed mt-4">
                Your request is confirmed once the nail tech accepts it. Online
                payments aren't part of this prototype.
              </p>
            </aside>
          </form>
        )}
      </main>
    </div>
  )
}

export default BookAppointment
