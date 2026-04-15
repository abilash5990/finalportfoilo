import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, FileDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-primary/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-lg font-bold tracking-tight">Abilash</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          {['Projects', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="hover:text-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            download="Resume.pdf"
            className="text-accent flex items-center gap-1"
          >
            Resume <FileDown className="w-4 h-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="btn-secondary relative rounded-full p-2"
            title="Toggle Theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180, opacity: theme === 'dark' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center no-transition"
            >
              <Sun className="w-5 h-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? -180 : 0, opacity: theme === 'dark' ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center no-transition"
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          </button>
          <button 
            onClick={(e) => scrollToSection(e as any, 'contact')}
            className="btn-primary ml-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
