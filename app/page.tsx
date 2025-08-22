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

import Header from "@/components/Header";
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

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");

  // Scroll suave
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
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main className="pt-16">
        {/* SOBRE */}
        <section id="sobre" className="py-20 bg-card text-card-foreground">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="fade-in">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/professional-headshot.png" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {portfolioData.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-4xl font-bold">{portfolioData.nome}</h1>
                    <p className="text-xl text-primary font-medium">
                      {portfolioData.cargo}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Sobre mim (Português)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {portfolioData.bio.pt}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      About me (English)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {portfolioData.bio.en}
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in">
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      Informações Profissionais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium">Formação</p>
                        <p className="text-muted-foreground">
                          {portfolioData.formacao}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Briefcase className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium">Área de Atuação</p>
                        <p className="text-muted-foreground">
                          {portfolioData.atuacao}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Code className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium mb-2">Interesses</p>
                        <div className="flex flex-wrap gap-2">
                          {portfolioData.interesses.map((interesse, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              {interesse}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {portfolioData.objetivos}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold mb-4">Projetos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Alguns dos projetos que já desenvolvi durante minha jornada como
                dev.
              </p>
            </div>

            {/* timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full hidden lg:block"></div>

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
                          <CardTitle className="text-primary">
                            {projeto.nome}
                          </CardTitle>
                          <CardDescription>{projeto.descricao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {projeto.tecnologias.map((tech, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-primary/30 text-primary"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            className="w-full border-primary/30 text-primary hover:bg-primary/10"
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

                    <div className="hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIÊNCIAS */}
        <section
          id="experiencias"
          className="py-20 bg-card text-card-foreground"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold mb-4">Experiências</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Minha trajetória ao longo da carreira.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.experiencias.map((exp, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="text-primary" size={18} />
                      <span className="text-sm font-medium text-primary">
                        {exp.periodo}
                      </span>
                    </div>
                    <CardTitle>{exp.empresa}</CardTitle>
                    <CardDescription className="text-lg font-medium">
                      {exp.cargo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-4xl font-bold mb-4">Contato</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Vamos conversar! Estou sempre aberto a oportunidades.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card text-card-foreground border-t border-border py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <p className="text-sm">© 2025 {portfolioData.nome}</p>
          <button
            onClick={() => scrollToSection("sobre")}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronUp size={20} />
            <span>Voltar ao topo</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
