import { LogOut, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

type DashboardHeaderProps = {
  label: string
}

function DashboardHeader({ label }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-[#a55c72]"
        >
          Meet&Mani<span className="text-[#dca7b6]">.</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <p className="hidden sm:block text-sm text-gray-400">{label}</p>

          <div className="w-10 h-10 rounded-full bg-[#f9e9ed] flex items-center justify-center">
            <UserRound size={19} className="text-[#a55c72]" />
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72]"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Log out</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
