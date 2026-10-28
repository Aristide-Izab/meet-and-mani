import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppData } from '../context/useAppData'
import type { AccountType } from '../types'

type RequireAccountProps = {
  role: AccountType
  children: ReactNode
}

// Sends visitors to the login page if they aren't logged in with the right account type.
function RequireAccount({ role, children }: RequireAccountProps) {
  const { currentUser } = useAppData()
  const location = useLocation()

  if (currentUser?.role !== role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search, accountType: role }}
      />
    )
  }

  return children
}

export default RequireAccount
