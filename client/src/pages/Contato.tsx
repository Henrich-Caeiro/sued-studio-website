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

export default function Contato() {
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

      {/* HERO */}
      <section className="pt-32 pb-16">
        <div className="container max-w-3xl text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">Vamos entender o seu negócio.</h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Agende uma conversa de 30 minutos. Sem compromisso. Vamos ouvir, entender — e te dizer com honestidade se e como podemos ajudar.
          </p>
        </div>
      </section>

      {/* CALENDLY EMBED */}
      <section className="py-24 border-t border-border">
        <div className="container max-w-2xl">
          <div className="backdrop-blur-sm bg-card/30 border border-border/30 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-4">Escolha um horário que funciona para você:</p>
            </div>
            
            {/* Calendly Embed Placeholder */}
            <div className="bg-background/50 border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground mb-4">
                Calendly será carregado aqui. Configure seu evento como "Conversa SUED Studio — 30 min"
              </p>
              <p className="text-sm text-muted-foreground">
                Para integrar Calendly: adicione o embed code no componente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">O que acontece depois</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-background font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Você agenda</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Escolhe o horário que funciona melhor para você no calendário.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-background font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Recebe confirmação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Um email com o link da reunião e um pequeno questionário para entendermos melhor seu negócio.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-background font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Na reunião</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ouvimos seu negócio, seus desafios e seus objetivos. Mapeamos o caminho e te damos uma resposta honesta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATIVA WHATSAPP */}
      <section className="py-24 border-t border-border">
        <div className="container max-w-3xl text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Prefere pelo WhatsApp?
          </p>
          <Button href="https://wa.me/5511999999999" variant="outline">
            Enviar mensagem →
          </Button>
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
