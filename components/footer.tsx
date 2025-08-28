import { Heart, Mail, Linkedin, Github, Dribbble } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-foreground via-foreground to-foreground/95 text-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Get In Touch</h3>
            <div className="space-y-2">
              <a
                href="mailto:uwizefuraha@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                uwizefuraha@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Connect</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://linkedin.com/in/uwizefuraha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 rounded-full hover:bg-primary hover:scale-110 transition-all-smooth"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://dribbble.com/uwizefuraha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 rounded-full hover:bg-primary hover:scale-110 transition-all-smooth"
              >
                <Dribbble className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/uwizefuraha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/10 rounded-full hover:bg-primary hover:scale-110 transition-all-smooth"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Philosophy</h3>
            <p className="text-sm opacity-90 italic">
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary animate-pulse-subtle" /> by Uwize Furaha
          </p>
          <p className="text-xs mt-2 opacity-75">© {new Date().getFullYear()} Uwize Furaha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
