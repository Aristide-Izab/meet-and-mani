
import { useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Menu,
  Search,
  Sparkles,
  X
} from 'lucide-react'

const services = [
  {
    name: 'Signature Manicure',
    description: 'Beautiful nails, beautifully you.',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
  },
  {
    name: 'Nail Art',
    description: 'A little creativity at your fingertips.',
    image:
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800',
  },
  {
    name: 'Gel Extensions',
    description: 'Your dream nails, made possible.',
    image:
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [location, setLocation] = useState('')

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white border-b border-rose-100">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-semibold tracking-tight text-[#a55c72]"
          >
            Meet&Mani<span className="text-[#dca7b6]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-9 text-sm">
            <a href="#home" className="hover:text-[#a55c72]">Home</a>
            <a href="#services" className="hover:text-[#a55c72]">Services</a>
            <a href="#how-it-works" className="hover:text-[#a55c72]">
              How It Works
            </a>
            <a href="#professionals" className="hover:text-[#a55c72]">
              For Professionals
            </a>
          </div>

          <div className="hidden md:flex gap-3">
            <button className="px-5 py-2 text-[#a55c72]">
              Log In
            </button>
            <button className="px-6 py-2.5 bg-[#a55c72] text-white rounded-full hover:bg-[#87465b]">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="#professionals" onClick={() => setMenuOpen(false)}>
              For Professionals
            </a>
            <button className="text-left">Log In</button>
            <button className="bg-[#a55c72] text-white rounded-full py-3">
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="bg-[#fcf1ee] px-6 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[#a55c72] text-sm mb-6">
              <Sparkles size={17} />
              YOUR BEAUTY, YOUR WAY
            </span>

            <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-7">
              Beautiful nails.
              <br />
              <span className="italic text-[#b76f85]">
                Beautiful moments.
              </span>
            </h1>

            <p className="text-[#75676d] text-lg leading-relaxed max-w-lg mb-9">
              Discover talented nail technicians near you.
              Explore their work, find your perfect style
              and book your next appointment.
            </p>

            <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search className="text-[#b76f85]" size={20} />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Enter your city"
                  aria-label="Your city"
                  className="outline-none w-full py-3 text-sm"
                />
              </div>

              <button
                onClick={() =>
                  document.getElementById('services')?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }
                className="bg-[#a55c72] text-white px-6 py-3 rounded-xl flex justify-center items-center gap-2"
              >
                Explore <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200"
              alt="Beautiful manicure"
              className="w-full h-[420px] md:h-[540px] object-cover rounded-[40px]"
            />

            <div className="absolute -bottom-5 left-5 bg-white rounded-2xl shadow-lg p-5 flex gap-3 items-center">
              <div className="bg-[#fce8ed] p-3 rounded-full">
                <Heart size={22} className="text-[#a55c72]" />
              </div>
              <div>
                <p className="font-semibold">Find your perfect nail tech</p>
                <p className="text-sm text-gray-500">
                  Your next appointment starts here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-[#a55c72] text-sm tracking-widest mb-3">
            DISCOVER YOUR STYLE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Beauty at your fingertips
          </h2>
          <p className="text-gray-500">
            Explore nail services you'll love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-3xl overflow-hidden bg-white border border-rose-100"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-7">
                <h3 className="font-serif text-2xl mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-500 mb-5">
                  {service.description}
                </p>
                <button className="text-[#a55c72] flex items-center gap-2 font-medium">
                  Explore service <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#fcf1ee] px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-14">
            Your beauty journey, simplified
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search size={28} />,
                title: 'Discover',
                text: 'Find talented nail technicians in your area.'
              },
              {
                icon: <Heart size={28} />,
                title: 'Choose',
                text: 'Explore portfolios and select your favorite services.'
              },
              {
                icon: <CalendarDays size={28} />,
                title: 'Book',
                text: 'Choose an appointment that fits your schedule.'
              }
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <div className="bg-white text-[#a55c72] rounded-full p-6 mb-6">
                  {step.icon}
                </div>
                <h3 className="font-serif text-2xl mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 max-w-xs">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nail tech CTA */}
      <section id="professionals" className="px-6 py-24">
        <div className="max-w-6xl mx-auto bg-[#a55c72] rounded-[35px] px-8 py-16 md:p-20 text-white text-center">
          <Sparkles className="mx-auto mb-5" size={30} />
          <h2 className="font-serif text-4xl md:text-5xl mb-5">
            Your talent deserves to shine.
          </h2>
          <p className="max-w-xl mx-auto mb-9 text-rose-100">
            Join Meet&Mani, showcase your nail artistry,
            manage your appointments and grow your beauty business.
          </p>
          <button className="bg-white text-[#a55c72] px-9 py-4 rounded-full font-semibold">
            Join as a Nail Technician
          </button>
        </div>
      </section>

      <footer className="border-t border-rose-100 py-10 text-center">
        <p className="font-semibold text-xl text-[#a55c72] mb-2">
          Meet&Mani.
        </p>
        <p className="text-sm text-gray-500">
          © 2026 Meet&Mani. Made for beauty lovers.
        </p>
      </footer>
    </div>
  )
}

export default App
