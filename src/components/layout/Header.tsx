import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "Главная", path: "/" },
  { name: "Каталог", path: "/catalog" },
  { name: "Квиз", path: "/quiz" },
  { name: "Галерея", path: "/gallery" },
  { name: "О нас", path: "/about" },
  { name: "Контакты", path: "/contacts" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-white/20" : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight group z-50 relative">
            <span className={cn("transition-colors", scrolled || mobileMenuOpen ? "text-primary" : "text-white")}>
              КУХНИ
            </span>
            <span className="text-accent ml-2 group-hover:text-accent-hover transition-colors">МЕЧТЫ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium relative group py-1 transition-colors",
                  scrolled ? "text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+79991234567"
              className={cn(
                "flex items-center gap-2 font-mono text-sm transition-colors",
                scrolled ? "text-primary" : "text-white"
              )}
            >
              <Phone className="w-4 h-4 animate-pulse text-accent" />
              +7 (999) 123-45-67
            </a>
            <Button className="bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 whitespace-nowrap">
              Рассчитать кухню
            </Button>
          </div>

          <button
            className="md:hidden z-50 p-2 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? (
               <X className="w-6 h-6 text-primary" />
             ) : (
               <Menu className={cn("w-6 h-6", scrolled ? "text-primary" : "text-white")} />
             )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden h-screen"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-primary hover:text-accent transition-colors block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-4 w-full"
              >
                <a
                  href="tel:+79991234567"
                  className="flex items-center justify-center gap-2 font-mono text-lg text-primary"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  +7 (999) 123-45-67
                </a>
                <Button className="w-full text-lg h-14 bg-primary text-white whitespace-nowrap">
                  Рассчитать проект
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
