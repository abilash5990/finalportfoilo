import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, RefreshCcw, Zap, FileDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onRefresh: () => void;
}

export default function Navbar({ onRefresh }: NavbarProps) {
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
    <header className="sticky top-0 z-40 w-full glass border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center glow-border">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter glow-text">NOVA</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-70">
          {['Projects', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="hover:text-accent hover:opacity-100 transition-all"
            >
              {item}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            download="Resume.pdf"
            className="text-accent hover:opacity-100 flex items-center gap-1"
          >
            Resume <FileDown className="w-4 h-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={onRefresh}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full group"
            title="Refresh Interface"
          >
            <RefreshCcw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full relative"
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
            className="ml-2 px-4 py-1.5 bg-accent hover:bg-cyan-400 text-white text-sm font-bold rounded-full shadow-lg shadow-accent/20 active:scale-95"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
