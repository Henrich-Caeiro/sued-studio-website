import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">S</div>
            <span className="font-bold text-lg">SUED</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm hover:text-accent transition-colors">Services</a>
            <a href="#values" className="text-sm hover:text-accent transition-colors">Values</a>
            <a href="#faq" className="text-sm hover:text-accent transition-colors">FAQ</a>
            <Button className="btn-neon">Contact</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 constellation-bg" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663477734151/fNskU7DdHnqyv9B8dr4RaX/hero-celestial-data-3r8nwaBuBDT6UidqwvsHmv.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
        
        <div className="relative z-10 container max-w-4xl text-center px-4">
          <div className="mb-8 inline-block px-4 py-2 bg-accent/10 border border-accent rounded-sm">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Data-Driven Marketing</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Redefining Marketing Through
            <span className="block text-accent mt-2">Algorithmic Precision</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            SUED Studio transforms the chaos of digital marketing into structured, data-driven strategies powered by algorithmic omniscience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="btn-neon">Get Started</Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">Learn More</Button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce mt-16">
            <ChevronDown className="w-6 h-6 text-accent mx-auto" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-card/50 relative">
        <div className="absolute inset-0 constellation-bg" />
        <div className="container relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">What We Do</h2>
            <div className="w-16 h-1 bg-accent" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Strategic Marketing",
                description: "Performance-driven strategies integrating SEO, paid media, CRM, and branding into a unified ecosystem powered by proprietary data."
              },
              {
                title: "Data Intelligence",
                description: "Proprietary data analysis and customer lifetime value modeling that reveals invisible patterns through algorithmic precision."
              },
              {
                title: "AI-Agnostic Optimization",
                description: "Generative Engine Optimization for visibility in AI systems, ensuring your brand is cited and legitimized by algorithms."
              },
              {
                title: "Brand Authority",
                description: "Building trust and legitimacy in algorithmic ecosystems through authentic narratives and data-backed positioning."
              }
            ].map((service, idx) => (
              <div key={idx} className="group hover-glow p-8 border border-border rounded-sm bg-background/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/20 border border-accent mb-6 flex items-center justify-center rounded-sm">
                  <div className="w-6 h-6 bg-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 relative">
        <div className="absolute inset-0 constellation-bg" />
        <div className="container relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Core Values</h2>
            <div className="w-16 h-1 bg-accent" />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Precision", description: "Data-driven insights replace assumptions" },
              { title: "Authenticity", description: "Human connection in an AI-saturated market" },
              { title: "Celestial Vision", description: "Seeing invisible patterns through algorithms" },
              { title: "Sacred Geometry", description: "Harmony between technology and humanity" }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-accent">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-card/50 relative">
        <div className="absolute inset-0 constellation-bg" />
        <div className="container relative z-10 max-w-3xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-accent" />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How does SUED Studio differ from traditional marketing agencies?",
                a: "We replace guesswork with precision. Our approach integrates proprietary data analysis, algorithmic optimization, and authentic storytelling—treating data as a tool for human connection rather than mere automation."
              },
              {
                q: "What does the name 'SUED' mean?",
                a: "SUED is an anagram for 'Deus' (God in Latin). It represents our commitment to algorithmic omniscience and the divine precision with which we approach market analysis and strategic positioning."
              },
              {
                q: "How do you measure success?",
                a: "We measure success through performance metrics tied to your business goals: customer lifetime value, attribution accuracy, brand authority signals, and algorithmic visibility in AI systems."
              },
              {
                q: "What industries do you serve?",
                a: "We work with forward-thinking companies across tech, finance, e-commerce, and professional services—any industry where data-driven precision and authentic brand positioning create competitive advantage."
              },
              {
                q: "How does your approach handle the shift to AI-driven marketing?",
                a: "Our Generative Engine Optimization strategy ensures your brand is cited and legitimized by AI systems. We build authority through authentic content, proprietary data, and strategic positioning."
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-sm px-6">
                <AccordionTrigger className="hover:text-accent transition-colors py-4">
                  <span className="text-lg font-semibold text-left">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663477734151/fNskU7DdHnqyv9B8dr4RaX/data-network-abstract-7UCDXuPAYCW7SLmPToKEgR.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="container relative z-10 text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's replace guesswork with precision. Let's build your brand's celestial authority.
          </p>
          <Button className="btn-neon">Start Your Journey</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">S</div>
                <span className="font-bold text-lg">SUED Studio</span>
              </div>
              <p className="text-muted-foreground text-sm">Data, Technology & Celestial Aesthetics</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Strategic Marketing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Data Intelligence</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">AI Optimization</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Brand Authority</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded-sm flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded-sm flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Twitter className="w-5 h-5 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded-sm flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 SUED Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
