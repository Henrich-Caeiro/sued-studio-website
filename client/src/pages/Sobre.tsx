import { useState, useEffect } from "react";
import { useLocation } from "wouter";
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

export default function Sobre() {
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

      {/* SEÇÃO 1: ORIGEM */}
      <section className="pt-32 pb-24 border-b border-border">
        <div className="container max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">A SUED nasceu de uma crença simples: todo negócio com propósito merece uma presença digital à altura.</h1>
          
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Vimos de perto como empresas sérias, com produtos bons e clientes satisfeitos, perdiam oportunidades todos os dias por não terem uma presença digital que fizesse jus ao que entregavam.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Decidimos mudar isso. Não como mais uma agência de sites — como parceiros estratégicos que se importam com o resultado do cliente tanto quanto o próprio cliente.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: SIGNIFICADO DO NOME */}
      <section className="py-24 bg-card/30 border-b border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">O significado do nome</h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            SUED é um anagrama de DEUS — e isso não é coincidência. É uma escolha deliberada que ancora o propósito da empresa: trabalhar com excelência, honestidade e cuidado genuíno. Não como discurso, mas como postura em cada projeto.
          </p>

          <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
            Qualquer cliente — independente de crença — consegue se identificar com "excelência e honestidade".
          </p>
        </div>
      </section>

      {/* SEÇÃO 3: TIME */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">As pessoas — time</h2>

          <div className="space-y-12">
            {/* Membro 1 */}
            <div className="backdrop-blur-sm bg-card/30 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Design estratégico e UX</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Estuda e aplica design como ferramenta de negócio. Cada decisão visual que tomo tem uma razão estratégica por trás.
              </p>
            </div>

            {/* Membro 2 */}
            <div className="backdrop-blur-sm bg-card/30 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Desenvolvimento</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Já construiu soluções digitais para empresas de diferentes segmentos. O que ele entrega funciona — e dura.
              </p>
            </div>

            {/* Membro 3 */}
            <div className="backdrop-blur-sm bg-card/30 border border-border/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Parceira estratégica em mídia paga</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Especialista em gestão de campanhas e otimização de conversão. Reforça que o ecossistema é completo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: VALORES */}
      <section className="py-24 bg-card/30 border-b border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">O que você pode esperar de nós</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Honestidade antes de venda.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Se não conseguimos entregar o que você precisa, falamos antes de fechar contrato.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Resultado antes de aprovação.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Não fazemos o que você quer ouvir. Fazemos o que vai funcionar.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Parceria além do projeto.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acompanhamos o resultado depois da entrega. Seu crescimento é o nosso portfólio.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-lg text-muted-foreground mb-6">
              Se isso ressoa com o que você busca, vamos conversar.
            </p>
            <Button href="/contato">Agendar conversa gratuita</Button>
          </div>
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
