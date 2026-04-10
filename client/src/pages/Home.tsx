import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, TrendingUp, Users, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import HeroThreeJS from "@/components/HeroThreeJS";
import ScrollReactiveThreeJS from "@/components/ScrollReactiveThreeJS";
import HeroOverlay from "@/components/HeroOverlay";

const Button = ({ children, className = "", variant = "default" }: any) => (
  <button className={`px-6 py-3 rounded-lg font-semibold transition-all ${
    variant === "outline" 
      ? "border border-accent text-accent hover:bg-accent/10" 
      : "bg-accent text-background hover:bg-accent/90"
  } ${className}`}>
    {children}
  </button>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navegação */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Logo will be added via HeroOverlay in hero section */}
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm hover:text-accent transition-colors">Serviços</a>
            <a href="#valores" className="text-sm hover:text-accent transition-colors">Valores</a>
            <a href="#portfolio" className="text-sm hover:text-accent transition-colors">Portfólio</a>
            <a href="#faq" className="text-sm hover:text-accent transition-colors">FAQ</a>
            <Button>Contato</Button>
          </div>
        </div>
      </nav>

      {/* Seção Hero com Three.js e HeroOverlay Clean */}
      <section className="hero-container relative w-full h-screen overflow-hidden">
        {/* Three.js Canvas Background */}
        <HeroThreeJS />
        
        {/* Clean Hero Overlay */}
        <HeroOverlay />
      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <ScrollReactiveThreeJS sectionId="servicos" particleColor="#20B2AA" particleCount={200} />
        
        <div className="relative z-20 container">
          <div className="text-center mb-16 scroll-reveal" id="servicos-title">
            <h2 className="text-5xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Soluções de marketing orientadas por dados e precisão algorítmica</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Marketing Estratégico", desc: "Estratégias estruturadas e orientadas por dados" },
              { icon: TrendingUp, title: "Inteligência de Dados", desc: "Análise profunda de métricas e comportamentos" },
              { icon: Users, title: "Otimização IA", desc: "Algoritmos inteligentes para máxima conversão" },
              { icon: Mail, title: "Autoridade de Marca", desc: "Posicionamento celestial no mercado" }
            ].map((service, idx) => (
              <div key={idx} className="scroll-reveal interactive-card p-6 rounded-xl bg-card/40 border border-border hover:border-accent/50 transition-all" id={`service-${idx}`}>
                <service.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Valores */}
      <section id="valores" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <ScrollReactiveThreeJS sectionId="valores" particleColor="#4A90E2" particleCount={200} />
        
        <div className="relative z-20 container">
          <div className="text-center mb-16 scroll-reveal" id="valores-title">
            <h2 className="text-5xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground">Princípios que guiam nossa jornada celestial</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Precisão Algorítmica", desc: "Cada decisão é fundamentada em dados, não em intuição" },
              { title: "Autenticidade Radical", desc: "Transparência total em estratégias e resultados" },
              { title: "Visão Celestial", desc: "Enxergamos além do horizonte do mercado" },
              { title: "Geometria Sagrada", desc: "Harmonia perfeita entre dados e criatividade" }
            ].map((valor, idx) => (
              <div key={idx} className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border hover:border-accent/50 transition-all" id={`valor-${idx}`}>
                <h3 className="text-2xl font-bold mb-3 text-accent">{valor.title}</h3>
                <p className="text-muted-foreground">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Portfólio */}
      <section id="portfolio" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <ScrollReactiveThreeJS sectionId="portfolio" particleColor="#00D9FF" particleCount={250} />
        
        <div className="relative z-20 container">
          <div className="text-center mb-16 scroll-reveal" id="portfolio-title">
            <h2 className="text-5xl font-bold mb-4">Portfólio</h2>
            <p className="text-xl text-muted-foreground">Histórias de transformação através de dados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "E-commerce Transformado", metrics: "+156% ROI", desc: "Otimização de funil de vendas com IA" },
              { title: "SaaS Escalável", metrics: "-34% CAC", desc: "Redução de custo de aquisição através de dados" },
              { title: "Consultoria Exponencial", metrics: "+500% Leads", desc: "Geração de leads qualificados com precisão" }
            ].map((case_study, idx) => (
              <div key={idx} className="scroll-reveal interactive-card p-8 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/50 transition-all" id={`case-${idx}`}>
                <div className="text-3xl font-bold text-accent mb-2">{case_study.metrics}</div>
                <h3 className="text-xl font-bold mb-2">{case_study.title}</h3>
                <p className="text-muted-foreground">{case_study.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <ScrollReactiveThreeJS sectionId="faq" particleColor="#D4AF37" particleCount={150} />
        
        <div className="relative z-20 container max-w-3xl">
          <div className="text-center mb-16 scroll-reveal" id="faq-title">
            <h2 className="text-5xl font-bold mb-4">Perguntas Frequentes</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Como começar com o SUED Studio?", a: "Entre em contato conosco para uma consulta inicial onde analisaremos suas necessidades e criaremos uma estratégia personalizada." },
              { q: "Qual é o prazo para ver resultados?", a: "Resultados iniciais aparecem em 30 dias, mas transformações significativas ocorrem entre 90-180 dias." },
              { q: "Como medem o sucesso?", a: "Utilizamos KPIs claros e mensuráveis: ROI, CAC, LTV, conversão e crescimento de receita." },
              { q: "Quais setores vocês atendem?", a: "Atendemos e-commerce, SaaS, consultoria, tecnologia e qualquer negócio orientado por dados." },
              { q: "Vocês oferecem suporte contínuo?", a: "Sim, oferecemos suporte 24/7 e otimizações contínuas das estratégias." }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="scroll-reveal border border-border rounded-lg px-6" id={`faq-${idx}`}>
                <AccordionTrigger className="hover:text-accent transition-colors">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <ScrollReactiveThreeJS sectionId="cta" particleColor="#20B2AA" particleCount={300} />
        
        <div className="relative z-20 container text-center">
          <div className="scroll-reveal" id="cta-content">
            <h2 className="text-5xl font-bold mb-6">Pronto para Transformar?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Deixe-nos redefinir seu marketing com precisão algorítmica e visão celestial</p>
            <Button className="text-lg px-8 py-4">Iniciar Jornada</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="text-muted-foreground text-sm">Dados, Tecnologia & Estética Celestial</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Serviços</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Portfólio</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Preços</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors"><Mail size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 SUED Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
