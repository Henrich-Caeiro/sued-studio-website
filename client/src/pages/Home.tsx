import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown, Mail, Linkedin, Twitter, TrendingUp, Users, Zap, Sparkles, Palette, Type, Grid3x3 } from "lucide-react";
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
            <a href="#mercado" className="text-sm hover:text-accent transition-colors">Mercado</a>
            <a href="#cores" className="text-sm hover:text-accent transition-colors">Design</a>
            <a href="#interface" className="text-sm hover:text-accent transition-colors">Interface</a>
            <a href="#faq" className="text-sm hover:text-accent transition-colors">FAQ</a>
            <Button>Contato</Button>
          </div>
        </div>
      </nav>

      {/* Seção Hero com Three.js e HeroOverlay Clean */}
      <section className="hero-container relative w-full h-screen overflow-hidden">
        <HeroThreeJS />
        <HeroOverlay />
      </section>

      {/* Seção 1: Sobre - Semiótica de SUED */}
      <section id="sobre" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ServicesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="sobre-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="A Semiótica de SUED" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal 
              text="O Anagrama como Manifesto de Autoridade e Onisciência" 
              className="text-xl text-muted-foreground" 
            />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Visão Celestial do Mercado</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A escolha do nome SUED como um anagrama para Deus carrega implicações semióticas que transcendem a mera estética linguística. No contexto de uma agência de marketing de 2026, essa escolha reflete a aspiração à verdade única proporcionada pelos dados proprietários em um mundo onde os cookies de terceiros desapareceram.
              </p>
              <p className="text-lg text-muted-foreground">
                O SUED Studio propõe uma visão celestial do mercado, capaz de enxergar padrões invisíveis ao olho humano através de modelos de atribuição sofisticados e análise de valor de vida do cliente.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Deus Ex Machina Recontextualizado</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O conceito de Deus Ex Machina — o Deus vindo da máquina — é recontextualizado: a máquina é o veículo que traz a solução para problemas complexos e aparentemente sem saída dos empreendedores.
              </p>
              <p className="text-lg text-muted-foreground">
                A autoridade da marca SUED advém da capacidade de transformar o caos informacional em ordem estruturada, uma função tradicionalmente atribuída ao divino na cosmologia.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Sagrada em Precisão e Ética</h3>
              <p className="text-lg text-muted-foreground">
                A marca não se apresenta como religiosa, mas como sagrada em sua precisão e ética, alinhando-se à tendência de marcas que buscam um propósito profundo e uma narrativa que vá além da superfície. Em 2026, a confiança do consumidor virá da autenticidade da marca e da conexão humana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Contexto do Mercado */}
      <section id="mercado" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ValuesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="mercado-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="O Contexto de 2026" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Dados, Autenticidade e IA Agêntica" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Transformação Digital</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Em 2026, o marketing digital terá passado por uma transformação onde a IA não é mais uma ferramenta de chat, mas um agente autônomo que toma decisões de compra e recomendações em nome dos usuários.
              </p>
              <p className="text-lg text-muted-foreground">
                As empresas vencedoras serão aquelas que constroem estratégias orientadas por desempenho, integrando SEO, mídia paga, CRM e branding em um único ecossistema alimentado por dados proprietários.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Otimização de Mecanismos Generativos (GEO)</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O SUED Studio deve adotar o que se chama de Otimização de Mecanismos Generativos (GEO), onde a visibilidade não depende apenas de palavras-chave, mas de ser citado e legitimado como uma fonte confiável pelos sistemas de IA.
              </p>
              <p className="text-lg text-muted-foreground">
                Isso exige uma infraestrutura de dados robusta e uma narrativa de marca que seja indiscutivelmente humana em sua essência, mesmo que tecnológica em sua entrega.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Autenticidade como Diferencial</h3>
              <p className="text-lg text-muted-foreground">
                Em um mercado saturado por conteúdos gerados por inteligência artificial, a busca por autenticidade e conexões humanas torna-se o principal diferencial competitivo para novas agências.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Psicologia das Cores */}
      <section id="cores" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <PortfolioEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="cores-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Psicologia das Cores" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Entre o Terrestre e o Celestial" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Paleta Celestial 2026</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A paleta de cores do SUED Studio deve equilibrar a modernidade tecnológica com o conforto visual e a celestialidade. Para 2026, a estética é definida por uma necessidade de calma e clareza.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent">
                  <p className="font-bold text-accent">Transformative Teal</p>
                  <p className="text-sm text-muted-foreground">Fusão fluida entre azul e verde que reflete redirecionamento e resiliência</p>
                </div>
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <p className="font-bold text-white">Cloud Dancer</p>
                  <p className="text-sm text-muted-foreground">Branco luminoso que oferece equilíbrio em ambiente saturado</p>
                </div>
              </div>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">O Poder do Azul</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O azul é uma potência no mundo do branding, universalmente associado à confiança, dependabilidade e profissionalismo. Em tons mais profundos, como o Dark Blue, ele evoca expertise e estabilidade, enquanto tons mais claros transmitem tranquilidade e serenidade.
              </p>
              <p className="text-lg text-muted-foreground">
                Para o SUED Studio, o azul atua como a âncora da autoridade, ligando a marca ao céu e ao oceano, sugerindo um potencial ilimitado e uma base sólida de dados. Estudos mostram que o azul pode diminuir a frequência cardíaca, criando um ambiente onde o empreendedor se sente seguro para tomar decisões de alto risco.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Luminosidade Celestial</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Para alcançar a celestialidade, a paleta incorpora o Aurora Cyan e o Celestial Gold. O ciano vibrante simboliza a inteligência digital e a alta velocidade do processamento de dados, enquanto o ouro metálico adiciona um elemento de luxo silencioso e iluminação.
              </p>
              <p className="text-lg text-muted-foreground">
                O ouro atua como o brilho das estrelas no vasto cosmos da informação, guiando o olhar do usuário para os insights mais valiosos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Tipografia e Design */}
      <section id="interface" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <FAQEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="interface-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Tipografia e Interface" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Autoridade Editorial e Fluidez Digital" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2">
                <Type size={24} /> Serifas de Alto Contraste
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                As serifas como Playfair Display ou Instrument Serif evocam a sensação de jornalismo clássico e autoridade editorial. Elas são ideais para os títulos, conferindo ao nome SUED uma aura de intemporalidade e seriedade.
              </p>
              <p className="text-lg text-muted-foreground">
                O uso de serifas ajuda a marca a se distanciar da estética fria das empresas de tecnologia puramente focadas em software, trazendo um toque humano e artesanal que é tendência em 2026.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2">
                <Type size={24} /> Sans-Serifs Geométricas
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                Para o corpo de texto e dashboards de dados, fontes como Inter ou Montserrat garantem uma leitura sem esforço e uma estética moderna e limpa. A Inter, especificamente, é desenhada para clareza em interfaces digitais, reduzindo a carga cognitiva ao apresentar métricas complexas.
              </p>
              <p className="text-lg text-muted-foreground">
                Esta escolha tipográfica reforça a promessa de um layout amigável e confortável para o usuário.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2">
                <Grid3x3 size={24} /> Bento Grids e Glassmorphism
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                O layout amigável e confortável encontra sua melhor forma nas Bento Grids e no Glassmorphism. As Bento Grids organizam o conteúdo em blocos modulares que imitam a organização das caixas de bento japonesas, permitindo que o usuário processe informações de forma não linear e eficiente.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Cada card em uma Bento Grid deve seguir um padrão previsível: um ícone ou elemento visual no topo, o dado central em destaque e detalhes de suporte na base. O uso de cantos arredondados (12-24px) suaviza a interface e aumenta a percepção de profissionalismo.
              </p>
              <p className="text-lg text-muted-foreground">
                O uso de Liquid Glass — efeitos de transparência, desfoque e refração de luz — cria uma sensação de profundidade e materialidade plausível, como interfaces que parecem flutuar em um espaço tridimensional, lembrando a vastidão do céu.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2">
                <Palette size={24} /> Geometria Sagrada
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                O logotipo do SUED Studio deve ser um selo de precisão. Dado que o nome é um anagrama para Deus, a marca visual pode explorar a Geometria Sagrada, que historicamente representa a ordem divina manifestada na matemática.
              </p>
              <p className="text-lg text-muted-foreground">
                A Geometria Sagrada simboliza a estrutura complexa do mercado e a capacidade de enxergar padrões invisíveis através de análise sofisticada de dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Modelo de Constelação */}
      <section id="constelacao" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <CTAEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="constelacao-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Modelo de Constelação" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Dados como Metáfora Celestial" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Transformando Pontos em Padrões</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O SUED Studio não apenas analisa dados; ele cria um mapa para o sucesso. A metáfora da constelação é poderosa porque transforma pontos isolados (dados) em padrões significativos (estratégia).
              </p>
              <p className="text-lg text-muted-foreground">
                Em 2026, as marcas de sucesso serão aquelas que se veem como parte de um ecossistema maior, onde cada estrela representa um pilar: produto, preço, cliente, concorrentes e valores da empresa.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Visualização Espacial</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A visualização de dados baseada em metáforas espaciais ajuda os usuários a navegar em sistemas complexos usando sua memória espacial e intuição natural.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Ao apresentar relatórios de mercado como mapas estelares, o SUED Studio torna a análise de dados uma experiência inspiradora e menos intimidadora para o empreendedor.
              </p>
              <p className="text-lg text-muted-foreground">
                Este modelo trata os usuários como agentes dinâmicos de mudança, onde a configuração das estrelas evolui conforme os dados fluem em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 6: Estratégias de Lançamento */}
      <section id="lancamento" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ServicesEffect />
        </div>
        
        <div className="relative z-10 container">
          <div className="text-center mb-16 scroll-reveal" id="lancamento-title">
            <h2 className="text-5xl font-bold mb-4">
              <SplitText text="Estratégias de Lançamento" className="text-5xl font-bold" />
            </h2>
            <CharacterReveal text="Autoridade em Primeiro Lugar" className="text-xl text-muted-foreground" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Marketing de Autoridade</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Em 2026, a visibilidade simples não é mais suficiente; as marcas devem competir por atenção, confiança e conexão emocional. O SUED Studio deve adotar um marketing de autoridade em primeiro lugar, onde cada insight gerado para um cliente é validado por modelos de IA e storytelling humano.
              </p>
              <p className="text-lg text-muted-foreground">
                A agência deve se posicionar como o parceiro que remove o risco através da supervisão ética de sistemas de IA.
              </p>
            </div>

            <div className="scroll-reveal p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Crescimento Proprietário</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O foco no crescimento proprietário é crucial. Em vez de depender de algoritmos de terceiros, o SUED Studio deve ajudar seus clientes a construir espaços que eles possuem: newsletters, comunidades privadas e newsletters de alta autoridade.
              </p>
              <p className="text-lg text-muted-foreground">
                Isso reduz a dependência de plataformas externas e cria uma base de clientes resiliente que valoriza a honestidade, a dúvida e a imperfeição — traços que a IA pura não pode replicar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section id="faq" className="py-24 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ height: '100%' }}>
          <ValuesEffect />
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
              },
              {
                q: "Como a paleta de cores reflete a identidade?",
                a: "Transformative Teal representa redirecionamento e resiliência, Cloud Dancer oferece equilíbrio, Aurora Cyan simboliza inteligência digital, e Celestial Gold guia o olhar para insights valiosos. Cada cor tem propósito psicológico."
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
          <PortfolioEffect />
        </div>
        
        <div className="relative z-10 container text-center">
          <div className="scroll-reveal" id="cta-content">
            <h2 className="text-5xl font-bold mb-6">
              <GradientText>Transforme Complexidade em Clareza Absoluta</GradientText>
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
              <p className="text-sm text-muted-foreground">A convergência entre dados, tecnologia e estética celestial. Transformando marketing digital através de precisão algorítmica e visão sagrada. Autoridade em primeiro lugar, crescimento proprietário, supervisão ética de IA.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#sobre" className="text-muted-foreground hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#mercado" className="text-muted-foreground hover:text-accent transition-colors">Mercado</a></li>
                <li><a href="#cores" className="text-muted-foreground hover:text-accent transition-colors">Design</a></li>
                <li><a href="#interface" className="text-muted-foreground hover:text-accent transition-colors">Interface</a></li>
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
            <p>&copy; 2026 SUED Studio. Todos os direitos reservados. Transformando a complexidade em clareza absoluta. Fusão de rigor matemático com alma inspirada pelo divino.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
