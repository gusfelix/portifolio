"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  MapPin,
  Calendar,
  Code,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { portfolioData } from "@/utils/constants";
import Header from "@/components/Header";
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");

  // Scroll suave para seções
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["sobre", "projetos", "experiencias", "contato"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Main */}
      <main className="pt-16">
        {/* Sobre Mim */}
        <section id="sobre" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/professional-headshot.png" />
                    <AvatarFallback className="text-2xl bg-emerald-100 text-emerald-600">
                      {portfolioData.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                      {portfolioData.nome}
                    </h1>
                    <p className="text-xl text-emerald-600 font-medium">
                      {portfolioData.cargo}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Sobre mim (Português)
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {portfolioData.bio.pt}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      About me (English)
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {portfolioData.bio.en}
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in">
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-emerald-600">
                      Informações Profissionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-emerald-600 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-slate-900">Formação</p>
                        <p className="text-slate-600">
                          {portfolioData.formacao}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Briefcase className="text-emerald-600 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-slate-900">
                          Área de Atuação
                        </p>
                        <p className="text-slate-600">
                          {portfolioData.atuacao}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Code className="text-emerald-600 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-slate-900 mb-2">
                          Interesses
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {portfolioData.interesses.map((interesse, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-emerald-50 text-emerald-700"
                            >
                              {interesse}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-slate-600 leading-relaxed">
                        {portfolioData.objetivos}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Projetos
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Alguns dos projetos que já desenvolvi durante toda minha jornada
                como desenvolvedor.
              </p>
            </div>

            <div className="relative">
              {/* Linha do tempo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-emerald-200 h-full hidden lg:block"></div>

              <div className="space-y-12">
                {portfolioData.projetos.map((projeto, index) => (
                  <div
                    key={projeto.id}
                    className={`flex items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:space-x-8`}
                  >
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                      <Card className="hover-scale">
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={projeto.imagem || "/placeholder.svg"}
                            alt={projeto.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-emerald-600">
                            {projeto.nome}
                          </CardTitle>
                          <CardDescription>{projeto.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {projeto.tecnologias.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="outline"
                                className="border-emerald-200 text-emerald-700"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                            onClick={() =>
                              window.open(projeto.github, "_blank")
                            }
                          >
                            <Github size={18} className="mr-2" />
                            Ver no GitHub
                            <ExternalLink size={16} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Indicador da linha do tempo */}
                    <div className="hidden lg:block w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experiências */}
        <section id="experiencias" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Experiências
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Minha trajetória ao longo da carreira como desenvolvedor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.experiencias.map((exp, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="text-emerald-600" size={18} />
                      <span className="text-sm font-medium text-emerald-600">
                        {exp.periodo}
                      </span>
                    </div>
                    <CardTitle className="text-slate-900">
                      {exp.empresa}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-slate-700">
                      {exp.cargo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {exp.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Contato
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Vamos conversar! Estou sempre aberto a novas oportunidades e
                colaborações.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Links de contato */}
              <div className="fade-in">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">
                  Entre em contato
                </h3>
                <div className="space-y-6">
                  <a
                    href="mailto:email@exemplo.com"
                    className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Mail className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">E-mail</p>
                      <p className="text-slate-600">email@exemplo.com</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Phone className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">WhatsApp</p>
                      <p className="text-slate-600">+55 (11) 99999-9999</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/seu-perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Linkedin className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">LinkedIn</p>
                      <p className="text-slate-600">
                        linkedin.com/in/seu-perfil
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Formulário de contato */}
              <div className="fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-600">
                      Envie uma mensagem
                    </CardTitle>
                    <CardDescription>
                      Preencha o formulário e entrarei em contato em breve.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div>
                        <label
                          htmlFor="nome"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Nome completo
                        </label>
                        <Input
                          id="nome"
                          placeholder="Seu nome completo"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@exemplo.com"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="mensagem"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Mensagem
                        </label>
                        <Textarea
                          id="mensagem"
                          placeholder="Conte-me sobre seu projeto ou oportunidade..."
                          rows={5}
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Mail size={18} className="mr-2" />
                        Enviar mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-300">
                © 2025 {portfolioData.nome}. Todos os direitos reservados.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="mailto:email@exemplo.com"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>

            <button
              onClick={() => scrollToSection("sobre")}
              className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <ChevronUp size={20} />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
