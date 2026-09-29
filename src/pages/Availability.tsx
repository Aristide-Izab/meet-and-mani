import { useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type DayAvailability = {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

function Availability() {
  const navigate = useNavigate()

  const [availability, setAvailability] =
    useState<DayAvailability[]>([
      {
        day: 'Monday',
        enabled: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Tuesday',
        enabled: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Wednesday',
        enabled: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Thursday',
        enabled: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Friday',
        enabled: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Saturday',
        enabled: true,
        startTime: '09:00',
        endTime: '15:00',
      },
      {
        day: 'Sunday',
        enabled: false,
        startTime: '09:00',
        endTime: '15:00',
      },
    ])

  const [sameDayBookings, setSameDayBookings] =
    useState(false)

  const [error, setError] = useState('')

  const toggleDay = (day: string) => {
    setAvailability((currentAvailability) =>
      currentAvailability.map((item) =>
        item.day === day
          ? {
              ...item,
              enabled: !item.enabled,
            }
          : item
      )
    )

    setError('')
  }

  const updateTime = (
    day: string,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setAvailability((currentAvailability) =>
      currentAvailability.map((item) =>
        item.day === day
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )

    setError('')
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const workingDays = availability.filter(
      (item) => item.enabled
    )

    if (workingDays.length === 0) {
      setError(
        'Please select at least one day that you are available.'
      )
      return
    }

    const invalidTime = workingDays.some(
      (item) => item.startTime >= item.endTime
    )

    if (invalidTime) {
      setError(
        'Your finishing time must be later than your starting time.'
      )
      return
    }

    console.log('Availability:', availability)
    console.log('Same-day bookings:', sameDayBookings)

    // Temporary until the onboarding completion/dashboard page exists
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      {/* Header */}
      <header className="bg-white border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-[#a55c72]"
          >
            Meet&Mani
            <span className="text-[#dca7b6]">.</span>
          </Link>

          <p className="hidden sm:block text-sm text-gray-400">
            Nail Technician Setup
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <Link
          to="/nail-tech/portfolio"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-10"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20 items-start">
          {/* Left side */}
          <section className="lg:pt-10">
            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
              <Sparkles size={17} />
              SET YOUR SCHEDULE
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Work when it
              <br />
              works for{' '}
              <span className="italic text-[#b76f85]">
                you.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
              Set the days and hours you're normally available so
              customers know when they can book your services.
            </p>

            <div className="bg-[#f9e9ed] rounded-3xl p-7 max-w-md">
              <CalendarDays
                size={30}
                className="text-[#a55c72] mb-4"
              />

              <h3 className="font-serif text-2xl mb-2">
                You're in control
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Your availability helps Meet&Mani show customers
                suitable booking times while keeping your schedule
                manageable.
              </p>
            </div>
          </section>

          {/* Availability card */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">
            {/* Progress */}
            <div className="mb-9">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72]">
                  STEP 5 OF 5
                </p>

                <p className="text-xs text-gray-400">
                  Availability
                </p>
              </div>

              <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#a55c72] rounded-full" />
              </div>
            </div>

            <h2 className="font-serif text-3xl mb-2">
              Your weekly availability
            </h2>

            <p className="text-gray-500 mb-8">
              Choose your regular working days and hours.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* Days */}
              <div className="space-y-3">
                {availability.map((item) => (
                  <div
                    key={item.day}
                    className={`rounded-2xl border p-4 transition ${
                      item.enabled
                        ? 'border-[#e7c1cc] bg-[#fffafb]'
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Day toggle */}
                      <div className="flex items-center gap-3 sm:w-36">
                        <button
                          type="button"
                          onClick={() =>
                            toggleDay(item.day)
                          }
                          className={`relative w-11 h-6 rounded-full transition ${
                            item.enabled
                              ? 'bg-[#a55c72]'
                              : 'bg-gray-300'
                          }`}
                          aria-label={`Toggle ${item.day}`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              item.enabled
                                ? 'left-6'
                                : 'left-1'
                            }`}
                          />
                        </button>

                        <p
                          className={`text-sm font-medium ${
                            item.enabled
                              ? 'text-gray-800'
                              : 'text-gray-400'
                          }`}
                        >
                          {item.day}
                        </p>
                      </div>

                      {/* Times */}
                      {item.enabled ? (
                        <div className="flex flex-1 items-center gap-3">
                          <div className="relative flex-1">
                            <Clock
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />

                            <input
                              type="time"
                              value={item.startTime}
                              onChange={(event) =>
                                updateTime(
                                  item.day,
                                  'startTime',
                                  event.target.value
                                )
                              }
                              className="w-full border border-rose-100 rounded-xl py-2.5 pl-9 pr-2 text-sm outline-none focus:border-[#a55c72]"
                            />
                          </div>

                          <span className="text-sm text-gray-400">
                            to
                          </span>

                          <div className="relative flex-1">
                            <Clock
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />

                            <input
                              type="time"
                              value={item.endTime}
                              onChange={(event) =>
                                updateTime(
                                  item.day,
                                  'endTime',
                                  event.target.value
                                )
                              }
                              className="w-full border border-rose-100 rounded-xl py-2.5 pl-9 pr-2 text-sm outline-none focus:border-[#a55c72]"
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Unavailable
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Same-day booking */}
              <div className="border-t border-rose-100 pt-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-medium mb-1">
                      Accept same-day bookings
                    </p>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      Allow customers to request appointments on
                      the same day when you have availability.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSameDayBookings(
                        !sameDayBookings
                      )
                    }
                    className={`relative shrink-0 w-12 h-7 rounded-full transition ${
                      sameDayBookings
                        ? 'bg-[#a55c72]'
                        : 'bg-gray-300'
                    }`}
                    aria-label="Toggle same-day bookings"
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                        sameDayBookings
                          ? 'left-6'
                          : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Info */}
              <div className="bg-[#fff7f9] rounded-2xl p-5">
                <p className="text-sm font-medium mb-2">
                  You can change this later
                </p>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Once your profile is set up, you'll be able to
                  update your working hours and availability from
                  your nail technician dashboard.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Complete Setup
                <Check size={18} />
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Availability