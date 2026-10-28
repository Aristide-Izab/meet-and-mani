import type { DayAvailability, NailTechProfile } from '../types'
import { WEEK_DAYS } from '../utils/booking'

// Sample profiles so the customer journey can be tested before the backend exists.
// Every profile here is fictional and is shown with a DEMO label in the UI.

const IMAGES = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900',
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=900',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=900',
]

const portfolio = (order: number[]) =>
  order.map((imageIndex, position) => ({
    id: position + 1,
    preview: IMAGES[imageIndex],
  }))

const hours = (
  workDays: string[],
  startTime: string,
  endTime: string
): DayAvailability[] =>
  WEEK_DAYS.map((day) => ({
    day,
    enabled: workDays.includes(day),
    startTime,
    endTime,
  }))

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export const demoTechnicians: NailTechProfile[] = [
  {
    id: 'demo-polished-by-lerato',
    firstName: 'Lerato',
    lastName: 'Demo',
    email: 'lerato@demo.meetandmani',
    business: {
      businessName: 'Polished by Lerato',
      city: 'Cape Town',
      serviceArea: 'Cape Town CBD',
      yearsExperience: '6',
      bio: 'Clean, long-lasting gel and acrylic sets with a focus on healthy natural nails. Soft neutrals are my favourite, but I love a bold colour too.',
    },
    services: [
      { id: 1, name: 'Gel Manicure', description: 'Shape, cuticle care and a gel colour of your choice.', price: '320', duration: '60' },
      { id: 2, name: 'Acrylic Full Set', description: 'Full set of acrylic extensions in your preferred length and shape.', price: '520', duration: '120' },
      { id: 3, name: 'Gel Overlay', description: 'Strengthening gel overlay on natural nails.', price: '380', duration: '90' },
    ],
    portfolio: portfolio([0, 2, 1]),
    availability: hours([...WEEKDAYS, 'Saturday'], '09:00', '17:00'),
    sameDayBookings: true,
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'My gel lasted almost three weeks. Very neat work.', date: '2026-10-12' },
      { id: 2, author: 'Demo customer', rating: 5, comment: 'Friendly, on time and the studio is lovely.', date: '2026-09-30' },
    ],
    isDemo: true,
  },
  {
    id: 'demo-tips-and-tones',
    firstName: 'Ayesha',
    lastName: 'Demo',
    email: 'ayesha@demo.meetandmani',
    business: {
      businessName: 'Tips & Tones Nail Art',
      city: 'Cape Town',
      serviceArea: 'Bellville',
      yearsExperience: '4',
      bio: 'Hand-painted nail art, chrome finishes and anything creative. Bring your inspiration photos and we will make it happen.',
    },
    services: [
      { id: 1, name: 'Nail Art (full set)', description: 'Hand-painted designs on all ten nails over gel.', price: '480', duration: '120' },
      { id: 2, name: 'Chrome Gel Manicure', description: 'Gel manicure finished with a chrome powder of your choice.', price: '360', duration: '75' },
      { id: 3, name: 'Gel Manicure', description: 'Classic gel manicure with one colour.', price: '280', duration: '60' },
    ],
    portfolio: portfolio([1, 0, 2]),
    availability: hours(['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], '10:00', '18:00'),
    sameDayBookings: false,
    rating: 4.8,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'She recreated my Pinterest design perfectly.', date: '2026-10-05' },
    ],
    isDemo: true,
  },
  {
    id: 'demo-mobile-mani-claremont',
    firstName: 'Zinhle',
    lastName: 'Demo',
    email: 'zinhle@demo.meetandmani',
    business: {
      businessName: 'Mobile Mani Co.',
      city: 'Cape Town',
      serviceArea: 'Claremont & Southern Suburbs',
      yearsExperience: '3',
      bio: 'I come to you. Manicures and pedicures at home or at the office, with everything sanitised and set up for you.',
    },
    services: [
      { id: 1, name: 'Classic Manicure', description: 'File, shape, cuticle care and regular polish.', price: '220', duration: '45' },
      { id: 2, name: 'Gel Pedicure', description: 'Soak, scrub, cuticle care and gel colour on toes.', price: '350', duration: '75' },
      { id: 3, name: 'Mani & Pedi Combo', description: 'Gel manicure and gel pedicure in one visit.', price: '600', duration: '150' },
    ],
    portfolio: portfolio([2, 0, 1]),
    availability: hours(WEEKDAYS, '08:00', '16:00'),
    sameDayBookings: true,
    rating: 4.7,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'So convenient having her come to my place.', date: '2026-10-18' },
      { id: 2, author: 'Demo customer', rating: 4, comment: 'Great pedicure, arrived a little late.', date: '2026-09-21' },
    ],
    isDemo: true,
  },
  {
    id: 'demo-luxe-lacquer-sandton',
    firstName: 'Naledi',
    lastName: 'Demo',
    email: 'naledi@demo.meetandmani',
    business: {
      businessName: 'Luxe Lacquer Studio',
      city: 'Johannesburg',
      serviceArea: 'Sandton',
      yearsExperience: '8',
      bio: 'A calm studio for long-lasting extensions and structured gel. Appointments run on time so you can get back to your day.',
    },
    services: [
      { id: 1, name: 'BIAB Structured Gel', description: 'Builder gel for strength and a natural look.', price: '450', duration: '90' },
      { id: 2, name: 'Acrylic Full Set', description: 'Acrylic extensions with gel colour.', price: '580', duration: '120' },
      { id: 3, name: 'Gel Manicure', description: 'Gel colour with full cuticle care.', price: '340', duration: '60' },
    ],
    portfolio: portfolio([0, 1, 2]),
    availability: hours([...WEEKDAYS, 'Saturday'], '09:00', '18:00'),
    sameDayBookings: false,
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'Best BIAB I have had in Joburg.', date: '2026-10-20' },
    ],
    isDemo: true,
  },
  {
    id: 'demo-rosebank-nail-bar',
    firstName: 'Kea',
    lastName: 'Demo',
    email: 'kea@demo.meetandmani',
    business: {
      businessName: 'The Rosebank Nail Bar',
      city: 'Johannesburg',
      serviceArea: 'Rosebank',
      yearsExperience: '5',
      bio: 'Quick, affordable and neat. Perfect for a lunchtime gel refresh or a full set before the weekend.',
    },
    services: [
      { id: 1, name: 'Gel Manicure', description: 'Fast and neat gel manicure.', price: '260', duration: '45' },
      { id: 2, name: 'Gel Removal & Repaint', description: 'Safe removal of old gel and a new colour.', price: '300', duration: '60' },
      { id: 3, name: 'Simple Nail Art Add-on', description: 'Accent nails or simple lines and dots.', price: '120', duration: '30' },
    ],
    portfolio: portfolio([1, 2, 0]),
    availability: hours([...WEEKDAYS, 'Saturday', 'Sunday'], '10:00', '17:00'),
    sameDayBookings: true,
    rating: 4.6,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'In and out in 45 minutes. Love it.', date: '2026-10-09' },
    ],
    isDemo: true,
  },
  {
    id: 'demo-umhlanga-nail-studio',
    firstName: 'Priya',
    lastName: 'Demo',
    email: 'priya@demo.meetandmani',
    business: {
      businessName: 'Coastline Nails',
      city: 'Durban',
      serviceArea: 'Umhlanga',
      yearsExperience: '7',
      bio: 'Beach-ready pedicures and summer nail art. Bright colours encouraged.',
    },
    services: [
      { id: 1, name: 'Spa Pedicure', description: 'Soak, scrub, massage and regular polish.', price: '330', duration: '60' },
      { id: 2, name: 'Gel Manicure', description: 'Gel colour with cuticle care.', price: '300', duration: '60' },
      { id: 3, name: 'Nail Art (full set)', description: 'Custom design on all ten nails.', price: '450', duration: '105' },
    ],
    portfolio: portfolio([2, 1, 0]),
    availability: hours(['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], '09:00', '17:00'),
    sameDayBookings: false,
    rating: 4.8,
    reviews: [
      { id: 1, author: 'Demo customer', rating: 5, comment: 'Gorgeous summer set, got so many compliments.', date: '2026-10-02' },
    ],
    isDemo: true,
  },
]
