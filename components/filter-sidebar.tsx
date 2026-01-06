"use client"

import { useState } from "react"
import { Moon, MapPin, Building2, Stethoscope, Filter, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterSidebarProps {
  onFilterChange: (filters: {
    specialty: string
    state: string
    city: string
    selectedFilters: string[]
  }) => void
  states: string[]
  cities: string[]
  specialties: string[]
  services: string[]
}

export function FilterSidebar({ onFilterChange, states, cities, specialties, services }: FilterSidebarProps) {
  const [specialty, setSpecialty] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [mapZoom, setMapZoom] = useState(10)

  const handleSpecialtyChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setSpecialty(newValue)
    onFilterChange({ specialty: newValue, state, city, selectedFilters })
  }

  const handleStateChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setState(newValue)
    onFilterChange({ specialty, state: newValue, city, selectedFilters })
  }

  const handleCityChange = (value: string) => {
    const newValue = value === "all" ? "" : value
    setCity(newValue)
    onFilterChange({ specialty, state, city: newValue, selectedFilters })
  }

  const handleCheckboxChange = (filter: string) => {
    const updated = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter]
    setSelectedFilters(updated)
    onFilterChange({ specialty, state, city, selectedFilters: updated })
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
