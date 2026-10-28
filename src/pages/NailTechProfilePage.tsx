import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  Clock,
  Heart,
  MapPin,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import DemoBadge from '../components/DemoBadge'
import SiteHeader from '../components/SiteHeader'
import { MY_PROFILE_ID } from '../context/AppDataContext'
import { useAppData } from '../context/useAppData'
import { formatDate, formatDuration, formatPrice } from '../utils/booking'
import NotFound from './NotFound'

function NailTechProfilePage() {
  const { id = '' } = useParams()
  const { getTechnician, currentUser, favourites, toggleFavourite } = useAppData()
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)

  const technician = getTechnician(id)

  if (!technician) {
    return <NotFound />
  }

  const { business } = technician
  const isOwnProfile = id === MY_PROFILE_ID && currentUser?.role === 'nail-tech'
  const isCustomer = currentUser?.role === 'customer'
  const isFavourite = favourites.includes(technician.id)
  const workingDays = technician.availability.filter((day) => day.enabled)

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      {isOwnProfile && (
        <div className="bg-[#a55c72] text-white">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <p>This is how customers see your profile.</p>
            <Link to="/nail-tech/dashboard" className="font-semibold underline">
              Back to your dashboard
            </Link>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <Link
          to="/nail-techs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-8"
        >
          <ArrowLeft size={17} />
          All nail techs
        </Link>

        {/* Intro */}
        <section className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start mb-14">
          <div className="relative">
            <img
              src={technician.portfolio[0]?.preview}
              alt={`Cover photo for ${business.businessName}`}
              className="w-full h-[320px] md:h-[440px] object-cover rounded-[32px] bg-[#f9e9ed]"
            />
            {technician.isDemo && (
              <div className="absolute top-4 left-4">
                <DemoBadge />
              </div>
            )}
          </div>

          <div className="lg:pt-6">
            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-4">
              <Sparkles size={17} />
              NAIL TECHNICIAN
            </div>

            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-2">
              {business.businessName}
            </h1>

            <p className="text-gray-500 mb-6">
              by {technician.firstName} {technician.isDemo ? '' : technician.lastName}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-7">
              <span className="flex items-center gap-2">
                <Star size={16} className="text-[#b76f85] fill-[#b76f85]" />
                {technician.rating
                  ? `${technician.rating.toFixed(1)} (${technician.reviews.length} ${
                      technician.reviews.length === 1 ? 'review' : 'reviews'
                    })`
                  : 'New on Meet&Mani'}
              </span>

              <span className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="text-[#a55c72]" />
                {business.serviceArea}, {business.city}
              </span>

              {business.yearsExperience && (
                <span className="flex items-center gap-2 text-gray-600">
                  <Award size={16} className="text-[#a55c72]" />
                  {business.yearsExperience} years experience
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{business.bio}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/nail-techs/${technician.id}/book`}
                className="flex-1 bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 transition"
              >
                Book an appointment
                <ArrowRight size={18} />
              </Link>

              {isCustomer && (
                <button
                  type="button"
                  onClick={() => toggleFavourite(technician.id)}
                  aria-pressed={isFavourite}
                  className="border border-rose-100 hover:border-[#a55c72] text-[#a55c72] rounded-xl py-4 px-6 font-medium flex items-center justify-center gap-2 transition"
                >
                  <Heart size={18} className={isFavourite ? 'fill-[#a55c72]' : ''} />
                  {isFavourite ? 'Saved' : 'Save'}
                </button>
              )}
            </div>

            {technician.sameDayBookings && (
              <p className="text-sm text-gray-500 mt-4">
                Accepts same-day bookings when there's space.
              </p>
            )}
          </div>
        </section>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <div className="space-y-8">
            {/* Services */}
            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
              <h2 className="font-serif text-3xl mb-6">Services & prices</h2>

              <ul className="divide-y divide-rose-100">
                {technician.services.map((service) => (
                  <li
                    key={service.id}
                    className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Clock size={13} />
                        {formatDuration(service.duration)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 sm:justify-end">
                      <p className="font-semibold">{formatPrice(service.price)}</p>
                      <Link
                        to={`/nail-techs/${technician.id}/book?service=${service.id}`}
                        className="text-sm text-[#a55c72] border border-rose-100 hover:border-[#a55c72] rounded-full px-4 py-2 transition"
                      >
                        Book
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Portfolio */}
            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
              <h2 className="font-serif text-3xl mb-6">Portfolio</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {technician.portfolio.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setEnlargedImage(image.preview)}
                    className="aspect-square rounded-2xl overflow-hidden bg-[#f9e9ed]"
                    aria-label={`View portfolio photo ${index + 1}`}
                  >
                    <img
                      src={image.preview}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9">
              <h2 className="font-serif text-3xl mb-6">Reviews</h2>

              {technician.reviews.length > 0 ? (
                <ul className="space-y-4">
                  {technician.reviews.map((review) => (
                    <li key={review.id} className="rounded-2xl bg-[#fff7f9] p-5">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, star) => (
                            <Star
                              key={star}
                              size={15}
                              className={
                                star < review.rating
                                  ? 'text-[#b76f85] fill-[#b76f85]'
                                  : 'text-rose-200'
                              }
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-gray-400 mt-2">{review.author}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No reviews yet. Reviews will appear here after completed appointments.
                </p>
              )}
            </section>
          </div>

          {/* Working hours */}
          <aside className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-9 lg:sticky lg:top-6">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays size={22} className="text-[#a55c72]" />
              <h2 className="font-serif text-2xl">Working hours</h2>
            </div>

            <ul className="space-y-3 text-sm mb-7">
              {technician.availability.map((day) => (
                <li key={day.day} className="flex justify-between gap-4">
                  <span className={day.enabled ? 'text-gray-700' : 'text-gray-400'}>
                    {day.day}
                  </span>
                  <span className={day.enabled ? 'font-medium' : 'text-gray-400'}>
                    {day.enabled ? `${day.startTime} – ${day.endTime}` : 'Closed'}
                  </span>
                </li>
              ))}
            </ul>

            {workingDays.length > 0 && (
              <Link
                to={`/nail-techs/${technician.id}/book`}
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Check available times
              </Link>
            )}
          </aside>
        </div>
      </main>

      {/* Enlarged portfolio photo */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setEnlargedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setEnlargedImage(null)}
            aria-label="Close photo"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center"
          >
            <X size={20} />
          </button>
          <img
            src={enlargedImage}
            alt="Portfolio photo enlarged"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default NailTechProfilePage
