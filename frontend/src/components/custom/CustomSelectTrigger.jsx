"use client"
import { useState } from "react"
import { ChevronDownIcon, CheckIcon } from "lucide-react"

export default function CustomSelectTrigger({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find(opt => opt.id === value)

  return (
    <div className="relative w-[340px] text-white">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-white/20 bg-[#2a3158] px-4 py-2 text-sm cursor-pointer"
      >
        {selectedOption?.name || "Select an option"}
        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-white/10 bg-[#1e2344] shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id)
                setOpen(false)
              }}
              className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer rounded ${
                opt.id === value ? "bg-[#161b36]" : "hover:bg-[#161b36]"
              }`}
            >
              {opt.name}
              {opt.id === value && <CheckIcon className="w-4 h-4 opacity-70" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
