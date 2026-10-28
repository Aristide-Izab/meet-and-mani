import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Eye,
  EyeOff,
  Image,
  Scissors,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AccountTypeToggle, { type AccountType } from '../components/AccountTypeToggle'

const onboardingSteps = [
  { label: 'Create your account', icon: UserRound },
  { label: 'Add your business details', icon: Store },
  { label: 'List your services and prices', icon: Scissors },
  { label: 'Upload your portfolio', icon: Image },
  { label: 'Set your availability', icon: CalendarDays },
]

function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [accountType, setAccountType] = useState<AccountType>(
    searchParams.get('type') === 'nail-tech' ? 'nail-tech' : 'customer'
  )
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }

    if (form.password.length < 8) {
      setError('Your password must be at least 8 characters.')
      return
    }

    if (!agreed) {
      setError('Please accept the terms to continue.')
      return
    }

    // Dummy registration: nothing is saved yet.
    // Real accounts will be created through the Spring Boot backend.
    console.log('Customer registration:', { ...form, password: '[hidden]' })
    navigate('/customer/dashboard', { state: { firstName: form.firstName } })
  }

  const inputClass =
    'w-full border border-rose-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]'

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-[#a55c72]"
          >
            Meet&Mani<span className="text-[#dca7b6]">.</span>
          </Link>

          <p className="hidden sm:block text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#a55c72] font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-10"
        >
          <ArrowLeft size={17} />
          Back to home
        </Link>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left side */}
          <section className="lg:pt-10">
            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
              <Sparkles size={17} />
              JOIN MEET&MANI
            </div>

            {accountType === 'customer' ? (
              <>
                <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
                  Find your
                  <br />
                  <span className="italic text-[#b76f85]">perfect nail tech.</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                  Create a free account to discover talented nail technicians near
                  you, explore their work and book appointments in one place.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
                  Turn your talent
                  <br />
                  into a{' '}
                  <span className="italic text-[#b76f85]">growing business.</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                  Showcase your work, list your services and let customers book
                  you, all from one professional profile.
                </p>
              </>
            )}
          </section>

          {/* Form card */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">
            <h2 className="font-serif text-3xl mb-2">Create an account</h2>
            <p className="text-gray-500 mb-7">How will you use Meet&Mani?</p>

            <AccountTypeToggle
              value={accountType}
              onChange={(type) => {
                setAccountType(type)
                setError('')
              }}
            />

            {accountType === 'customer' ? (
              <form onSubmit={handleSubmit} className="space-y-5 mt-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Thandi"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Mokoena"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone number <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="071 234 5678"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="At least 8 characters"
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#a55c72]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => {
                      setAgreed(event.target.checked)
                      setError('')
                    }}
                    className="mt-0.5 accent-[#a55c72]"
                  />
                  I agree to the Terms of Service and Privacy Policy.
                </label>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
                >
                  Create Customer Account
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="mt-7">
                <p className="text-sm text-gray-500 mb-5">
                  Setting up your professional profile takes five short steps:
                </p>

                <ol className="space-y-3 mb-7">
                  {onboardingSteps.map(({ label, icon: Icon }, index) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-[#fffafb] px-4 py-3"
                    >
                      <span className="w-7 h-7 shrink-0 rounded-full bg-[#a55c72] text-white text-xs font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-sm font-medium flex-1">{label}</p>
                      <Icon size={17} className="text-[#a55c72]" />
                    </li>
                  ))}
                </ol>

                <Link
                  to="/nail-tech/register"
                  className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
                >
                  Start Nail Technician Setup
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#a55c72] font-semibold">
                Log in
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Register
