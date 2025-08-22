import {
  Briefcase,
  Code,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

import { portfolioData } from "@/utils/constants";

const Header = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
}: {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (section: string) => void;
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            {portfolioData.nome.split(" ")[0]}
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6">
            {[
              { id: "sobre", label: "Sobre Mim", icon: User },
              { id: "projetos", label: "Projetos", icon: Code },
              { id: "experiencias", label: "Experiências", icon: Briefcase },
              { id: "contato", label: "Contato", icon: MessageCircle },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === id
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                    : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}

            {/* Botão tema */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-2">
              {[
                { id: "sobre", label: "Sobre Mim", icon: User },
                { id: "projetos", label: "Projetos", icon: Code },
                {
                  id: "experiencias",
                  label: "Experiências",
                  icon: Briefcase,
                },
                { id: "contato", label: "Contato", icon: MessageCircle },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === id
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}

              {/* Botão tema mobile */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                <span>{theme === "light" ? "Modo Escuro" : "Modo Claro"}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
