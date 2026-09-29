import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function NailTechRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Backend connection will be added later.
    console.log('Nail technician registration:', form)
    navigate('/nail-tech/business-details')
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
            Already have an account?{' '}
            <button className="text-[#a55c72] font-semibold">
              Log in
            </button>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        {/* Back */}
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
              FOR BEAUTY PROFESSIONALS
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Turn your talent
              <br />
              into a{' '}
              <span className="italic text-[#b76f85]">
                growing business.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
              Create your Meet&Mani professional profile, showcase your
              work and make it easier for customers to discover and book
              your services.
            </p>

            <div className="space-y-6">
              {[
                ['01', 'Showcase your work', 'Build a professional portfolio of your nail designs.'],
                ['02', 'Manage your services', 'Set your services, pricing and availability.'],
                ['03', 'Receive bookings', 'Let customers discover and book appointments with you.'],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[#f8e7eb] flex items-center justify-center text-[#a55c72] font-semibold">
                    {number}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">
                      {title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Registration card */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">

            {/* Progress */}
            <div className="mb-9">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72]">
                  STEP 1 OF 5
                </p>

                <p className="text-xs text-gray-400">
                  Create Account
                </p>
              </div>

              <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-1/5 h-full bg-[#a55c72] rounded-full" />
              </div>
            </div>

            <h2 className="font-serif text-3xl mb-2">
              Let's get you started
            </h2>

            <p className="text-gray-500 mb-8">
              First, create your professional account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pr-12 outline-none focus:border-[#a55c72]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm text-gray-500">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-[#a55c72]"
                />

                <span>
                  I agree to the Meet&Mani Terms of Service and Privacy
                  Policy.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-7 sm:hidden">
              Already have an account?{' '}
              <button className="text-[#a55c72] font-semibold">
                Log in
              </button>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default NailTechRegister