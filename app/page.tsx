"use client";
import "@/i18n";

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
import { useTranslation } from "next-i18next";

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
import projectImages from "@/public/data/projectImages";
import projectGithubLinks from "@/public/data/projectGithubLinks";

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const { t } = useTranslation("common");

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

  const interests = t("portfolio.interests", { returnObjects: true }) as string[];
  const projects = t("portfolio.projects", { returnObjects: true }) as any[];
  const experiences = t("portfolio.experiences", { returnObjects: true }) as any[];

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
                      {t("portfolio.name")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-4xl font-bold">{t("portfolio.name")}</h1>
                    <p className="text-xl text-primary font-medium">
                      {t("portfolio.role")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("page.about_title")}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("portfolio.bio")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in">
                <Card className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      {t("page.professional_info")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium">{t("portfolio.education_label")}</p>
                        <p className="text-muted-foreground">
                          {t("portfolio.education")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Briefcase className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium">{t("portfolio.area_label")}</p>
                        <p className="text-muted-foreground">
                          {t("portfolio.area")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Code className="text-primary mt-1" size={18} />
                      <div>
                        <p className="font-medium mb-2">{t("portfolio.interests_label")}</p>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {t("portfolio.objectives")}
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
              <h2 className="text-4xl font-bold mb-4">
                {t("page.projects_title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("page.projects_description")}
              </p>
            </div>

            {/* timeline */}
            <div className="relative">
              {/* linha central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full hidden lg:block"></div>

              <div className="space-y-16">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="grid lg:grid-cols-2 gap-8 items-center relative"
                  >
                    {/* esquerda */}
                    <div
                      className={`${index % 2 === 0 ? "order-1" : "order-2"} flex`}
                      style={{ justifyContent: index % 2 === 0 ? "left" : "right" }}
                    >
                      <Card className="w-full max-w-lg hover-scale">
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={projectImages[project.id] || "/placeholder.svg"}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-primary">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech: string, i: number) => (
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
                            onClick={() => window.open(projectGithubLinks[project.id], "_blank")}
                          >
                            <Github size={18} className="mr-2" />
                            Ver no GitHub
                            <ExternalLink size={16} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* bolinha central */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                    </div>

                    {/* direita (espaçador) */}
                    <div
                      className={`${index % 2 === 0 ? "order-2" : "order-1"}`}
                    ></div>
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
              <h2 className="text-4xl font-bold mb-4">
                {t("page.experiences_title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("page.experiences_description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="text-primary" size={18} />
                      <span className="text-sm font-medium text-primary">
                        {exp.period}
                      </span>
                    </div>
                    <CardTitle>{exp.company}</CardTitle>
                    <CardDescription className="text-lg font-medium">
                      {exp.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
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
              <h2 className="text-4xl font-bold mb-4">
                {t("page.contact_title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("page.contact_description")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card text-card-foreground border-t border-border py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <p className="text-sm">© 2025 {t("portfolio.name")}</p>
          <button
            onClick={() => scrollToSection("sobre")}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronUp size={20} />
            <span>{t("page.back_to_top")}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
