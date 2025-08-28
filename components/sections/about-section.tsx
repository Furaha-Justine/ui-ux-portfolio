import { SectionContainer } from "@/components/section-container"

export function AboutSection() {
  return (
    <SectionContainer id="about" className="bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Me</h2>
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
          <p className="text-lg mb-6">
            I'm a passionate UI/UX Designer with over 5 years of experience creating digital solutions that prioritize
            user experience while achieving business objectives. My approach combines analytical thinking with creative
            problem-solving to deliver designs that are both beautiful and functional.
          </p>
          <p className="text-lg mb-6">
            Throughout my career, I've had the privilege of working with diverse clients across various industries, from
            startups to established enterprises. I specialize in user research, wireframing, prototyping, and creating
            comprehensive design systems that scale with growing businesses.
          </p>
          <p className="text-lg">
            When I'm not designing, you'll find me exploring the latest design trends, contributing to design
            communities, or mentoring aspiring designers. I believe that great design has the power to make technology
            more accessible and meaningful for everyone.
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
