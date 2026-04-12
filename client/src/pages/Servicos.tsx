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

export default function Servicos() {
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

      {/* HERO DA PÁGINA */}
      <section className="pt-32 pb-24">
        <div className="container max-w-3xl text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">Soluções que trabalham juntas — não serviços isolados.</h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Cada solução da SUED foi pensada para funcionar como parte de um ecossistema. Site, identidade, mídia — tudo converge para o mesmo objetivo: trazer os clientes certos para o seu negócio.
          </p>
        </div>
      </section>

      {/* SERVIÇO 1: PRESENÇA DIGITAL */}
      <section className="py-24 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Sua empresa no digital — do jeito certo, desde o começo.</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Para quem é</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Para empresas que ainda não têm presença digital consistente, ou têm — mas que não converte. Você tem um negócio sólido. O problema é que o digital não reflete isso.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">O que inclui</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Identidade visual · Site institucional ou landing page · Estratégia de conteúdo inicial · Configuração de Google Meu Negócio
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Resultado esperado</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Uma presença digital que representa o nível real do seu negócio e começa a atrair os clientes certos.
              </p>
            </div>

            <div className="pt-8">
              <Button href="/contato">Agendar conversa gratuita</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇO 2: CONVERSÃO E MÍDIA */}
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Transforme investimento em mídia em clientes reais.</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Para quem é</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Para quem já investe em anúncios mas não vê resultado claro — ou quer começar a investir com estratégia, não no chute.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">O que inclui</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Landing page de alta conversão · Gestão de campanhas (Meta Ads / Google Ads) · Relatório mensal com métricas reais · Otimização contínua
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Resultado esperado</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Saber exatamente quanto cada real investido está gerando — e um sistema que melhora mês a mês.
              </p>
            </div>

            <div className="pt-8">
              <Button href="/contato">Agendar conversa gratuita</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇO 3: BRANDING ESTRATÉGICO */}
      <section className="py-24 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Uma marca que comunica antes de falar.</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Para quem é</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Para empresas que querem crescer e percebem que a identidade atual não acompanha mais o nível do negócio.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">O que inclui</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Diagnóstico de posicionamento · Identidade visual completa · Manual de marca · Aplicações principais
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">Resultado esperado</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Uma marca que atrai o cliente certo, justifica preço maior e diferencia do concorrente sem precisar de desconto.
              </p>
            </div>

            <div className="pt-8">
              <Button href="/contato">Agendar conversa gratuita</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇO 4: PARCERIA MENSAL */}
      <section className="py-24 bg-card/30 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Presença digital não é projeto. É processo.</h2>

          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              O digital muda todo mês. Algoritmo muda, concorrente aparece, oportunidade surge. Nossos planos de parceria mensal garantem que sua presença digital esteja sempre otimizada — não abandonada depois da entrega.
            </p>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent">O que inclui (plano crescimento)</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Manutenção e atualização do site · Gestão de mídia paga · Relatório mensal de resultados · Canal direto com o time SUED
              </p>
            </div>

            <div className="pt-8">
              <Button href="/contato">Agendar conversa gratuita</Button>
            </div>
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
