import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Plus,
  Scissors,
  Sparkles,
  Trash2
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type Service = {
  id: number
  name: string
  description: string
  price: string
  duration: string
}

function ServicesPricing() {
  const navigate = useNavigate()

  const [services, setServices] = useState<Service[]>([
  {
    id: 1,
    name: '',
    description: '',
    price: '',
    duration: '',
  },
])

  const addService = () => {
  setServices((currentServices) => {
    const nextId =
      currentServices.length > 0
        ? Math.max(...currentServices.map((service) => service.id)) + 1
        : 1

    const newService: Service = {
      id: nextId,
      name: '',
      description: '',
        price: '',
        duration: '',
      }

      return [...currentServices, newService]
  })
}

  const removeService = (id: number) => {
    if (services.length === 1) {
      return
    }

    setServices(
      services.filter((service) => service.id !== id)
    )
  }

  const updateService = (
    id: number,
    field: keyof Omit<Service, 'id'>,
    value: string
  ) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              [field]: value,
            }
          : service
      )
    )
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    console.log('Services:', services)

    navigate('/nail-tech/portfolio')
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

          <p className="hidden sm:block text-sm text-gray-400">
            Nail Technician Setup
          </p>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">

        {/* Back */}
        <Link
          to="/nail-tech/business-details"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-10"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* Left */}
          <section className="lg:pt-10">

            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
              <Sparkles size={17} />
              YOUR SERVICES
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Show customers
              <br />
              what you{' '}
              <span className="italic text-[#b76f85]">
                create.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
              Add the nail services you offer, how much they cost and
              approximately how long each appointment takes.
            </p>

            <div className="bg-[#f9e9ed] rounded-3xl p-7 max-w-md">

              <Scissors
                size={30}
                className="text-[#a55c72] mb-4"
              />

              <h3 className="font-serif text-2xl mb-2">
                Keep it simple
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                You can start with your most popular services.
                You'll be able to add, edit and remove services
                from your dashboard later.
              </p>

            </div>

          </section>

          {/* Form card */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">

            {/* Progress */}
            <div className="mb-9">

              <div className="flex justify-between items-center mb-3">

                <p className="text-xs tracking-widest font-semibold text-[#a55c72]">
                  STEP 3 OF 5
                </p>

                <p className="text-xs text-gray-400">
                  Services & Pricing
                </p>

              </div>

              <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-3/5 h-full bg-[#a55c72] rounded-full" />
              </div>

            </div>

            <h2 className="font-serif text-3xl mb-2">
              Services & pricing
            </h2>

            <p className="text-gray-500 mb-8">
              Add at least one service to your profile.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {services.map((service, index) => (

                <div
                  key={service.id}
                  className="border border-rose-100 rounded-2xl p-5 sm:p-6"
                >

                  {/* Service heading */}
                  <div className="flex justify-between items-center mb-5">

                    <div>
                      <p className="text-xs text-[#a55c72] font-semibold tracking-widest mb-1">
                        SERVICE {index + 1}
                      </p>

                      <h3 className="font-serif text-xl">
                        Service details
                      </h3>
                    </div>

                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeService(service.id)
                        }
                        aria-label={`Remove service ${index + 1}`}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}

                  </div>

                  <div className="space-y-5">

                    {/* Service name */}
                    <div>

                      <label
                        htmlFor={`service-name-${service.id}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Service name
                      </label>

                      <input
                        id={`service-name-${service.id}`}
                        type="text"
                        required
                        value={service.name}
                        onChange={(event) =>
                          updateService(
                            service.id,
                            'name',
                            event.target.value
                          )
                        }
                        placeholder="e.g. Gel Manicure"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                      />

                    </div>

                    {/* Description */}
                    <div>

                      <label
                        htmlFor={`service-description-${service.id}`}
                        className="block text-sm font-medium mb-2"
                      >
                        Description
                      </label>

                      <textarea
                        id={`service-description-${service.id}`}
                        required
                        maxLength={200}
                        rows={3}
                        value={service.description}
                        onChange={(event) =>
                          updateService(
                            service.id,
                            'description',
                            event.target.value
                          )
                        }
                        placeholder="Briefly describe what's included..."
                        className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                      />

                      <p className="text-right text-xs text-gray-400 mt-1">
                        {service.description.length}/200
                      </p>

                    </div>

                    {/* Price + duration */}
                    <div className="grid sm:grid-cols-2 gap-4">

                      {/* Price */}
                      <div>

                        <label
                          htmlFor={`service-price-${service.id}`}
                          className="block text-sm font-medium mb-2"
                        >
                          Price
                        </label>

                        <div className="relative">

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                            R
                          </span>

                          <input
                            id={`service-price-${service.id}`}
                            type="number"
                            required
                            min="0"
                            step="1"
                            value={service.price}
                            onChange={(event) =>
                              updateService(
                                service.id,
                                'price',
                                event.target.value
                              )
                            }
                            placeholder="350"
                            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3.5 outline-none focus:border-[#a55c72]"
                          />

                        </div>

                      </div>

                      {/* Duration */}
                      <div>

                        <label
                          htmlFor={`service-duration-${service.id}`}
                          className="block text-sm font-medium mb-2"
                        >
                          Duration
                        </label>

                        <div className="relative">

                          <Clock
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <select
                            id={`service-duration-${service.id}`}
                            required
                            value={service.duration}
                            onChange={(event) =>
                              updateService(
                                service.id,
                                'duration',
                                event.target.value
                              )
                            }
                            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#a55c72] bg-white"
                          >
                            <option value="">
                              Select duration
                            </option>

                            <option value="30">
                              30 minutes
                            </option>

                            <option value="45">
                              45 minutes
                            </option>

                            <option value="60">
                              1 hour
                            </option>

                            <option value="90">
                              1 hour 30 minutes
                            </option>

                            <option value="120">
                              2 hours
                            </option>

                            <option value="150">
                              2 hours 30 minutes
                            </option>

                            <option value="180">
                              3 hours
                            </option>

                          </select>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

              {/* Add service */}
              <button
                type="button"
                onClick={addService}
                className="w-full border-2 border-dashed border-[#e5c4ce] text-[#a55c72] hover:bg-[#fff7f9] rounded-2xl py-4 font-medium flex items-center justify-center gap-2 transition"
              >
                <Plus size={19} />
                Add another service
              </button>

              {/* Continue */}
              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Continue to Portfolio
                <ArrowRight size={18} />
              </button>

            </form>

          </section>

        </div>

      </main>

    </div>
  )
}

export default ServicesPricing