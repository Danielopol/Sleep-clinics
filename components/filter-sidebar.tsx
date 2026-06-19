"use client"

import { useState, useRef } from "react"
import { Moon, MapPin, Building2, Stethoscope, Filter, Plus, Minus, LocateFixed, Loader2, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterValues {
  specialty: string
  state: string
  city: string
  selectedFilters: string[]
  userLat?: number
  userLng?: number
  radius?: number // km
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterValues) => void
  states: string[]
  cities: string[]
  specialties: string[]
  services: string[]
}

const RADIUS_OPTIONS = [1, 5, 10, 25, 50, 100] // km

export function FilterSidebar({ onFilterChange, states, cities, specialties, services }: FilterSidebarProps) {
  const [specialty, setSpecialty] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [mapZoom, setMapZoom] = useState(10)

  // "Sleep doctor near me" state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [radius, setRadius] = useState(25) // applied radius (km), used as a fallback default
  const [radiusInput, setRadiusInput] = useState("") // editable text in the box (empty shows the placeholder)
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const radiusTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Emit the full current filter set, with any in-flight overrides applied on top.
  const emit = (overrides: Partial<FilterValues> = {}) => {
    onFilterChange({
      specialty,
      state,
      city,
      selectedFilters,
      userLat: userCoords?.lat,
      userLng: userCoords?.lng,
      radius: userCoords ? radius : undefined,
      ...overrides,
    })
  }

  const handleSpecialtyChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setSpecialty(newValue)
    emit({ specialty: newValue })
  }

  const handleStateChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setState(newValue)
    emit({ state: newValue })
  }

  const handleCityChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setCity(newValue)
    emit({ city: newValue })
  }

  const handleCheckboxChange = (filter: string) => {
    const updated = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter]
    setSelectedFilters(updated)
    emit({ selectedFilters: updated })
  }

  const handleUseLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError("Location isn't supported by your browser.")
      return
    }
    // Use whatever distance is currently in the box (fall back to the applied radius).
    const parsed = parseFloat(radiusInput)
    const effectiveRadius = Number.isFinite(parsed) && parsed > 0 ? parsed : radius
    setRadius(effectiveRadius)
    setRadiusInput(String(effectiveRadius))
    setLocating(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude }
        setUserCoords(coords)
        setLocating(false)
        emit({ userLat: coords.lat, userLng: coords.lng, radius: effectiveRadius })
      },
      (error) => {
        setLocating(false)
        setGeoError(
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Enable it to find clinics near you."
            : "Couldn't get your location. Please try again."
        )
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    )
  }

  // Apply a valid radius: update state and (if located) refetch.
  const applyRadius = (newRadius: number) => {
    setRadius(newRadius)
    if (userCoords) {
      emit({ radius: newRadius, userLat: userCoords.lat, userLng: userCoords.lng })
    }
  }

  // Typed input: update the box immediately, debounce the actual filter update.
  const handleRadiusInput = (value: string) => {
    setRadiusInput(value)
    if (radiusTimer.current) clearTimeout(radiusTimer.current)
    const parsed = parseFloat(value)
    if (Number.isFinite(parsed) && parsed > 0) {
      radiusTimer.current = setTimeout(() => applyRadius(parsed), 500)
    }
  }

  // On blur/Enter, commit a valid value. Leave an empty/invalid box empty so the placeholder shows.
  const commitRadiusInput = () => {
    if (radiusTimer.current) clearTimeout(radiusTimer.current)
    const parsed = parseFloat(radiusInput)
    if (Number.isFinite(parsed) && parsed > 0) {
      setRadiusInput(String(parsed))
      applyRadius(parsed)
    }
  }

  // Quick-pick chip: apply immediately.
  const handleQuickRadius = (r: number) => {
    if (radiusTimer.current) clearTimeout(radiusTimer.current)
    setRadiusInput(String(r))
    applyRadius(r)
  }

  const handleClearLocation = () => {
    setUserCoords(null)
    setGeoError(null)
    emit({ userLat: undefined, userLng: undefined, radius: undefined })
  }

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Filter Panel */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm overflow-hidden">
        {/* Header with sleep theme */}
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-900 dark:text-white font-semibold">Find Your Clinic</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Filter sleep care providers
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Service Select */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[var(--dream-blue)]" />
              Service
            </Label>
            <Select value={specialty || "all"} onValueChange={handleSpecialtyChange}>
              <SelectTrigger className="w-full h-11 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:border-[var(--dream-blue)] focus:border-[var(--dream-blue)] transition-colors">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <SelectItem value="all" className="text-slate-900 dark:text-white">All Services</SelectItem>
                {services.map((s) => (
                  <SelectItem key={s} value={s} className="text-slate-900 dark:text-white">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State Select */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--healing-teal)]" />
              State
            </Label>
            <Select value={state || "all"} onValueChange={handleStateChange}>
              <SelectTrigger className="w-full h-11 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:border-[var(--healing-teal)] focus:border-[var(--healing-teal)] transition-colors">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <SelectItem value="all" className="text-slate-900 dark:text-white">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s} className="text-slate-900 dark:text-white">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Select */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[var(--calm-indigo)]" />
              City
            </Label>
            <Select value={city || "all"} onValueChange={handleCityChange}>
              <SelectTrigger className="w-full h-11 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:border-[var(--calm-indigo)] focus:border-[var(--calm-indigo)] transition-colors">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                <SelectItem value="all" className="text-slate-900 dark:text-white">All Cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c} className="text-slate-900 dark:text-white">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          {/* Services Checkboxes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Moon className="h-4 w-4 text-[var(--dream-blue)]" />
              Services & Treatments
            </Label>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 group"
                  >
                    <Checkbox
                      checked={selectedFilters.includes(service)}
                      onCheckedChange={() => handleCheckboxChange(service)}
                      className="border-slate-300 dark:border-slate-500 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[var(--dream-blue)] data-[state=checked]:to-[var(--healing-teal)] data-[state=checked]:border-transparent"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Selected count badge */}
          {selectedFilters.length > 0 && (
            <div className="flex items-center justify-between pt-2 px-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {selectedFilters.length} service{selectedFilters.length > 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => {
                  setSelectedFilters([])
                  onFilterChange({ specialty, state, city, selectedFilters: [] })
                }}
                className="text-xs text-[var(--dream-blue)] hover:text-[var(--dream-blue-dark)] font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sleep doctor near me */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--healing-teal)] text-white">
              <LocateFixed className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-900 dark:text-white font-semibold">Sleep doctor near me</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Find clinics within a set distance
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Distance: type any value or pick a quick option */}
          <div className="space-y-2">
            <Label htmlFor="near-me-radius" className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--healing-teal)]" />
              Distance
            </Label>
            <div className="relative flex items-center h-11 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus-within:border-[var(--healing-teal)] transition-colors">
              <input
                id="near-me-radius"
                type="number"
                min={1}
                step="any"
                inputMode="decimal"
                value={radiusInput}
                placeholder="Type your distance"
                onChange={(e) => handleRadiusInput(e.target.value)}
                onBlur={commitRadiusInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    commitRadiusInput()
                  }
                }}
                aria-label="Distance in kilometers"
                className="flex-1 min-w-0 h-full bg-transparent px-3 text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="px-3 text-sm font-medium text-slate-500 dark:text-slate-400 select-none">km</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleQuickRadius(r)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    radiusInput === String(r)
                      ? "bg-[var(--healing-teal)] text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Use my location button */}
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--healing-teal)] hover:bg-[var(--healing-teal)]/90 disabled:opacity-70 text-white rounded-xl font-semibold transition-all duration-200 shadow-md"
          >
            {locating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <LocateFixed className="h-4 w-4" />
                {userCoords ? "Update my location" : "Use my location"}
              </>
            )}
          </button>

          {/* Active state / errors */}
          {userCoords && (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-[var(--healing-teal)]/10 px-3 py-2">
              <span className="text-xs text-slate-700 dark:text-slate-200">
                Showing clinics within {radius} km of you
              </span>
              <button
                type="button"
                onClick={handleClearLocation}
                aria-label="Clear location filter"
                className="flex-shrink-0 p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {geoError && (
            <p className="text-xs text-red-600 dark:text-red-400">{geoError}</p>
          )}
        </CardContent>
      </Card>

      {/* Map Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="relative h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97480.0637847!2d-111.8910!3d40.3772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d7febe774c745%3A0x3b7c8d8d8e2e7a9e!2sAmerican%20Fork%2C%20UT!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Map Controls */}
          <button className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-white hover:shadow-lg transition-all flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--dream-blue)]" />
            Navigate
          </button>

          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button
              onClick={() => setMapZoom(mapZoom + 1)}
              className="bg-white/95 backdrop-blur-sm w-10 h-10 rounded-lg shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all"
            >
              <Plus size={20} className="text-slate-700" />
            </button>
            <button
              onClick={() => setMapZoom(Math.max(1, mapZoom - 1))}
              className="bg-white/95 backdrop-blur-sm w-10 h-10 rounded-lg shadow-md flex items-center justify-center hover:bg-white hover:shadow-lg transition-all"
            >
              <Minus size={20} className="text-slate-700" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
