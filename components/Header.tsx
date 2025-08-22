import { Briefcase, Code, Menu, MessageCircle, User, X } from "lucide-react";

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
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {portfolioData.nome.split(" ")[0]}
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
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
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
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
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
