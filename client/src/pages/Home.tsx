import { ChevronDown, Mail, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import HeroThreeJS from "@/components/HeroThreeJS";
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

      {/* Seção 1: Sobre - Semiótica de SUED */}
      <section id="sobre" className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">A Semiótica de SUED</h2>
            <p className="text-xl text-muted-foreground">O Anagrama como Manifesto de Autoridade e Onisciência</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Visão Celestial do Mercado</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A escolha do nome SUED como um anagrama para Deus carrega implicações semióticas que transcendem a mera estética linguística. No contexto de uma agência de marketing de 2026, essa escolha reflete a aspiração à verdade única proporcionada pelos dados proprietários em um mundo onde os cookies de terceiros desapareceram.
              </p>
              <p className="text-lg text-muted-foreground">
                O SUED Studio propõe uma visão celestial do mercado, capaz de enxergar padrões invisíveis ao olho humano através de modelos de atribuição sofisticados e análise de valor de vida do cliente.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Deus Ex Machina Recontextualizado</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O conceito de Deus Ex Machina — o Deus vindo da máquina — é recontextualizado: a máquina é o veículo que traz a solução para problemas complexos e aparentemente sem saída dos empreendedores.
              </p>
              <p className="text-lg text-muted-foreground">
                A autoridade da marca SUED advém da capacidade de transformar o caos informacional em ordem estruturada, uma função tradicionalmente atribuída ao divino na cosmologia.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Sagrada em Precisão e Ética</h3>
              <p className="text-lg text-muted-foreground">
                A marca não se apresenta como religiosa, mas como sagrada em sua precisão e ética, alinhando-se à tendência de marcas que buscam um propósito profundo e uma narrativa que vá além da superfície. Em 2026, a confiança do consumidor virá da autenticidade da marca e da conexão humana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Contexto de 2026 */}
      <section id="mercado" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">O Contexto de 2026</h2>
            <p className="text-xl text-muted-foreground">Dados, Autenticidade e IA Agêntica</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Transformação Digital</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Em 2026, o marketing digital terá passado por uma transformação onde a IA não é mais uma ferramenta de chat, mas um agente autônomo que toma decisões de compra e recomendações em nome dos usuários.
              </p>
              <p className="text-lg text-muted-foreground">
                As empresas vencedoras serão aquelas que constroem estratégias orientadas por desempenho, integrando SEO, mídia paga, CRM e branding em um único ecossistema alimentado por dados proprietários.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Otimização de Mecanismos Generativos (GEO)</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O SUED Studio deve adotar o que se chama de Otimização de Mecanismos Generativos (GEO), onde a visibilidade não depende apenas de palavras-chave, mas de ser citado e legitimado como uma fonte confiável pelos sistemas de IA.
              </p>
              <p className="text-lg text-muted-foreground">
                Isso exige uma infraestrutura de dados robusta e uma narrativa de marca que seja indiscutivelmente humana em sua essência, mesmo que tecnológica em sua entrega.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Autenticidade como Diferencial</h3>
              <p className="text-lg text-muted-foreground">
                Em um mercado saturado por conteúdos gerados por inteligência artificial, a busca por autenticidade e conexões humanas torna-se o principal diferencial competitivo para novas agências.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: Psicologia das Cores */}
      <section id="cores" className="py-24 bg-card/50">
        <div className="container">
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
              <h3 className="text-2xl font-bold mb-4 text-accent">Luminosidade Celestial</h3>
              <p className="text-lg text-muted-foreground">
                Para alcançar a celestialidade, a paleta incorpora o Aurora Cyan e o Celestial Gold. O ciano vibrante simboliza a inteligência digital e a alta velocidade do processamento de dados, enquanto o ouro metálico adiciona um elemento de luxo silencioso e iluminação. O ouro atua como o brilho das estrelas no vasto cosmos da informação, guiando o olhar do usuário para os insights mais valiosos.
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
            <p className="text-xl text-muted-foreground">Autoridade Editorial e Fluidez Digital</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Serifas de Alto Contraste</h3>
              <p className="text-lg text-muted-foreground mb-4">
                As serifas como Playfair Display ou Instrument Serif evocam a sensação de jornalismo clássico e autoridade editorial. Elas são ideais para os títulos, conferindo ao nome SUED uma aura de intemporalidade e seriedade.
              </p>
              <p className="text-lg text-muted-foreground">
                O uso de serifas ajuda a marca a se distanciar da estética fria das empresas de tecnologia puramente focadas em software, trazendo um toque humano e artesanal que é tendência em 2026.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Sans-Serifs Geométricas</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Para o corpo de texto e dashboards de dados, fontes como Inter ou Montserrat garantem uma leitura sem esforço e uma estética moderna e limpa. A Inter, especificamente, é desenhada para clareza em interfaces digitais, reduzindo a carga cognitiva ao apresentar métricas complexas.
              </p>
              <p className="text-lg text-muted-foreground">
                Esta escolha tipográfica reforça a promessa de um layout amigável e confortável para o usuário.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Bento Grids e Glassmorphism</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O layout amigável e confortável encontra sua melhor forma nas Bento Grids e no Glassmorphism. As Bento Grids organizam o conteúdo em blocos modulares que imitam a organização das caixas de bento japonesas, permitindo que o usuário processe informações de forma não linear e eficiente.
              </p>
              <p className="text-lg text-muted-foreground">
                O uso de Liquid Glass — efeitos de transparência, desfoque e refração de luz — cria uma sensação de profundidade e materialidade plausível, como interfaces que parecem flutuar em um espaço tridimensional, lembrando a vastidão do céu.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Geometria Sagrada</h3>
              <p className="text-lg text-muted-foreground">
                O logotipo do SUED Studio deve ser um selo de precisão. Dado que o nome é um anagrama para Deus, a marca visual pode explorar a Geometria Sagrada, que historicamente representa a ordem divina manifestada na matemática. A Geometria Sagrada simboliza a estrutura complexa do mercado e a capacidade de enxergar padrões invisíveis através de análise sofisticada de dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5: Modelo de Constelação */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Modelo de Constelação</h2>
            <p className="text-xl text-muted-foreground">Dados como Metáfora Celestial</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Transformando Pontos em Padrões</h3>
              <p className="text-lg text-muted-foreground mb-4">
                O SUED Studio não apenas analisa dados; ele cria um mapa para o sucesso. A metáfora da constelação é poderosa porque transforma pontos isolados (dados) em padrões significativos (estratégia).
              </p>
              <p className="text-lg text-muted-foreground">
                Em 2026, as marcas de sucesso serão aquelas que se veem como parte de um ecossistema maior, onde cada estrela representa um pilar: produto, preço, cliente, concorrentes e valores da empresa.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Visualização Espacial</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A visualização de dados baseada em metáforas espaciais ajuda os usuários a navegar em sistemas complexos usando sua memória espacial e intuição natural.
              </p>
              <p className="text-lg text-muted-foreground">
                Ao apresentar relatórios de mercado como mapas estelares, o SUED Studio torna a análise de dados uma experiência inspiradora e menos intimidadora para o empreendedor. Este modelo trata os usuários como agentes dinâmicos de mudança, onde a configuração das estrelas evolui conforme os dados fluem em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 6: Estratégias de Lançamento */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Estratégias de Lançamento</h2>
            <p className="text-xl text-muted-foreground">Autoridade em Primeiro Lugar</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Marketing de Autoridade</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Em 2026, a visibilidade simples não é mais suficiente; as marcas devem competir por atenção, confiança e conexão emocional. O SUED Studio deve adotar um marketing de autoridade em primeiro lugar, onde cada insight gerado para um cliente é validado por modelos de IA e storytelling humano.
              </p>
              <p className="text-lg text-muted-foreground">
                A agência deve se posicionar como o parceiro que remove o risco através da supervisão ética de sistemas de IA.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-card/40 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-accent">Conteúdo Proprietário e Pesquisa</h3>
              <p className="text-lg text-muted-foreground mb-4">
                A estratégia de lançamento deve incluir a publicação de pesquisas proprietárias sobre o estado do marketing em 2026, tendências de IA, e análises de mercado que posicionem o SUED Studio como pensador estratégico.
              </p>
              <p className="text-lg text-muted-foreground">
                Esses conteúdos devem ser distribuídos através de LinkedIn, publicações de tecnologia e marketing, e parcerias com influenciadores de autoridade no espaço de marketing orientado por dados.
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
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">O que é SUED Studio?</h3>
              <p className="text-muted-foreground">
                SUED Studio é uma agência de marketing orientada por dados que transforma o caos digital em estratégias estruturadas através de precisão algorítmica e autoridade em primeiro lugar.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">Como SUED diferencia-se de outras agências?</h3>
              <p className="text-muted-foreground">
                Através da Geometria Sagrada, Modelo de Constelação de Dados, e uma paleta celestial que reflete precisão e ética. Cada decisão é validada por IA e storytelling humano.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">Qual é o significado do nome SUED?</h3>
              <p className="text-muted-foreground">
                SUED é um anagrama para Deus, refletindo a aspiração à verdade única através de dados proprietários e a capacidade de transformar caos em ordem estruturada.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">Como funciona o Modelo de Constelação?</h3>
              <p className="text-muted-foreground">
                Transforma pontos isolados de dados em padrões significativos, tratando cada elemento (produto, preço, cliente, concorrentes, valores) como uma estrela em uma constelação estratégica.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">Qual é a importância da Geometria Sagrada?</h3>
              <p className="text-muted-foreground">
                Simboliza a estrutura complexa do mercado e a capacidade de enxergar padrões invisíveis através de análise sofisticada de dados, refletindo ordem divina manifestada na matemática.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/40 border border-border">
              <h3 className="text-xl font-bold text-accent mb-2">Como SUED se prepara para 2026?</h3>
              <p className="text-muted-foreground">
                Através de Otimização de Mecanismos Generativos (GEO), integração de IA agêntica, e foco em autenticidade como diferencial competitivo em um mercado saturado por conteúdo gerado por IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 8: CTA Final */}
      <section className="py-24 bg-background">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-6">Pronto para Redefinir seu Marketing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra como a precisão algorítmica e a autoridade em primeiro lugar podem transformar sua estratégia de marketing.
          </p>
          <Button className="px-8 py-4 text-lg">Comece Agora</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">SUED Studio</h4>
              <p className="text-muted-foreground">Redefinindo marketing através de precisão algorítmica e autoridade celestial.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#mercado" className="hover:text-accent transition-colors">Mercado</a></li>
                <li><a href="#cores" className="hover:text-accent transition-colors">Design</a></li>
                <li><a href="#interface" className="hover:text-accent transition-colors">Interface</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><Mail size={16} /> contato@sued.studio</li>
                <li className="flex items-center gap-2"><Linkedin size={16} /> LinkedIn</li>
                <li className="flex items-center gap-2"><Twitter size={16} /> Twitter</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacidade</a></li>
              </ul>
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
