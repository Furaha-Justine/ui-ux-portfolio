import { SectionContainer } from "@/components/section-container"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Users, Lightbulb } from "lucide-react"

export function GetToKnowMeSection() {
  return (
    <SectionContainer
      id="get-to-know-me"
      className="bg-gradient-to-br from-background to-secondary/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get to Know Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Beyond the pixels and prototypes, here's what drives my passion for
            design
          </p>
        </div>

        <div className="space-y-16">
          {/* Cards in row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-elegant-hover transition-all-smooth border-0 shadow-elegant bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Personal Journey
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  My journey into design began with a fascination for how people
                  interact with technology. I discovered that the best designs
                  are invisible – they work so seamlessly that users don't even
                  think about them.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant-hover transition-all-smooth border-0 shadow-elegant bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Design Philosophy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I believe in designing with empathy, testing with users, and
                  iterating based on real feedback. Every pixel has a purpose,
                  and every interaction should feel natural and delightful.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant-hover transition-all-smooth border-0 shadow-elegant bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Global Perspective
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Having worked with diverse teams across different cultures, I
                  bring a global perspective to design challenges, ensuring
                  solutions work for users from all backgrounds.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant-hover transition-all-smooth border-0 shadow-elegant bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Community Impact
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Outside of work, I enjoy photography, traveling to experience
                  different cultures, and volunteering to teach design skills to
                  underrepresented communities in tech.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
