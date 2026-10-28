import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AccountTypeToggle, { type AccountType } from '../components/AccountTypeToggle'

const content = {
  customer: {
    eyebrow: 'WELCOME BACK',
    heading: 'Your next',
    highlight: 'nail moment',
    ending: 'awaits.',
    text: 'Log in to find nail technicians near you, manage your bookings and save your favourite artists.',
    dashboard: '/customer/dashboard',
  },
  'nail-tech': {
    eyebrow: 'FOR BEAUTY PROFESSIONALS',
    heading: 'Welcome back to',
    highlight: 'your business.',
    ending: '',
    text: 'Log in to manage your appointments, services, portfolio and availability.',
    dashboard: '/nail-tech/dashboard',
  },
}

function Login() {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState<AccountType>('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const current = content[accountType]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }

    // Dummy login: any email and password is accepted.
    // Real authentication will be added with the Spring Boot backend.
    console.log('Login:', { accountType, email: form.email })
    navigate(current.dashboard)
  }

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
            New to Meet&Mani?{' '}
            <Link to="/register" className="text-[#a55c72] font-semibold">
              Sign up
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
              {current.eyebrow}
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              {current.heading}
              <br />
              <span className="italic text-[#b76f85]">{current.highlight}</span>{' '}
              {current.ending}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
              {current.text}
            </p>
          </section>

          {/* Form card */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">
            <h2 className="font-serif text-3xl mb-2">Log in</h2>
            <p className="text-gray-500 mb-7">Choose your account type.</p>

            <AccountTypeToggle
              value={accountType}
              onChange={(type) => {
                setAccountType(type)
                setError('')
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-5 mt-7">
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
                  className="w-full border border-rose-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-[#a55c72] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border border-rose-100 rounded-xl px-4 py-3.5 pr-12 outline-none focus:border-[#a55c72]"
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

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Log in as {accountType === 'customer' ? 'Customer' : 'Nail Technician'}
                <ArrowRight size={18} />
              </button>

              <div className="bg-[#fff7f9] rounded-2xl p-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-medium text-gray-700">Demo login.</span>{' '}
                  Any email and password will work for now. Real accounts will be
                  connected when the backend is built.
                </p>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#a55c72] font-semibold">
                  Sign up
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login
