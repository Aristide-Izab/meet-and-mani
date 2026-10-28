import { MapPin, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import TechnicianCard from '../components/TechnicianCard'
import { useAppData } from '../context/useAppData'
import type { NailTechProfile } from '../types'
import { lowestPrice } from '../utils/booking'

const SERVICE_TYPES = ['Manicure', 'Gel', 'Acrylic', 'Nail art', 'Pedicure']

const PRICE_LIMITS = [
  { value: '300', label: 'Up to R 300' },
  { value: '400', label: 'Up to R 400' },
  { value: '500', label: 'Up to R 500' },
]

const matchesService = (technician: NailTechProfile, keyword: string) =>
  technician.services.filter((service) =>
    service.name.toLowerCase().includes(keyword.toLowerCase())
  )

function SearchResults() {
  const { technicians } = useAppData()
  const [searchParams, setSearchParams] = useSearchParams()

  const city = searchParams.get('city') ?? ''
  const serviceType = searchParams.get('service') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''
  const sort = searchParams.get('sort') ?? 'recommended'

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)

    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }

    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => setSearchParams({}, { replace: true })

  const results = technicians
    .filter((technician) => {
      const location =
        `${technician.business.city} ${technician.business.serviceArea}`.toLowerCase()

      if (city && !location.includes(city.trim().toLowerCase())) {
        return false
      }

      const relevantServices = serviceType
        ? matchesService(technician, serviceType)
        : technician.services

      if (relevantServices.length === 0) {
        return false
      }

      if (maxPrice) {
        return relevantServices.some(
          (service) => Number(service.price) <= Number(maxPrice)
        )
      }

      return true
    })
    .sort((a, b) => {
      if (sort === 'price') {
        return (lowestPrice(a.services) ?? 0) - (lowestPrice(b.services) ?? 0)
      }

      return (b.rating ?? 0) - (a.rating ?? 0)
    })

  const hasFilters = Boolean(city || serviceType || maxPrice)

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      {/* Search */}
      <section className="bg-[#fcf1ee] px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
            <Sparkles size={17} />
            FIND A NAIL TECH
          </div>

          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
            Nail technicians{' '}
            <span className="italic text-[#b76f85]">
              {city ? `near ${city}` : 'near you'}
            </span>
          </h1>

          <div className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 max-w-xl">
            <Search className="text-[#b76f85] ml-3 shrink-0" size={20} />
            <input
              value={city}
              onChange={(event) => updateParam('city', event.target.value)}
              placeholder="Enter your city or area"
              aria-label="City or area"
              className="outline-none w-full py-3 text-sm"
            />
            {city && (
              <button
                type="button"
                onClick={() => updateParam('city', '')}
                aria-label="Clear city"
                className="p-2 text-gray-400 hover:text-[#a55c72]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
            <SlidersHorizontal size={17} />
            Filter
          </div>

          <div className="flex flex-wrap gap-2 flex-1">
            <button
              type="button"
              onClick={() => updateParam('service', '')}
              className={`text-sm rounded-full px-4 py-2 border transition ${
                !serviceType
                  ? 'bg-[#a55c72] border-[#a55c72] text-white'
                  : 'border-rose-100 bg-white hover:border-[#a55c72]'
              }`}
            >
              All services
            </button>

            {SERVICE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateParam('service', type)}
                className={`text-sm rounded-full px-4 py-2 border transition ${
                  serviceType === type
                    ? 'bg-[#a55c72] border-[#a55c72] text-white'
                    : 'border-rose-100 bg-white hover:border-[#a55c72]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <select
              value={maxPrice}
              onChange={(event) => updateParam('maxPrice', event.target.value)}
              aria-label="Maximum price"
              className="text-sm border border-rose-100 rounded-full px-4 py-2 bg-white outline-none focus:border-[#a55c72]"
            >
              <option value="">Any price</option>
              {PRICE_LIMITS.map((limit) => (
                <option key={limit.value} value={limit.value}>
                  {limit.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => updateParam('sort', event.target.value)}
              aria-label="Sort results"
              className="text-sm border border-rose-100 rounded-full px-4 py-2 bg-white outline-none focus:border-[#a55c72]"
            >
              <option value="recommended">Top rated</option>
              <option value="price">Lowest price</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <p className="text-sm text-gray-500">
            {results.length} {results.length === 1 ? 'nail tech' : 'nail techs'} found
          </p>

          <p className="text-xs text-gray-400">
            Profiles marked DEMO are sample data for this prototype.
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((technician) => (
              <TechnicianCard key={technician.id} technician={technician} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white border border-rose-100 px-6 py-16 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#f9e9ed] flex items-center justify-center">
              <MapPin size={24} className="text-[#a55c72]" />
            </div>

            <h2 className="font-serif text-2xl mb-2">No nail techs found</h2>

            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-6">
              Try another area or remove some filters. In this prototype, sample
              profiles are in Cape Town, Johannesburg and Durban.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="bg-[#a55c72] hover:bg-[#87465b] text-white rounded-full px-6 py-3 text-sm font-medium transition"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default SearchResults
