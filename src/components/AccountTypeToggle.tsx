import { Sparkles, UserRound } from 'lucide-react'
import type { AccountType } from '../types'

export type { AccountType }

type AccountTypeToggleProps = {
  value: AccountType
  onChange: (type: AccountType) => void
}

const options = [
  { type: 'customer' as const, label: 'Customer', icon: UserRound },
  { type: 'nail-tech' as const, label: 'Nail Technician', icon: Sparkles },
]

function AccountTypeToggle({ value, onChange }: AccountTypeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Account type"
      className="grid grid-cols-2 gap-1 bg-[#f9e9ed] rounded-2xl p-1.5"
    >
      {options.map(({ type, label, icon: Icon }) => {
        const selected = value === type

        return (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(type)}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
              selected
                ? 'bg-white text-[#a55c72] shadow-sm'
                : 'text-gray-500 hover:text-[#a55c72]'
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default AccountTypeToggle
