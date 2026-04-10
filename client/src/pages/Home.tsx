import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, TrendingUp, Users, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import HeroThreeJS from "@/components/HeroThreeJS";
import HeroOverlay from "@/components/HeroOverlay";
import { ServicesEffect, ValuesEffect, PortfolioEffect, FAQEffect, CTAEffect } from "@/components/SectionEffects";
import { SplitText, GradientText, CharacterReveal } from "@/components/TextEffects";

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
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ServicesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="servicos-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Nossos Serviços" className="text-5xl font-bold" />
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <CharacterReveal text="Soluções de marketing orientadas por dados e precisão algorítmica" className="text-xl" />
            </p>
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
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ValuesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="valores-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Nossos Valores" className="text-5xl font-bold" />
            </h2>
            <p className="text-xl text-muted-foreground">
              <CharacterReveal text="Princípios que guiam nossa jornada celestial" className="text-xl" />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Precisão", desc: "Cada decisão baseada em dados concretos e análise profunda" },
              { title: "Autenticidade", desc: "Transparência total em estratégias e resultados" },
              { title: "Visão Celestial", desc: "Pensamento estratégico de longo prazo e escalável" },
              { title: "Geometria Sagrada", desc: "Harmonia entre arte, ciência e tecnologia" }
            ].map((value, idx) => (
              <div key={idx} className="scroll-reveal p-6 rounded-xl bg-card/40 border border-border text-center" id={`value-${idx}`}>
                <h3 className="font-bold mb-2 text-accent">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Portfólio */}
      <section id="portfolio" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <PortfolioEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="portfolio-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Portfólio" className="text-5xl font-bold" />
            </h2>
            <p className="text-xl text-muted-foreground">
              <CharacterReveal text="Histórias de transformação através de dados" className="text-xl" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Premium",
                metric: "+156%",
                desc: "ROI em 6 meses",
                detail: "Estratégia de marketing orientada por dados transformou um e-commerce tradicional em líder de mercado através de otimização de funil, personalização de conteúdo e automação inteligente."
              },
              {
                title: "SaaS B2B",
                metric: "-34%",
                desc: "Redução de CAC",
                detail: "Implementação de sistema de lead scoring e nurturing automático reduziu custo de aquisição enquanto aumentava qualidade dos clientes em 89%."
              },
              {
                title: "Consultoria Digital",
                metric: "+500%",
                desc: "Aumento de leads",
                detail: "Transformação completa da presença digital com conteúdo estratégico, SEO técnico e automação de marketing resultou em crescimento exponencial de leads qualificados."
              }
            ].map((project, idx) => (
              <div key={idx} className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border hover:border-accent/50 transition-all" id={`portfolio-${idx}`}>
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-accent">{project.metric}</span>
                    <span className="text-sm text-muted-foreground">{project.desc}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{project.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <FAQEffect />
        </div>
        
        <div className="relative z-10 container max-w-3xl">
          <div className="text-center mb-16 scroll-reveal" id="faq-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Perguntas Frequentes" className="text-5xl font-bold" />
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Como vocês garantem ROI positivo?",
                a: "Utilizamos metodologia baseada em dados com acompanhamento contínuo de KPIs. Cada estratégia é testada, medida e otimizada em tempo real para garantir resultados mensuráveis."
              },
              {
                q: "Qual é o tempo médio para ver resultados?",
                a: "Os primeiros resultados aparecem em 30 dias. Transformações significativas geralmente ocorrem entre 90-180 dias, dependendo da complexidade da estratégia."
              },
              {
                q: "Vocês trabalham com empresas de qualquer tamanho?",
                a: "Sim! Trabalhamos com startups, PMEs e grandes corporações. Adaptamos nossas soluções ao orçamento e objetivos específicos de cada cliente."
              },
              {
                q: "Como é o processo de onboarding?",
                a: "Começamos com auditoria completa, definição de KPIs, estratégia customizada e implementação faseada com relatórios semanais de progresso."
              },
              {
                q: "Vocês oferecem suporte contínuo?",
                a: "Sim, oferecemos suporte 24/7, otimizações contínuas e relatórios mensais detalhados. Você terá um gestor dedicado para sua conta."
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-lg px-4 scroll-reveal" id={`faq-${idx}`}>
                <AccordionTrigger className="hover:text-accent transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <CTAEffect />
        </div>
        
        <div className="relative z-10 container text-center">
          <div className="scroll-reveal" id="cta-content">
            <h2 className="text-5xl font-bold mb-6">
              <GradientText>Pronto para Transformar?</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deixe-nos redefinir seu marketing com precisão algorítmica e visão celestial. Sua transformação digital começa aqui.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="text-lg px-8 py-4">Iniciar Jornada</Button>
              <Button variant="outline" className="text-lg px-8 py-4">Agendar Consulta</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold mb-4">SUED Studio</h3>
              <p className="text-sm text-muted-foreground">Transformando marketing digital através de precisão algorítmica e visão celestial.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#servicos" className="text-muted-foreground hover:text-accent transition-colors">Serviços</a></li>
                <li><a href="#valores" className="text-muted-foreground hover:text-accent transition-colors">Valores</a></li>
                <li><a href="#portfolio" className="text-muted-foreground hover:text-accent transition-colors">Portfólio</a></li>
                <li><a href="#faq" className="text-muted-foreground hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:contato@sued.studio" className="text-muted-foreground hover:text-accent transition-colors">contato@sued.studio</a></li>
                <li className="text-muted-foreground">São Paulo, Brasil</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
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
