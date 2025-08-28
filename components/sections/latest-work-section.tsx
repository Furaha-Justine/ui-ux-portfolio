"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"
import { ExternalLink, Eye } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Mobile App",
    description: "A comprehensive mobile shopping experience with intuitive navigation and seamless checkout process.",
    image: "/modern-mobile-app-interface-ecommerce.png",
    link: "#",
    tags: ["Mobile Design", "E-Commerce", "User Research"],
  },
  {
    id: 2,
    title: "SaaS Dashboard Redesign",
    description: "Complete redesign of a complex analytics dashboard focusing on data visualization and user workflow.",
    image: "/clean-dashboard-interface-analytics.png",
    link: "#",
    tags: ["Web Design", "Dashboard", "Data Visualization"],
  },
  {
    id: 3,
    title: "Healthcare Patient Portal",
    description: "User-friendly patient portal design prioritizing accessibility and ease of use for all age groups.",
    image: "/healthcare-app-interface-clean-modern.png",
    link: "#",
    tags: ["Healthcare", "Accessibility", "Web Design"],
  },
  {
    id: 4,
    title: "Financial Planning App",
    description: "Intuitive financial management app with clear data visualization and goal tracking features.",
    image: "/financial-app-interface-modern-clean.png",
    link: "#",
    tags: ["FinTech", "Mobile Design", "Data Visualization"],
  },
]

export function LatestWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <SectionContainer ref={sectionRef} id="latest-work" className="bg-card">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 animate-fade-in-up">My Latest Work</h2>
        <p
          className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Explore some of my recent projects where I've applied user-centered design principles to solve complex
          problems and create meaningful digital experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="project-card group hover:shadow-elegant-hover transition-all-smooth overflow-hidden opacity-0 transform translate-y-8 border-0 shadow-elegant"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <CTAButton
                variant="primary"
                size="sm"
                href={project.link}
                className="group/btn transform hover:scale-105 transition-all-smooth shadow-lg hover:shadow-xl"
              >
                <span>View Project</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </CTAButton>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let's collaborate to bring your vision to life with thoughtful design and user-centered solutions.
          </p>
          <CTAButton
            variant="primary"
            size="lg"
            href="#contact"
            className="transform hover:scale-105 transition-all-smooth shadow-elegant hover:shadow-elegant-hover"
          >
            Let's Work Together
          </CTAButton>
        </div>
      </div>
    </SectionContainer>
  )
}
