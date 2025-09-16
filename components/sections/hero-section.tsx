"use client"

import Image from "next/image"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"
import { ArrowDown, Sparkles } from "lucide-react"

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <SectionContainer className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>

              {/* Profile Image */}
              <Image
                src="/images/profile.jpg"
                alt="Uwizeyimana Furaha Justine - UI/UX Designer"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                priority
              />

              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-primary/30 group-hover:ring-secondary/40 transition-all duration-500 z-20"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-subtle" />
              <h1 className="text-4xl md:text-6xl font-bold gradient-text text-balance">
                Uwizeyimana Furaha Justine
              </h1>
              <Sparkles
                className="w-6 h-6 text-secondary animate-pulse-subtle"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <h2
              className="text-xl md:text-3xl font-medium text-primary animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              UI/UX Designer
            </h2>

            <p
              className="text-lg text-muted-foreground leading-relaxed text-pretty animate-fade-in-up max-w-lg"
              style={{ animationDelay: "0.4s" }}
            >
              Crafting intuitive digital experiences that bridge the gap between
              user needs and business goals through thoughtful design and
              user-centered solutions.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up pt-4"
              style={{ animationDelay: "0.6s" }}
            >
              <CTAButton
                variant="primary"
                size="lg"
                onClick={scrollToWork}
                className="w-full sm:w-auto"
              >
                View My Work
              </CTAButton>
              <CTAButton
                variant="secondary"
                size="lg"
                onClick={scrollToContact}
                className="w-full sm:w-auto"
              >
                Schedule a Meeting
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary/60" />
        </div>
      </div>
    </SectionContainer>
  );
}
