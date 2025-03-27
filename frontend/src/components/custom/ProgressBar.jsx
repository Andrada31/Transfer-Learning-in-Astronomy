"use client"

import * as React from "react"

export function ProgressBar({ sections }) {
  const [activeSection, setActiveSection] = React.useState(0)
  const [lineHeight, setLineHeight] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const maxScroll = docHeight - windowHeight

      const scrollPercentage = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0
      const newActiveSection = Math.min(
        Math.floor((scrollPercentage / 100) * sections.length),
        sections.length - 1
      )

      setActiveSection(newActiveSection)
      setLineHeight(scrollPercentage) // Keep line within bounds
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (index) => {
    const element = document.getElementById(sections[index].id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed right-16 top-1/2 transform -translate-y-1/2 flex items-center">
      <div className="relative h-[700px] flex items-center">
        <div className="absolute right-full mr-4 h-full flex flex-col justify-between">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className={`text-sm text-right transition-colors duration-300 hover:text-[#7b84ff]
                ${index <= activeSection ? "text-[#6c88da] font-medium" : "text-muted-foreground"}`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white" />

        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#6c88da] transition-all duration-300"
          style={{
            height: `${Math.min(lineHeight, 100)}%`,
            top: 0,
          }}
        />
        <div className="relative h-full flex flex-col justify-between">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center">
              <button
                onClick={() => scrollToSection(index)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300
                  ${index <= activeSection ? "border-[#6c88da] bg-[#6c88da]" : "border-[#6c88da] bg-white"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
