import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  Eye,
  EyeOff,
  Image,
  Scissors,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import DashboardHeader from '../components/DashboardHeader'
import DemoBadge from '../components/DemoBadge'

type Appointment = {
  id: number
  customer: string
  service: string
  date: string
  time: string
  price: number
  status: 'Confirmed' | 'Pending'
}

// Demo values only. Real figures will come from the backend.
const demoStats = [
  { label: 'Upcoming appointments', value: '3', note: 'Next 7 days', icon: CalendarCheck },
  { label: 'Total bookings', value: '24', note: 'All time', icon: TrendingUp },
  { label: 'Earnings this month', value: 'R 4,850', note: 'Before fees', icon: Wallet },
]

const demoAppointments: Appointment[] = [
  {
    id: 1,
    customer: 'Sample Customer A',
    service: 'Gel Manicure',
    date: 'Tue, 28 Oct',
    time: '10:00',
    price: 350,
    status: 'Confirmed',
  },
  {
    id: 2,
    customer: 'Sample Customer B',
    service: 'Acrylic Full Set',
    date: 'Wed, 29 Oct',
    time: '13:30',
    price: 550,
    status: 'Pending',
  },
  {
    id: 3,
    customer: 'Sample Customer C',
    service: 'Nail Art (per nail)',
    date: 'Fri, 31 Oct',
    time: '15:00',
    price: 180,
    status: 'Confirmed',
  },
]

const quickActions = [
  {
    title: 'Services & pricing',
    text: 'Add, edit or remove the services you offer.',
    to: '/nail-tech/services',
    icon: Scissors,
  },
  {
    title: 'Portfolio',
    text: 'Showcase your latest work and choose a cover photo.',
    to: '/nail-tech/portfolio',
    icon: Image,
  },
  {
    title: 'Availability',
    text: 'Update your working days and hours.',
    to: '/nail-tech/availability',
    icon: CalendarDays,
  },
]

function NailTechDashboard() {
  const [showSampleAppointments, setShowSampleAppointments] = useState(false)

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <DashboardHeader label="Nail Technician Account" />

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Prototype banner */}
        <div className="bg-[#fff7f9] border border-rose-100 rounded-2xl px-5 py-4 mb-10 flex items-start gap-3">
          <Sparkles size={18} className="text-[#a55c72] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-medium text-gray-700">Prototype preview.</span>{' '}
            Figures and appointments marked{' '}
            <span className="font-semibold text-[#a55c72]">DEMO</span> are sample
            data. Real bookings and earnings will appear once the backend is
            connected.
          </p>
        </div>

        {/* Welcome */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
            <Sparkles size={17} />
            YOUR BUSINESS
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Welcome <span className="italic text-[#b76f85]">back.</span>
          </h1>

          <p className="text-gray-500 mt-3 max-w-lg">
            Here's an overview of your nail business on Meet&Mani.
          </p>
        </section>

        {/* Overview cards */}
        <section className="grid sm:grid-cols-3 gap-5 mb-12">
          {demoStats.map(({ label, value, note, icon: Icon }) => (
            <div key={label} className="bg-white border border-rose-100 rounded-3xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                  <Icon size={20} className="text-[#a55c72]" />
                </div>
                <DemoBadge />
              </div>

              <p className="font-serif text-4xl mb-1">{value}</p>
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{note}</p>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          {/* Appointments */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
              <div>
                <h2 className="font-serif text-3xl mb-1">Upcoming appointments</h2>
                <p className="text-sm text-gray-500">Your next bookings will show here.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowSampleAppointments(!showSampleAppointments)}
                className="self-start sm:self-auto inline-flex items-center gap-2 text-sm text-[#a55c72] border border-rose-100 hover:border-[#a55c72] rounded-full px-4 py-2 transition"
              >
                {showSampleAppointments ? <EyeOff size={16} /> : <Eye size={16} />}
                {showSampleAppointments ? 'Hide sample' : 'Show sample'}
              </button>
            </div>

            {showSampleAppointments ? (
              <ul className="space-y-3">
                {demoAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="rounded-2xl border border-[#e7c1cc] bg-[#fffafb] p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="sm:w-28 shrink-0">
                      <p className="text-sm font-medium">{appointment.date}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={13} />
                        {appointment.time}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{appointment.service}</p>
                      <p className="text-xs text-gray-400 mt-1">{appointment.customer}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">R {appointment.price}</p>
                      <span
                        className={`text-xs rounded-full px-3 py-1 ${
                          appointment.status === 'Confirmed'
                            ? 'bg-[#a55c72] text-white'
                            : 'bg-[#f9e9ed] text-[#a55c72]'
                        }`}
                      >
                        {appointment.status}
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
                <h3 className="font-serif text-2xl mb-2">No appointments yet</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  When customers book your services, their appointments will
                  appear here.
                </p>
                <Link
                  to="/nail-tech/availability"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#a55c72] mt-5"
                >
                  Check availability <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </section>

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
