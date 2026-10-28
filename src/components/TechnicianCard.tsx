import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppData } from '../context/useAppData'
import type { NailTechProfile } from '../types'
import { formatPrice, lowestPrice } from '../utils/booking'
import DemoBadge from './DemoBadge'

type TechnicianCardProps = {
  technician: NailTechProfile
}

function TechnicianCard({ technician }: TechnicianCardProps) {
  const { currentUser, favourites, toggleFavourite } = useAppData()
  const fromPrice = lowestPrice(technician.services)
  const isFavourite = favourites.includes(technician.id)
  const canSave = currentUser?.role === 'customer'

  return (
    <div className="relative rounded-3xl overflow-hidden bg-white border border-rose-100 hover:border-[#dca7b6] transition">
      <Link to={`/nail-techs/${technician.id}`} className="block">
        <img
          src={technician.portfolio[0]?.preview}
          alt={`Work by ${technician.business.businessName}`}
          className="w-full h-52 object-cover bg-[#f9e9ed]"
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-serif text-xl leading-snug">
              {technician.business.businessName}
            </h3>

            <p className="text-sm flex items-center gap-1 shrink-0">
              <Star size={15} className="text-[#b76f85] fill-[#b76f85]" />
              {technician.rating ? technician.rating.toFixed(1) : 'New'}
            </p>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
            <MapPin size={14} />
            {technician.business.serviceArea}, {technician.business.city}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technician.services.slice(0, 3).map((service) => (
              <span
                key={service.id}
                className="text-xs text-gray-600 bg-[#fff7f9] border border-rose-100 rounded-full px-3 py-1"
              >
                {service.name}
              </span>
            ))}
          </div>

          {fromPrice !== null && (
            <p className="text-sm">
              <span className="text-gray-400">From </span>
              <span className="font-semibold">{formatPrice(fromPrice)}</span>
            </p>
          )}
        </div>
      </Link>

      {technician.isDemo && (
        <div className="absolute top-3 left-3">
          <DemoBadge />
        </div>
      )}

      {canSave && (
        <button
          type="button"
          onClick={() => toggleFavourite(technician.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#a55c72]"
          aria-label={isFavourite ? 'Remove from saved' : 'Save nail tech'}
          aria-pressed={isFavourite}
        >
          <Heart size={17} className={isFavourite ? 'fill-[#a55c72]' : ''} />
        </button>
      )}
    </div>
  )
}

export default TechnicianCard
