import type { BookingStatus } from '../types'

const styles: Record<BookingStatus, string> = {
  Pending: 'bg-[#f9e9ed] text-[#a55c72]',
  Confirmed: 'bg-[#a55c72] text-white',
  Declined: 'bg-gray-100 text-gray-500',
  Cancelled: 'bg-gray-100 text-gray-500',
}

function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`text-xs rounded-full px-3 py-1 whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  )
}

export default BookingStatusBadge
