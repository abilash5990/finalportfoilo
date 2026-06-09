import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ExternalLink, FileDown } from 'lucide-react';
import { NAV_ITEMS } from '../../data/site.config';
import { scrollToSection } from '../../utils/scroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MobileNavProps {
  brandName: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onResumeView: () => void;
  onResumeDownload: () => void;
}

export default function MobileNav({
  brandName,
  open,
  onOpen,
  onClose,
  onResumeView,
  onResumeDownload,
}: MobileNavProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleNav = (id: string) => {
    onClose();
    setTimeout(() => scrollToSection(id), 150);
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="btn-secondary rounded-full p-2 md:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <motion.nav
              initial={reducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reducedMotion ? undefined : { x: '100%' }}
              transition={reducedMotion ? undefined : { type: 'spring', damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 flex h-full w-72 flex-col border-l border-border-subtle bg-bg-primary p-6 shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-bold tracking-tight">{brandName}</span>
                <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/10" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleNav(item.toLowerCase())}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-secondary hover:bg-white/5 hover:text-accent"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onResumeView();
                  }}
                  className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle px-4 py-3 text-sm font-semibold"
                >
                  View Resume <ExternalLink className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onResumeDownload();
                  }}
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                >
                  Download Resume <FileDown className="h-4 w-4" />
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
