import { ChevronDown, Mail, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import HeroThreeJS from "@/components/HeroThreeJS";
import HeroOverlay from "@/components/HeroOverlay";
import QuoteThreeJS from "@/components/QuoteThreeJS";
import ColorInteractionThreeJS from "@/components/ColorInteractionThreeJS";

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

      {/* Seção 2: Contexto de 2026 - Quote Style */}
      <section id="mercado" className="relative w-full min-h-screen bg-background overflow-hidden flex items-center justify-center">
        <QuoteThreeJS />
        
        <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12">
            <p className="text-xl text-accent mb-4 font-semibold">O Contexto de 2026</p>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Dados, Autenticidade e IA Agêntica
            </h2>
          </div>

          <div className="space-y-12 mt-16">
            <div className="backdrop-blur-sm bg-card/20 border border-border/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6 text-accent">Transformação Digital</h3>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Em 2026, o marketing digital terá passado por uma transformação onde a IA não é mais uma ferramenta de chat, mas um agente autônomo que toma decisões de compra e recomendações em nome dos usuários.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As empresas vencedoras serão aquelas que constroem estratégias orientadas por desempenho, integrando SEO, mídia paga, CRM e branding em um único ecossistema alimentado por dados proprietários.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-card/20 border border-border/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6 text-accent">Otimização de Mecanismos Generativos (GEO)</h3>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                O SUED Studio deve adotar o que se chama de Otimização de Mecanismos Generativos (GEO), onde a visibilidade não depende apenas de palavras-chave, mas de ser citado e legitimado como uma fonte confiável pelos sistemas de IA.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Isso exige uma infraestrutura de dados robusta e uma narrativa de marca que seja indiscutivelmente humana em sua essência, mesmo que tecnológica em sua entrega.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-card/20 border border-border/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6 text-accent">Autenticidade como Diferencial</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Em um mercado saturado por conteúdos gerados por inteligência artificial, a busca por autenticidade e conexões humanas torna-se o principal diferencial competitivo para novas agências.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Psicologia das Cores */}
      <section id="cores" className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ColorInteractionThreeJS />
        </div>
        <div className="relative z-10 container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Psicologia das Cores</h2>
            <p className="text-xl text-muted-foreground">Entre o Terrestre e o Celestial</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Paleta Celestial 2026</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A paleta de cores do SUED Studio deve equilibrar a modernidade tecnológica com o conforto visual e a celestialidade. Para 2026, a estética é definida por uma necessidade de calma e clareza.
              </p>
              <div className="space-y-2">
                <p className="text-lg"><span className="font-bold text-accent">Transformative Teal:</span> Fusão fluida entre azul e verde que reflete redirecionamento e resiliência</p>
                <p className="text-lg"><span className="font-bold text-accent">Cloud Dancer:</span> Branco luminoso que oferece equilíbrio em ambiente saturado</p>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">O Poder do Azul</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O azul é uma potência no mundo do branding, universalmente associado à confiança, dependabilidade e profissionalismo. Em tons mais profundos, como o Dark Blue, ele evoca expertise e estabilidade, enquanto tons mais claros transmitem tranquilidade e serenidade.
              </p>
              <p className="text-lg text-muted-foreground">
                Para o SUED Studio, o azul atua como a âncora da autoridade, ligando a marca ao céu e ao oceano, sugerindo um potencial ilimitado e uma base sólida de dados. Estudos mostram que o azul pode diminuir a frequência cardíaca, criando um ambiente onde o empreendedor se sente seguro para tomar decisões de alto risco.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Aurora Cyan e Celestial Gold</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Aurora Cyan representa a transição entre noite e dia, simbolizando o despertar da consciência de dados. Celestial Gold, por sua vez, evoca a riqueza do conhecimento e a iluminação estratégica.
              </p>
              <p className="text-lg text-muted-foreground">
                Juntas, essas cores criam uma narrativa visual onde a tecnologia e a humanidade coexistem em perfeita harmonia, refletindo a essência do SUED Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Tipografia e Interface */}
      <section id="interface" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Tipografia e Interface</h2>
            <p className="text-xl text-muted-foreground">Bento Grids e Geometria Sagrada</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Space Grotesk: A Tipografia do Futuro</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Space Grotesk é uma fonte sans-serif moderna que combina geometria com humanidade. Seus caracteres possuem proporções generosas e espaçamento que facilitam a leitura em qualquer tamanho, desde headlines até corpo de texto.
              </p>
              <p className="text-lg text-muted-foreground">
                A escolha de Space Grotesk reforça a identidade do SUED Studio como uma agência que vive na intersecção entre tecnologia e humanidade, oferecendo uma experiência visual que é simultaneamente futurista e acessível.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Bento Grid: Organização Inteligente</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O Bento Grid é um sistema de layout que organiza elementos em células de diferentes tamanhos, criando uma composição visual dinâmica e equilibrada. Ele reflete a complexidade dos dados sem sacrificar a clareza.
              </p>
              <p className="text-lg text-muted-foreground">
                Para o SUED Studio, o Bento Grid serve como metáfora visual da Constelação de Dados, onde cada elemento tem seu lugar e propósito, mas todos contribuem para uma visão maior e mais coerente.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Geometria Sagrada na Interface</h3>
              <p className="text-lg text-muted-foreground">
                A geometria sagrada é incorporada através de proporções harmônicas, uso de círculos, quadrados e triângulos em elementos visuais, e um sistema de espaçamento baseado na sequência de Fibonacci. Isso cria uma sensação de ordem natural e equilíbrio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Modelo de Constelação */}
      <section id="constelacao" className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Modelo de Constelação de Dados</h2>
            <p className="text-xl text-muted-foreground">Conectando Pontos de Luz</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">A Visão Holística</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O Modelo de Constelação de Dados é a filosofia central do SUED Studio. Ele reconhece que os dados não existem em silos, mas em constelações interconectadas onde cada ponto de luz (dado) influencia e é influenciado pelos outros.
              </p>
              <p className="text-lg text-muted-foreground">
                Essa abordagem holística permite que o SUED Studio identifique padrões emergentes, antecipe tendências e crie estratégias que são simultaneamente precisas e adaptáveis.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Implementação Prática</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Na prática, o Modelo de Constelação se manifesta através de:
              </p>
              <ul className="text-lg text-muted-foreground space-y-2">
                <li>• <span className="font-bold text-accent">Integração de Dados:</span> Consolidação de dados de múltiplas fontes em um único ecossistema</li>
                <li>• <span className="font-bold text-accent">Análise Relacional:</span> Identificação de conexões entre diferentes pontos de dados</li>
                <li>• <span className="font-bold text-accent">Storytelling de Dados:</span> Transformação de insights complexos em narrativas claras e acionáveis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 6: Estratégias de Lançamento */}
      <section id="estrategias" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Estratégias de Lançamento</h2>
            <p className="text-xl text-muted-foreground">Do Conceito à Constelação</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Fase 1: Fundação</h3>
              <p className="text-lg text-muted-foreground">
                Estabelecer a identidade visual, a narrativa de marca e os pilares de autoridade. Criar conteúdo de alta qualidade que posicione o SUED Studio como thought leader no espaço de marketing orientado por dados.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Fase 2: Expansão</h3>
              <p className="text-lg text-muted-foreground">
                Ampliar a presença em múltiplos canais, construir parcerias estratégicas e desenvolver ofertas de serviços que demonstrem o valor do Modelo de Constelação de Dados.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Fase 3: Consolidação</h3>
              <p className="text-lg text-muted-foreground">
                Estabelecer o SUED Studio como a agência de referência para marketing orientado por dados, com um portfólio robusto de case studies e uma comunidade engajada de clientes satisfeitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 7: FAQ */}
      <section id="faq" className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground">Esclarecendo Dúvidas</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "O que significa SUED?",
                a: "SUED é um anagrama para DEUS. Representa a ideia de que a inteligência artificial e os dados podem ser uma força divina quando usados com sabedoria e ética."
              },
              {
                q: "Como o Modelo de Constelação de Dados funciona?",
                a: "O modelo reconhece que os dados não existem isolados, mas em constelações interconectadas. Cada ponto de luz influencia os outros, permitindo identificar padrões emergentes e antecipar tendências."
              },
              {
                q: "Qual é a diferença entre o SUED Studio e outras agências?",
                a: "O SUED Studio combina precisão algorítmica com autenticidade humana, oferecendo estratégias orientadas por dados que são simultaneamente eficazes e éticas."
              },
              {
                q: "Como começar a trabalhar com o SUED Studio?",
                a: "Entre em contato conosco através do formulário de contato no site. Faremos uma análise inicial de suas necessidades e apresentaremos uma proposta customizada."
              },
              {
                q: "Quais são os principais serviços oferecidos?",
                a: "Oferecemos análise de dados, estratégia de marketing orientada por dados, otimização de mecanismos generativos (GEO), branding celestial e consultoria de IA ética."
              },
              {
                q: "Como o SUED Studio garante resultados?",
                a: "Através de um processo rigoroso de análise, implementação e otimização contínua, sempre com foco em métricas mensuráveis e ROI comprovado."
              }
            ].map((item, i) => (
              <details key={i} className="group border border-border rounded-lg p-6 cursor-pointer hover:bg-card/30 transition-colors">
                <summary className="flex justify-between items-center font-semibold text-lg text-foreground">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 8: CTA Final */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Pronto para Transformar seu Marketing?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se ao SUED Studio e descubra como a precisão algorítmica e a autenticidade humana podem redefinir sua estratégia de marketing.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Comece Agora</Button>
              <Button variant="outline">Saiba Mais</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">SUED Studio</h4>
              <p className="text-muted-foreground">Redefinindo marketing através de precisão algorítmica e autenticidade humana.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#sobre" className="hover:text-accent">Sobre</a></li>
                <li><a href="#mercado" className="hover:text-accent">Mercado</a></li>
                <li><a href="#cores" className="hover:text-accent">Design</a></li>
                <li><a href="#faq" className="hover:text-accent">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: contato@sued.studio</li>
                <li>Telefone: +55 (11) 9999-9999</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="text-accent hover:text-accent/80"><Linkedin size={20} /></a>
                <a href="#" className="text-accent hover:text-accent/80"><Twitter size={20} /></a>
                <a href="#" className="text-accent hover:text-accent/80"><Mail size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 SUED Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
