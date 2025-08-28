"use client"

import { Download } from "lucide-react"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"

export function ProfessionalMaterialsSection() {
  const handleDownloadCV = () => {
    // This would trigger a download of the CV file
    console.log("Downloading CV...")
  }

  const handleDownloadCoverLetter = () => {
    // This would trigger a download of the cover letter
    console.log("Downloading Cover Letter...")
  }

  return (
    <SectionContainer id="professional-materials" className="bg-card">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Professional Materials</h2>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          Download my professional documents to learn more about my experience, skills, and career journey.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background p-8 rounded-lg shadow-sm border">
            <div className="mb-6">
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Curriculum Vitae</h3>
              <p className="text-muted-foreground">
                Comprehensive overview of my professional experience, education, and achievements in UI/UX design.
              </p>
            </div>
            <CTAButton variant="primary" size="md" onClick={handleDownloadCV}>
              Download CV
            </CTAButton>
          </div>

          <div className="bg-background p-8 rounded-lg shadow-sm border">
            <div className="mb-6">
              <Download className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Cover Letter</h3>
              <p className="text-muted-foreground">
                Personal introduction highlighting my passion for design and what I can bring to your team.
              </p>
            </div>
            <CTAButton variant="secondary" size="md" onClick={handleDownloadCoverLetter}>
              Download Cover Letter
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
