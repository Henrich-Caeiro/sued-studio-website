import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
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
            <a href="#sobre" className="text-sm hover:text-accent transition-colors">Sobre</a>
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

      {/* Seção Sobre */}
      <section id="sobre" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ServicesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="sobre-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Sobre o SUED Studio" className="text-5xl font-bold" />
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">A Semiótica de SUED</h3>
              <CharacterReveal 
                text="SUED é um anagrama para Deus, refletindo a aspiração à verdade única proporcionada pelos dados proprietários. O conceito de Deus Ex Machina é recontextualizado: a máquina é o veículo que traz a solução para problemas complexos dos empreendedores." 
                className="text-lg text-muted-foreground" 
              />
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Precisão Algorítmica</h3>
              <p className="text-lg text-muted-foreground">
                O SUED Studio propõe uma visão celestial do mercado, capaz de enxergar padrões invisíveis ao olho humano através de modelos de atribuição sofisticados e análise de valor de vida do cliente. A marca não se apresenta como religiosa, mas como sagrada em sua precisão e ética.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Autoridade em Primeiro Lugar</h3>
              <p className="text-lg text-muted-foreground">
                Em 2026, a visibilidade simples não é mais suficiente. O SUED Studio deve adotar um marketing de autoridade em primeiro lugar, onde cada insight é validado por modelos de IA e storytelling humano. Posicionando-se como o parceiro que remove o risco através da supervisão ética de sistemas de IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Serviços */}
      <section id="servicos" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ValuesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="servicos-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Nossos Serviços" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Transformando dados em estratégia, complexidade em clareza" className="text-xl text-muted-foreground" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Marketing de Autoridade", desc: "Cada insight validado por IA e storytelling humano" },
              { icon: TrendingUp, title: "Dados Proprietários", desc: "Construindo crescimento que você possui: newsletters, comunidades, autoridade" },
              { icon: Users, title: "Supervisão Ética de IA", desc: "Removendo risco através de sistemas de IA supervisionados eticamente" },
              { icon: Sparkles, title: "Visão Celestial", desc: "Enxergando padrões invisíveis através de análise sofisticada de dados" }
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
      <section id="valores" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <PortfolioEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="valores-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Nossos Valores" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Geometria Sagrada, Tipografia de Autoridade e Interfaces Amigáveis" className="text-xl text-muted-foreground" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Precisão", desc: "Transformando o caos informacional em ordem estruturada através de dados" },
              { title: "Autenticidade", desc: "Honestidade, dúvida e imperfeição — traços que a IA pura não pode replicar" },
              { title: "Visão Celestial", desc: "Vendo o destino manifesto de cada marca no cosmos comercial" },
              { title: "Geometria Sagrada", desc: "Harmonia entre arte, ciência e tecnologia em cada ponto de contato" }
            ].map((value, idx) => (
              <div key={idx} className="scroll-reveal p-6 rounded-xl bg-card/40 border border-border text-center" id={`value-${idx}`}>
                <h3 className="font-bold mb-2 text-accent text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Portfólio */}
      <section id="portfolio" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <FAQEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="portfolio-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Modelo de Constelação" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Transformando dados em mapas estelares de sucesso" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border" id="portfolio-1">
              <h3 className="text-2xl font-bold mb-4 text-accent">Constelações de Marca</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O SUED Studio não apenas analisa dados; ele cria um mapa para o sucesso. A metáfora da constelação transforma pontos isolados (dados) em padrões significativos (estratégia).
              </p>
              <p className="text-lg text-muted-foreground">
                Cada estrela representa um pilar: produto, preço, cliente, concorrentes e valores da empresa. Ao apresentar relatórios de mercado como mapas estelares, tornamos a análise de dados uma experiência inspiradora e menos intimidadora.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border" id="portfolio-2">
              <h3 className="text-2xl font-bold mb-4 text-accent">Visualização Espacial</h3>
              <p className="text-lg text-muted-foreground">
                A visualização de dados baseada em metáforas espaciais ajuda os usuários a navegar em sistemas complexos usando sua memória espacial e intuição natural. Este modelo trata os usuários como agentes dinâmicos de mudança, onde a configuração das estrelas evolui conforme os dados fluem em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <CTAEffect />
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
                q: "O que significa SUED?",
                a: "SUED é um anagrama para Deus, refletindo nossa aspiração à verdade única proporcionada pelos dados proprietários. Representa a onisciência analítica e a capacidade de transformar caos informacional em ordem estruturada."
              },
              {
                q: "Como o SUED Studio se diferencia em 2026?",
                a: "Em um mercado saturado por conteúdo gerado por IA, buscamos autenticidade e conexões humanas. Combinamos rigor matemático com uma alma inspirada pelo divino, oferecendo supervisão ética de sistemas de IA."
              },
              {
                q: "Qual é o modelo de Constelação de Marca?",
                a: "Transformamos dados isolados em padrões significativos. Cada estrela representa um pilar: produto, preço, cliente, concorrentes e valores. Apresentamos relatórios de mercado como mapas estelares, tornando a análise inspiradora e acessível."
              },
              {
                q: "Como vocês garantem crescimento proprietário?",
                a: "Em vez de depender de algoritmos de terceiros, ajudamos clientes a construir espaços que eles possuem: newsletters, comunidades privadas e autoridade de alta qualidade. Isso reduz dependência de plataformas externas."
              },
              {
                q: "Qual é a importância da Geometria Sagrada no design?",
                a: "A Geometria Sagrada representa ordem divina manifestada na matemática. No SUED Studio, ela simboliza a estrutura complexa do mercado e a capacidade de enxergar padrões invisíveis através de análise sofisticada de dados."
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ServicesEffect />
        </div>
        
        <div className="relative z-10 container text-center">
          <div className="scroll-reveal" id="cta-content">
            <h2 className="text-5xl font-bold mb-6">
              <GradientText>Transforme Complexidade em Clareza</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              No horizonte de 2026, onde a IA é a nova eletricidade, o SUED Studio atua como o condutor que ilumina o caminho dos empreendedores, transformando a complexidade em clareza absoluta e o potencial em presença eterna no mercado.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="text-lg px-8 py-4">Começar Jornada Celestial</Button>
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
              <p className="text-sm text-muted-foreground">A convergência entre dados, tecnologia e estética celestial. Transformando marketing digital através de precisão algorítmica e visão sagrada.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#sobre" className="text-muted-foreground hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#servicos" className="text-muted-foreground hover:text-accent transition-colors">Serviços</a></li>
                <li><a href="#valores" className="text-muted-foreground hover:text-accent transition-colors">Valores</a></li>
                <li><a href="#portfolio" className="text-muted-foreground hover:text-accent transition-colors">Portfólio</a></li>
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
            <p>&copy; 2026 SUED Studio. Todos os direitos reservados. Transformando a complexidade em clareza absoluta.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
