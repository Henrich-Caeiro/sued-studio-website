import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import HeroThreeJS from "@/components/HeroThreeJS";
import FloatingParticlesThreeJS from "@/components/FloatingParticlesThreeJS";
import WaveThreeJS from "@/components/WaveThreeJS";
import RotatingCubesThreeJS from "@/components/RotatingCubesThreeJS";
import ConnectedSphereThreeJS from "@/components/ConnectedSphereThreeJS";
import AnimatedCounter from "@/components/AnimatedCounter";
import Logo from "@/components/Logo";

const Button = ({ children, className = "", variant = "default", href = "#" }: any) => (
  <a href={href} className={`inline-block px-6 py-3 rounded-lg font-semibold transition-all ${
    variant === "outline" 
      ? "border border-accent text-accent hover:bg-accent/10" 
      : "bg-accent text-background hover:bg-accent/90"
  } ${className}`}>
    {children}
  </a>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navegação */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
              <Logo className="h-10" />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/sobre" className="text-sm hover:text-accent transition-colors">Sobre</a>
            <a href="/servicos" className="text-sm hover:text-accent transition-colors">Serviços</a>
            <a href="/contato" className="text-sm hover:text-accent transition-colors">Contato</a>
            <Button href="/contato">Agendar conversa</Button>
          </div>
        </div>
      </nav>

      {/* SEÇÃO 1: HERO */}
      <section className="hero-container relative w-full h-screen overflow-hidden flex items-center justify-center">
        <HeroThreeJS />
        
        <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Sua empresa merece uma presença digital que trabalha por você.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Somos uma agência estratégica de presença digital. Não entregamos sites bonitos — entregamos ferramentas que atraem, convencem e convertem os clientes certos para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contato">Agendar conversa gratuita</Button>
            <Button href="#cases" variant="outline">Ver nosso trabalho →</Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CREDIBILIDADE - BIG NUMBERS */}
      <section className="py-24 bg-gradient-to-b from-card/20 to-background border-y border-border/50 relative overflow-hidden h-96">
        {/* Three.js Background */}
        <div className="absolute inset-0">
          <FloatingParticlesThreeJS />
        </div>
        
        {/* Background accent elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-celestial-cyan/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <p className="text-center text-muted-foreground mb-16 text-lg font-medium tracking-wide">Empresas que cresceram com a SUED</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
            <AnimatedCounter end={1} label="Cliente ativo" />
            <AnimatedCounter end={60} label="Dias de parceria" suffix="+" />
            <AnimatedCounter end={40} label="Agendamentos/semana" suffix="+" />
          </div>
          
          {/* Divider line */}
          <div className="mt-16 pt-12 border-t border-border/30"></div>
        </div>
      </section>

      {/* SEÇÃO 3: PROBLEMA */}
      <section className="py-24 relative overflow-hidden h-96">
        {/* Three.js Background */}
        <div className="absolute inset-0">
          <WaveThreeJS />
        </div>
        
        <div className="container max-w-3xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Ter um site não é o mesmo que ter presença digital.</h2>
          
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            A maioria das empresas tem um site. Poucas têm um site que realmente traz clientes.
          </p>

          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Muitos sites são bonitos, mas não convertem. Outros convertem, mas não escalam. E alguns simplesmente ficam abandonados depois do lançamento — sem atualização, sem estratégia, sem resultado.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Essa é a realidade que vemos todo dia. Empresas com produtos bons, clientes satisfeitos, mas perdendo oportunidades porque a presença digital não reflete o nível real do negócio.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4: DIFERENCIAL */}
      <section className="py-24 bg-card/30 relative overflow-hidden h-96">
        {/* Three.js Background */}
        <div className="absolute inset-0">
          <RotatingCubesThreeJS />
        </div>
        
        <div className="container relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">A diferença está no ponto de partida.</h2>
          
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Enquanto outros começam pelo visual, nós começamos pela pergunta certa: qual problema de negócio vamos resolver?
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="backdrop-blur-sm bg-background/50 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent">Diagnóstico antes de proposta</h3>
              <p className="text-muted-foreground leading-relaxed">
                Entendemos seu negócio, seus clientes e seus objetivos antes de abrir qualquer ferramenta de design.
              </p>
            </div>

            {/* Card 2 */}
            <div className="backdrop-blur-sm bg-background/50 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent">Design com função, não só forma</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cada decisão visual tem razão estratégica. Beleza é consequência de clareza.
              </p>
            </div>

            {/* Card 3 */}
            <div className="backdrop-blur-sm bg-background/50 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent">Resultado mensurável</h3>
              <p className="text-muted-foreground leading-relaxed">
                Acompanhamos os números depois da entrega. Porque parceiro estratégico não some após o lançamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: CASE */}
      <section id="cases" className="py-24 relative overflow-hidden">
        {/* Three.js Background */}
        <div className="absolute inset-0 h-96">
          <ConnectedSphereThreeJS />
        </div>
        
        <div className="container max-w-3xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">Resultado real, não portfólio bonito.</h2>

          <div className="backdrop-blur-sm bg-card/30 border border-border/30 rounded-2xl p-8 md:p-12 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-accent">Barbearia em São Carlos</h3>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <div>
                <p className="font-semibold text-foreground mb-2">Desafio:</p>
                <p>Negócio consolidado localmente, mas sem presença digital que convertesse. Dependência total de indicação boca a boca.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">O que fizemos:</p>
                <p>Identidade visual, site focado em conversão e estratégia de agendamento online.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Resultado:</p>
                <p className="text-lg font-semibold text-accent">+40 agendamentos por semana via site em 60 dias.</p>
              </div>
            </div>

            <Button href="/contato">Quero resultados assim para o meu negócio</Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: CTA FINAL */}
      <section className="py-24 bg-card/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Pronto para ter uma presença digital que trabalha enquanto você dorme?</h2>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Agende uma conversa de 30 minutos. Sem compromisso, sem enrolação. Vamos entender seu negócio e te dizer honestamente se podemos ajudar.
          </p>

          <Button href="/contato" className="text-lg px-8 py-4">Agendar conversa gratuita</Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16 bg-background/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Logo className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">
                Redefinindo presença digital através de estratégia e resultado.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="/sobre" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="/servicos" className="hover:text-accent transition-colors">Serviços</a></li>
                <li><a href="/contato" className="hover:text-accent transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:contato@sued.studio" className="hover:text-accent transition-colors">contato@sued.studio</a></li>
                <li><a href="tel:+5511999999999" className="hover:text-accent transition-colors">+55 (11) 9999-9999</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 SUED Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
