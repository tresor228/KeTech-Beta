"use client"

import Link from "next/link"
import { KeTechLogo } from "@/components/ketech-logo"
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Facebook,
  Youtube,
  MapPin,
  Phone,
  ArrowUp,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setShowScrollTop(scrollTop > 400)
    }

    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    produit: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Hackathons", href: "/hackathons" },
      { label: "Projects", href: "/projects" },
    ],
    entreprise: [
      { label: "About", href: "/about" },
      { label: "Our mission", href: "/mission" },
      { label: "Careers", href: "/careers" },
      { label: "Parteners", href: "/partners" },
    ],
    ressources: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Support", href: "/support" },
    ],
    légal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "CGU", href: "/terms" },
    ],
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub", delay: "0ms" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", delay: "100ms" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", delay: "200ms" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", delay: "300ms" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", delay: "400ms" },
  ]

  return (
    <>
      <footer
        className={cn(
          "relative bg-card border-t border-border",
          "transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Logo et Description */}
            <div className="lg:col-span-2 space-y-4">
              <KeTechLogo />
              <p className="text-muted-foreground leading-relaxed max-w-md">
              Technical evaluation and talent matching platform for African developers. Connect with the best talents.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>Afrique</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  <a href="mailto:contact@ketech.com" className="hover:text-primary transition-colors">
                    contact@ketech.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  <a href="tel:+221000000000" className="hover:text-primary transition-colors">
                    +228 99 99 00 00
                  </a>
                </div>
              </div>
            </div>

            {/* Colonnes de liens */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Produit</h3>
              <ul className="space-y-3">
                {footerLinks.produit.map((link, index) => (
                  <li
                    key={link.href}
                    className={cn(
                      "transition-all duration-500 ease-out",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.entreprise.map((link, index) => (
                  <li
                    key={link.href}
                    className={cn(
                      "transition-all duration-500 ease-out",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: `${(index + 4) * 50}ms` }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.ressources.map((link, index) => (
                  <li
                    key={link.href}
                    className={cn(
                      "transition-all duration-500 ease-out",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                    style={{ transitionDelay: `${(index + 8) * 50}ms` }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section Réseaux sociaux et Légale */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Réseaux sociaux */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:block">Follow us :</span>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn(
                          "flex items-center justify-center size-10 rounded-lg border border-border bg-background text-muted-foreground",
                          "hover:border-primary hover:text-primary hover:bg-primary/5",
                          "transition-all duration-300 ease-out",
                          "hover:scale-110 hover:-translate-y-1",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        )}
                        style={{ transitionDelay: social.delay }}
                      >
                        <Icon className="size-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Liens légaux */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {footerLinks.légal.map((link, index) => (
                  <Link
                    key={`${link.href}-${link.label}-${index}`}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground hover:text-primary transition-all duration-200",
                      "hover:underline"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  © {new Date().getFullYear()} KeTech. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour en haut */}
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex items-center justify-center size-12 rounded-full",
            "bg-primary text-primary-foreground shadow-lg",
            "hover:bg-primary/90 hover:scale-110",
            "transition-all duration-300 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </button>
      </footer>
    </>
  )
}

