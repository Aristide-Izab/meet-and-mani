import { useState } from 'react'
import { ArrowLeft, ArrowRight, MailCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Dummy flow: no email is sent until the backend exists.
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      <SiteHeader />

      <main className="max-w-md mx-auto px-6 py-12 md:py-20">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-8"
        >
          <ArrowLeft size={17} />
          Back to log in
        </Link>

        <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                <MailCheck size={24} className="text-[#a55c72]" />
              </div>

              <h1 className="font-serif text-3xl mb-3">Check your email</h1>

              <p className="text-gray-500 leading-relaxed mb-6">
                If an account exists for <span className="font-medium text-gray-700">{email}</span>,
                you'll get a link to reset your password.
              </p>

              <div className="bg-[#fff7f9] rounded-2xl p-4 mb-6 text-left">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="font-medium text-gray-700">Demo only.</span> No
                  email is sent yet. Password resets will work once the backend
                  is connected.
                </p>
              </div>

              <Link
                to="/login"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Back to log in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-3xl mb-2">Forgot your password?</h1>
              <p className="text-gray-500 mb-7">
                Enter the email you signed up with and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-rose-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#a55c72]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
                >
                  Send reset link
                  <ArrowRight size={18} />
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default ForgotPassword
