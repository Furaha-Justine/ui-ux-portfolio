import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { GetToKnowMeSection } from "@/components/sections/get-to-know-me-section"
import { LatestWorkSection } from "@/components/sections/latest-work-section"
import { ReflectionJournalSection } from "@/components/sections/reflection-journal-section"
import { ProfessionalMaterialsSection } from "@/components/sections/professional-materials-section"
import { ConnectSection } from "@/components/sections/connect-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <GetToKnowMeSection />
        </section>
        <section id="work">
          <LatestWorkSection />
        </section>
        <section id="journal">
          <ReflectionJournalSection />
          <ProfessionalMaterialsSection />
          <ConnectSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
        <Footer />
        <ChatWidget />
        <ScrollToTop />
      </main>
    </>
  )
}
