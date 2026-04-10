import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, TrendingUp, Users, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import HeroThreeJS from "@/components/HeroThreeJS";
import SectionThreeJS from "@/components/SectionThreeJS";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477734151/fNskU7DdHnqyv9B8dr4RaX/sued-logo_51291435.svg";

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
            <img 
              src={LOGO_URL} 
              alt="SUED Logo" 
              className="h-10 w-auto logo-animated"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm hover:text-accent transition-colors">Serviços</a>
            <a href="#valores" className="text-sm hover:text-accent transition-colors">Valores</a>
            <a href="#portfolio" className="text-sm hover:text-accent transition-colors">Portfólio</a>
            <a href="#faq" className="text-sm hover:text-accent transition-colors">FAQ</a>
            <Button className="btn-neon">Contato</Button>
          </div>
        </div>
      </nav>

      {/* Seção Hero com Three.js */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Three.js Canvas Background */}
        <HeroThreeJS />

        {/* Overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 z-10" />
        
        <div className="absolute top-0 left-0 right-0 h-1 accent-bar z-20" />
        
        {/* Conteúdo Hero */}
        <div className="relative z-20 container max-w-4xl text-center px-4">
          {/* Logo Grande no Hero */}
          <div className="mb-12 flex justify-center">
            <img 
              src={LOGO_URL} 
              alt="SUED Logo" 
              className="h-32 w-auto logo-animated animate-float"
            />
          </div>
          
          <div className="mb-8 inline-block px-4 py-2 bg-accent/10 border border-accent rounded animate-fade-in-up">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Marketing Orientado por Dados</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Redefinindo Marketing Através de
            <span className="block text-accent mt-2">Precisão Algorítmica</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            O SUED Studio transforma o caos do marketing digital em estratégias estruturadas e orientadas por dados, alimentadas pela onisciência algorítmica.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Button className="btn-neon">Começar Agora</Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">Saiba Mais</Button>
          </div>

          <div className="animate-bounce mt-16">
            <ChevronDown className="w-6 h-6 text-accent mx-auto" />
          </div>
        </div>
      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <SectionThreeJS sectionId="servicos" particleColor="#20B2AA" particleCount={200} />
        <div className="container relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">O Que Fazemos</h2>
            <div className="w-16 h-1 accent-bar animate-fade-in-up" style={{animationDelay: '0.1s'}} />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Marketing Estratégico",
                description: "Estratégias orientadas por desempenho integrando SEO, mídia paga, CRM e branding em um ecossistema unificado alimentado por dados proprietários.",
                icon: TrendingUp
              },
              {
                title: "Inteligência de Dados",
                description: "Análise de dados proprietários e modelagem de valor de vida do cliente que revelam padrões invisíveis através de precisão algorítmica.",
                icon: Zap
              },
              {
                title: "Otimização Agnóstica de IA",
                description: "Otimização de Mecanismo Generativo para visibilidade em sistemas de IA, garantindo que sua marca seja citada e legitimada por algoritmos.",
                icon: Users
              },
              {
                title: "Autoridade de Marca",
                description: "Construindo confiança e legitimidade em ecossistemas algorítmicos através de narrativas autênticas e posicionamento respaldado por dados.",
                icon: TrendingUp
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              const elementId = `service-${idx}`;
              return (
                <div 
                  key={idx} 
                  id={elementId}
                  className={`stagger-item group hover-lift p-8 border border-border rounded bg-background/50 transition-all duration-300 scroll-reveal interactive-card ${visibleElements.has(elementId) ? 'visible' : ''}`}
                >
                  <div className="w-12 h-12 bg-accent/20 border border-accent mb-6 flex items-center justify-center rounded animate-pulse-3d">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção de Valores */}
      <section id="valores" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <SectionThreeJS sectionId="valores" particleColor="#4A90E2" particleCount={200} />
        <div className="container relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Nossos Valores Centrais</h2>
            <div className="w-16 h-1 accent-bar animate-fade-in-up" style={{animationDelay: '0.1s'}} />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Precisão", description: "Insights orientados por dados substituem suposições" },
              { title: "Autenticidade", description: "Conexão humana em um mercado saturado de IA" },
              { title: "Visão Celestial", description: "Vendo padrões invisíveis através de algoritmos" },
              { title: "Geometria Sagrada", description: "Harmonia entre tecnologia e humanidade" }
            ].map((value, idx) => {
              const elementId = `value-${idx}`;
              return (
                <div 
                  key={idx} 
                  id={elementId}
                  className={`stagger-item text-center scroll-reveal ${visibleElements.has(elementId) ? 'visible' : ''}`}
                >
                  <div className="w-16 h-16 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-morph">
                    <span className="text-2xl font-bold text-accent">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção de Portfólio */}
      <section id="portfolio" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <SectionThreeJS sectionId="portfolio" particleColor="#00D9FF" particleCount={250} />
        <div className="container relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Portfólio de Sucesso</h2>
            <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Histórias de transformação que demonstram o poder da precisão algorítmica e da estratégia orientada por dados.
            </p>
            <div className="w-16 h-1 accent-bar animate-fade-in-up" style={{animationDelay: '0.2s'}} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Transformado",
                client: "RetailTech Solutions",
                challenge: "Redução de 40% em conversões devido a segmentação genérica",
                solution: "Implementamos modelagem de valor de vida do cliente e atribuição sofisticada",
                result: "Aumento de 156% em ROI, crescimento de 89% em receita em 6 meses",
                metrics: ["156% ROI", "+89% Receita", "6 meses"]
              },
              {
                title: "SaaS B2B Escalado",
                client: "CloudVenture Inc",
                challenge: "Custo de aquisição crescente, baixa retenção de clientes",
                solution: "Estratégia de GEO (Generative Engine Optimization) + CRM integrado",
                result: "Redução de 34% no CAC, aumento de 127% em retenção de clientes",
                metrics: ["-34% CAC", "+127% Retenção", "3 meses"]
              },
              {
                title: "Agência de Serviços Posicionada",
                client: "Consulting Group Elite",
                challenge: "Baixa visibilidade em sistemas de IA, posicionamento genérico",
                solution: "Construção de autoridade através de dados proprietários e narrativa celestial",
                result: "Posicionamento como líder de mercado, 5x aumento em leads qualificados",
                metrics: ["Líder Mercado", "+500% Leads", "4 meses"]
              }
            ].map((study, idx) => {
              const elementId = `study-${idx}`;
              return (
                <div 
                  key={idx} 
                  id={elementId}
                  className={`stagger-item group rounded-lg border border-border bg-background/50 overflow-hidden hover-lift transition-all duration-300 scroll-reveal interactive-card ${visibleElements.has(elementId) ? 'visible' : ''}`}
                >
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-secondary/20 border-b border-border p-6 flex flex-col justify-end animate-wave-reveal">
                    <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                    <p className="text-sm text-muted-foreground">{study.client}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-accent uppercase mb-1">Desafio</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-accent uppercase mb-1">Solução</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-accent uppercase mb-1">Resultado</p>
                      <p className="text-sm text-muted-foreground font-semibold">{study.result}</p>
                    </div>

                    <div className="pt-4 border-t border-border flex gap-2 flex-wrap">
                      {study.metrics.map((metric, i) => (
                        <span key={i} className="text-xs font-bold bg-accent/10 text-accent px-3 py-1 rounded animate-shimmer">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção de FAQ */}
      <section id="faq" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <SectionThreeJS sectionId="faq" particleColor="#D4AF37" particleCount={150} />
        <div className="container relative z-10 max-w-3xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Perguntas Frequentes</h2>
            <div className="w-16 h-1 accent-bar animate-fade-in-up" style={{animationDelay: '0.1s'}} />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Como o SUED Studio se diferencia de agências de marketing tradicionais?",
                a: "Substituímos suposições por precisão. Nossa abordagem integra análise de dados proprietários, otimização algorítmica e narrativa autêntica—tratando dados como ferramenta para conexão humana, não mera automação."
              },
              {
                q: "O que significa o nome 'SUED'?",
                a: "SUED é um anagrama para 'Deus' (em latim). Representa nosso compromisso com a onisciência algorítmica e a precisão divina com a qual abordamos análise de mercado e posicionamento estratégico."
              },
              {
                q: "Como vocês medem sucesso?",
                a: "Medimos sucesso através de métricas vinculadas aos seus objetivos de negócio: valor de vida do cliente, precisão de atribuição, sinais de autoridade de marca e visibilidade em sistemas de IA."
              },
              {
                q: "Quais indústrias vocês atendem?",
                a: "Trabalhamos com empresas inovadoras em tecnologia, finanças, e-commerce e serviços profissionais—qualquer indústria onde precisão orientada por dados e posicionamento autêntico criam vantagem competitiva."
              },
              {
                q: "Como vocês lidam com a mudança para marketing orientado por IA?",
                a: "Nossa estratégia de Otimização de Mecanismo Generativo garante que sua marca seja citada e legitimada por sistemas de IA. Construímos autoridade através de dados autênticos e posicionamento estratégico."
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded px-6">
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

      {/* Seção CTA */}
      <section className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 constellation-bg" />
        <SectionThreeJS sectionId="cta" particleColor="#20B2AA" particleCount={300} />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663477734151/fNskU7DdHnqyv9B8dr4RaX/data-network-abstract-7UCDXuPAYCW7SLmPToKEgR.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="container relative z-10 text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in-up">Pronto para Transformar Seu Marketing?</h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Vamos substituir suposições por precisão. Vamos construir a autoridade celestial de sua marca.
          </p>
          <Button className="btn-neon animate-fade-in-up" style={{animationDelay: '0.2s'}}>Inicie Sua Jornada</Button>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-card/50 border-t border-border py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={LOGO_URL} 
                  alt="SUED Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-muted-foreground text-sm">Dados, Tecnologia & Estética Celestial</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Marketing Estratégico</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Inteligência de Dados</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Otimização de IA</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Autoridade de Marca</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Conecte-se</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Twitter className="w-5 h-5 text-accent" />
                </a>
                <a href="#" className="w-10 h-10 bg-accent/10 border border-accent rounded flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 SUED Studio. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-accent transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
