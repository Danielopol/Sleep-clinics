export interface Clinic {
  id: number
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  specialty: string[]
  image: string
  coordinates: { lat: number; lng: number }
  // Extended fields for enhanced card design
  clinicType?: string
  rating?: number
  reviewCount?: number
  website?: string
  email?: string
  fax?: string
  hours?: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  hoursNote?: string
  services?: string[]
  description?: string
  isOpen?: boolean
  accreditation?: string[]
  reviews?: {
    author: string
    rating: number
    date: string
    text: string
  }[]
}

export const clinics: Clinic[] = [
  {
    id: 1,
    name: "ASSOCIATES IN COLON & RECTAL",
    address: "1248 E 90 N Cir",
    city: "American Fork",
    state: "UT",
    zip: "84003",
    phone: "801.263.1621",
    specialty: ["Sleep Medicine"],
    image: "/modern-medical-clinic-reception-area.jpg",
    coordinates: { lat: 40.3772, lng: -111.7955 },
    clinicType: "Sleep Medicine & Diagnostic Center",
    rating: 4.8,
    reviewCount: 142,
    website: "https://example.com",
    email: "info@sleepcare.com",
    fax: "801.263.1622",
    hours: {
      monday: "7:00 AM – 6:00 PM",
      tuesday: "7:00 AM – 6:00 PM",
      wednesday: "7:00 AM – 6:00 PM",
      thursday: "7:00 AM – 6:00 PM",
      friday: "7:00 AM – 5:00 PM",
      saturday: "8:00 AM – 12:00 PM",
      sunday: "Closed",
    },
    services: ["Sleep Apnea", "Insomnia", "Sleep Studies", "CPAP Therapy", "Narcolepsy"],
    description: "Comprehensive sleep disorder diagnosis and treatment. Our board-certified sleep medicine physicians use state-of-the-art technology to help you achieve restful, restorative sleep.",
    isOpen: true,
    accreditation: ["AASM Accredited"],
    reviews: [
      {
        author: "Michael Johnson",
        rating: 5,
        date: "2 weeks ago",
        text: "Life-changing experience! After years of struggling with sleep apnea, the team finally helped me get the restful sleep I desperately needed. Highly recommend!",
      },
      {
        author: "Sarah Rodriguez",
        rating: 5,
        date: "1 month ago",
        text: "The staff here is amazing. From scheduling to the actual sleep study, everything was smooth and professional. The facility is clean and comfortable.",
      },
    ],
  },
  {
    id: 2,
    name: "SUMMIT UROLOGY",
    address: "1159 E. 200 N., Ste. 300",
    city: "American Fork",
    state: "UT",
    zip: "84003",
    phone: "801.756.7609",
    specialty: ["Sleep Medicine"],
    image: "/comfortable-bedroom-with-gray-bedding.jpg",
    coordinates: { lat: 40.3802, lng: -111.7847 },
  },
  {
    id: 3,
    name: "ALLERGY, ASTHMA, & IMMUNOLOGY",
    address: "1551 S. Renaissance Towne Dr., Ste. 340",
    city: "Bountiful",
    state: "UT",
    zip: "84010",
    phone: "801.747.7244",
    specialty: ["Sleep Medicine", "Bountiful"],
    image: "/modern-hospital-bedroom-with-white-bedding.jpg",
    coordinates: { lat: 40.8621, lng: -111.866 },
  },
  {
    id: 4,
    name: "COTTONWOOD HEIGHTS CLINIC",
    address: "6322 S 3000 E STE 100",
    city: "Cottonwood Heights",
    state: "UT",
    zip: "84121",
    phone: "801-576-2035",
    specialty: ["Sleep Medicine"],
    image: "/medical-clinic-exterior-building.jpg",
    coordinates: { lat: 40.6272, lng: -111.8149 },
  },
  {
    id: 5,
    name: "MOUNTAIN SLEEP SPECIALISTS",
    address: "789 E Medical Dr",
    city: "Provo",
    state: "UT",
    zip: "84604",
    phone: "801.555.1234",
    specialty: ["Sleep Medicine", "Medican"],
    image: "/modern-medical-office.png",
    coordinates: { lat: 40.2338, lng: -111.6585 },
  },
  {
    id: 6,
    name: "REST WELL SLEEP CENTER",
    address: "456 Sleep Lane",
    city: "Southwood",
    state: "UT",
    zip: "84107",
    phone: "801.555.5678",
    specialty: ["Sleep Medicine", "Southwood"],
    image: "/peaceful-bedroom-with-soft-lighting.jpg",
    coordinates: { lat: 40.6499, lng: -111.8888 },
  },
  {
    id: 7,
    name: "BIENASEACH SLEEP CLINIC",
    address: "123 Dream Street",
    city: "Salt Lake City",
    state: "UT",
    zip: "84101",
    phone: "801.555.9012",
    specialty: ["Sleep Medicine", "Bienaseach"],
    image: "/medical-examination-room.png",
    coordinates: { lat: 40.7608, lng: -111.891 },
  },
  {
    id: 8,
    name: "PEACEFUL NIGHTS CENTER",
    address: "321 Moonlight Ave",
    city: "Bountiful",
    state: "UT",
    zip: "84010",
    phone: "801.555.3456",
    specialty: ["Sleep Medicine", "Bountiful"],
    image: "/comfortable-hotel-bedroom.jpg",
    coordinates: { lat: 40.8894, lng: -111.8808 },
  },
]

export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export const cities = [
  "American Fork",
  "Bountiful",
  "Cottonwood Heights",
  "Provo",
  "Salt Lake City",
  "Southwood",
  "Sandy",
  "Orem",
  "West Jordan",
  "West Valley City",
]

export const specialties = ["Sleep Medicine", "Medican", "Bountiful", "Bienaseach", "Southwood"]
