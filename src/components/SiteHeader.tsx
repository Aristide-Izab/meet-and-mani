import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppData } from '../context/useAppData'

// Header for public pages (search, profiles, booking).
function SiteHeader() {
  const { currentUser } = useAppData()

  const dashboardPath =
    currentUser?.role === 'nail-tech' ? '/nail-tech/dashboard' : '/customer/dashboard'

  return (
    <header className="bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-[#a55c72]"
        >
          Meet&Mani<span className="text-[#dca7b6]">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 text-sm">
          <Link
            to="/nail-techs"
            className="hidden sm:inline px-3 py-2 hover:text-[#a55c72]"
          >
            Find a nail tech
          </Link>

          {currentUser ? (
            <Link
              to={dashboardPath}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#a55c72] text-white rounded-full hover:bg-[#87465b] transition"
            >
              <LayoutDashboard size={16} />
              My dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-[#a55c72]">
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-[#a55c72] text-white rounded-full hover:bg-[#87465b] transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
