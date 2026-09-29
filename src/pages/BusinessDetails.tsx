import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Sparkles
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function BusinessDetails() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    businessName: '',
    city: '',
    serviceArea: '',
    yearsExperience: '',
    bio: '',
  })

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Business details:', form)

    navigate('/nail-tech/services')
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
            Meet&Mani<span className="text-[#dca7b6]">.</span>
          </Link>

          <p className="text-sm text-gray-400 hidden sm:block">
            Nail Technician Setup
          </p>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        <Link
          to="/nail-tech/register"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-10"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left */}
          <section className="lg:pt-10">

            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
              <Sparkles size={17} />
              BUILD YOUR PROFILE
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Tell customers
              <br />
              about{' '}
              <span className="italic text-[#b76f85]">
                your business.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
              Your professional profile helps customers understand who
              you are, where you work and what makes your nail business
              special.
            </p>

            <div className="bg-[#f9e9ed] rounded-3xl p-7 max-w-md">
              <BriefcaseBusiness
                className="text-[#a55c72] mb-4"
                size={30}
              />

              <h3 className="font-serif text-2xl mb-2">
                Your professional identity
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                These details will eventually appear on your public
                Meet&Mani profile when customers discover your
                services.
              </p>
            </div>

          </section>

          {/* Form */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">

            {/* Progress */}
            <div className="mb-9">

              <div className="flex justify-between items-center mb-3">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72]">
                  STEP 2 OF 5
                </p>

                <p className="text-xs text-gray-400">
                  Business Details
                </p>
              </div>

              <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-2/5 h-full bg-[#a55c72] rounded-full" />
              </div>

            </div>

            <h2 className="font-serif text-3xl mb-2">
              Business details
            </h2>

            <p className="text-gray-500 mb-8">
              Tell us a little about your nail business.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Business name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium mb-2"
                >
                  Business name
                </label>

                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Nails by Mia"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-2"
                >
                  City
                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Cape Town"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#a55c72]"
                  />

                </div>
              </div>

              {/* Service area */}
              <div>
                <label
                  htmlFor="serviceArea"
                  className="block text-sm font-medium mb-2"
                >
                  Service area
                </label>

                <input
                  id="serviceArea"
                  name="serviceArea"
                  type="text"
                  required
                  value={form.serviceArea}
                  onChange={handleChange}
                  placeholder="e.g. Bellville, Cape Town"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Enter the main area where customers can book you.
                </p>
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="yearsExperience"
                  className="block text-sm font-medium mb-2"
                >
                  Years of experience
                </label>

                <input
                  id="yearsExperience"
                  name="yearsExperience"
                  type="number"
                  min="0"
                  max="60"
                  required
                  value={form.yearsExperience}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
              </div>

              {/* Bio */}
              <div>
                <div className="flex justify-between mb-2">

                  <label
                    htmlFor="bio"
                    className="text-sm font-medium"
                  >
                    About you
                  </label>

                  <span className="text-xs text-gray-400">
                    {form.bio.length}/300
                  </span>

                </div>

                <textarea
                  id="bio"
                  name="bio"
                  required
                  maxLength={300}
                  rows={5}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell customers about yourself, your style and your experience..."
                  className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Continue to Services
                <ArrowRight size={18} />
              </button>

            </form>

          </section>

        </div>
      </main>
    </div>
  )
}

export default BusinessDetails