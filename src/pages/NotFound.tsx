import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'

function NotFound() {
  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
          <Sparkles size={17} />
          PAGE NOT FOUND
        </div>

        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-5">
          This page has{' '}
          <span className="italic text-[#b76f85]">chipped.</span>
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 px-8 font-semibold flex items-center justify-center gap-2 transition"
          >
            Back to home
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/nail-techs"
            className="border border-rose-100 hover:border-[#a55c72] text-gray-600 hover:text-[#a55c72] rounded-xl py-4 px-8 font-medium transition"
          >
            Find a nail tech
          </Link>
        </div>
      </main>
    </div>
  )
}

export default NotFound
