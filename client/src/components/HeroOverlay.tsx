import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function HeroOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="hero-overlay">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="hero-logo" variants={itemVariants}>
          <Logo className="h-16 w-auto" />
        </motion.div>

        {/* Título */}
        <motion.h1 className="hero-title" variants={itemVariants}>
          Redefinindo Marketing<br />
          <span className="gradient-text">Através de Precisão Algorítmica</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p className="hero-subtitle" variants={itemVariants}>
          O SUED Studio transforma o caos do marketing digital em estratégias estruturadas e orientadas por dados, alimentadas pela onisciência algorítmica.
        </motion.p>

        {/* Ações */}
        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="btn btn-primary">
            <ArrowRight size={20} />
            Comece Agora
          </button>
          <button className="btn btn-secondary">
            <Sparkles size={20} />
            Explorar
          </button>
        </motion.div>

        {/* Badge */}
        <motion.div className="hero-badge" variants={itemVariants}>
          <span>✨ Marketing Orientado por Dados</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
