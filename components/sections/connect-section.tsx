import { ExternalLink } from "lucide-react"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"

export function ConnectSection() {
  return (
    <SectionContainer id="connect" className="bg-background">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Connect With Me</h2>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          Follow my design journey and explore my work on these professional platforms.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Behance</h3>
              <p className="text-muted-foreground">
                Explore my complete portfolio showcasing detailed case studies and design process documentation.
              </p>
            </div>
            <CTAButton variant="primary" size="md" href="https://behance.net/uwizefuraha" className="w-full">
              View on Behance
            </CTAButton>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Dribbble</h3>
              <p className="text-muted-foreground">
                Discover my latest design shots, experiments, and creative explorations in the design community.
              </p>
            </div>
            <CTAButton variant="secondary" size="md" href="https://dribbble.com/uwizefuraha" className="w-full">
              View on Dribbble
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
