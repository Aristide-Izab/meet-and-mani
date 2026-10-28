import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Eye,
  EyeOff,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Star,
} from 'lucide-react'
import DashboardHeader from '../components/DashboardHeader'
import DemoBadge from '../components/DemoBadge'

type Booking = {
  id: number
  technician: string
  service: string
  date: string
  time: string
  price: number
  status: 'Confirmed' | 'Pending'
}

// Demo values only. Real data will come from the backend.
const demoBookings: Booking[] = [
  {
    id: 1,
    technician: 'Sample Nail Studio',
    service: 'Gel Manicure',
    date: 'Sat, 1 Nov',
    time: '10:00',
    price: 350,
    status: 'Confirmed',
  },
  {
    id: 2,
    technician: 'Sample Nail Artist',
    service: 'Nail Art (full set)',
    date: 'Thu, 6 Nov',
    time: '14:30',
    price: 480,
    status: 'Pending',
  },
]

const demoTechnicians = [
  {
    name: 'Sample Nail Studio',
    area: 'Cape Town CBD',
    rating: '4.9',
    speciality: 'Gel & acrylics',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
  },
  {
    name: 'Sample Nail Artist',
    area: 'Bellville',
    rating: '4.8',
    speciality: 'Nail art',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600',
  },
  {
    name: 'Sample Mobile Tech',
    area: 'Claremont',
    rating: '4.7',
    speciality: 'Mobile visits',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600',
  },
]

function CustomerDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const firstName = (location.state as { firstName?: string } | null)?.firstName

  const [showSampleBookings, setShowSampleBookings] = useState(false)
  const [city, setCity] = useState('')

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Search will be connected to real nail technician listings later.
    console.log('Search city:', city)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <DashboardHeader label="Customer Account" />

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Prototype banner */}
        <div className="bg-[#fff7f9] border border-rose-100 rounded-2xl px-5 py-4 mb-10 flex items-start gap-3">
          <Sparkles size={18} className="text-[#a55c72] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-medium text-gray-700">Prototype preview.</span>{' '}
            Items marked <span className="font-semibold text-[#a55c72]">DEMO</span>{' '}
            are sample data to show how your account will work.
          </p>
        </div>

        {/* Welcome + search */}
        <section className="bg-[#fcf1ee] rounded-[32px] px-7 py-10 sm:px-10 md:px-14 mb-12">
          <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
            <Sparkles size={17} />
            YOUR BEAUTY SPACE
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-3">
            {firstName ? `Hi ${firstName},` : 'Welcome back,'}{' '}
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
                placeholder="Enter your city"
                aria-label="Your city"
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

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start mb-12">
          {/* Bookings */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
              <div>
                <h2 className="font-serif text-3xl mb-1">My bookings</h2>
                <p className="text-sm text-gray-500">
                  Your upcoming appointments will show here.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSampleBookings(!showSampleBookings)}
                className="self-start sm:self-auto inline-flex items-center gap-2 text-sm text-[#a55c72] border border-rose-100 hover:border-[#a55c72] rounded-full px-4 py-2 transition"
              >
                {showSampleBookings ? <EyeOff size={16} /> : <Eye size={16} />}
                {showSampleBookings ? 'Hide sample' : 'Show sample'}
              </button>
            </div>

            {showSampleBookings ? (
              <ul className="space-y-3">
                {demoBookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="rounded-2xl border border-[#e7c1cc] bg-[#fffafb] p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="sm:w-28 shrink-0">
                      <p className="text-sm font-medium">{booking.date}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={13} />
                        {booking.time}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{booking.service}</p>
                      <p className="text-xs text-gray-400 mt-1">{booking.technician}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">R {booking.price}</p>
                      <span
                        className={`text-xs rounded-full px-3 py-1 ${
                          booking.status === 'Confirmed'
                            ? 'bg-[#a55c72] text-white'
                            : 'bg-[#f9e9ed] text-[#a55c72]'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <DemoBadge />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-3xl bg-[#fff7f9] px-6 py-12 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-white flex items-center justify-center">
                  <CalendarDays size={24} className="text-[#a55c72]" />
                </div>
                <h3 className="font-serif text-2xl mb-2">No bookings yet</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  When you book an appointment with a nail technician, it will
                  appear here.
                </p>
              </div>
            )}
          </section>

          {/* Account summary */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
            <h2 className="font-serif text-3xl mb-6">Your account</h2>

            <div className="space-y-3">
              {[
                { icon: CalendarDays, label: 'Upcoming bookings', value: '2' },
                { icon: Heart, label: 'Saved nail techs', value: '3' },
                { icon: Star, label: 'Reviews written', value: '1' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-rose-100 p-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                    <Icon size={18} className="text-[#a55c72]" />
                  </div>
                  <p className="text-sm flex-1">{label}</p>
                  <p className="font-serif text-2xl">{value}</p>
                  <DemoBadge />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Saved / recommended technicians */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-3xl mb-1">Nail techs you may like</h2>
              <p className="text-sm text-gray-500">Sample profiles to show the layout.</p>
            </div>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#a55c72]"
            >
              Explore more <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoTechnicians.map((tech) => (
              <div
                key={tech.name}
                className="rounded-3xl overflow-hidden bg-white border border-rose-100"
              >
                <div className="relative">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <DemoBadge />
                  </div>
                  <button
                    type="button"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#a55c72]"
                    aria-label={`Save ${tech.name}`}
                  >
                    <Heart size={17} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-xl">{tech.name}</h3>
                    <p className="text-sm flex items-center gap-1 shrink-0">
                      <Star size={15} className="text-[#b76f85] fill-[#b76f85]" />
                      {tech.rating}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin size={14} />
                    {tech.area}
                  </p>
                  <p className="text-sm text-gray-400">{tech.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CustomerDashboard
