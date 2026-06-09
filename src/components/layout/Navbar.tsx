import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, FileDown, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS } from '../../data/site.config';
import { scrollToSection } from '../../utils/scroll';
import MobileNav from './MobileNav';

interface NavbarProps {
  brandName: string;
  onResumeView: () => void;
  onResumeDownload: () => void;
}

export default function Navbar({ brandName, onResumeView, onResumeDownload }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-primary/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex cursor-pointer items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-lg font-bold tracking-tight">{brandName}</span>
        </motion.div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-secondary md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleScroll(e, item.toLowerCase())}
              className="transition-colors hover:text-accent"
            >
              {item}
            </a>
          ))}
          <button
            type="button"
            onClick={onResumeView}
            className="flex items-center gap-1 text-accent hover:underline"
          >
            Resume <ExternalLink className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onResumeDownload}
            className="flex items-center gap-1 text-secondary hover:text-accent"
            title="Download resume"
          >
            <FileDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="btn-secondary relative rounded-full p-2" title="Toggle Theme">
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180, opacity: theme === 'dark' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center no-transition"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? -180 : 0, opacity: theme === 'dark' ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center no-transition"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary ml-2 hidden rounded-full px-4 py-1.5 text-sm font-semibold text-white sm:inline-flex"
          >
            Contact
          </button>
          <MobileNav
            brandName={brandName}
            open={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
            onResumeView={onResumeView}
            onResumeDownload={onResumeDownload}
          />
        </div>
      </div>
    </header>
  );
}
