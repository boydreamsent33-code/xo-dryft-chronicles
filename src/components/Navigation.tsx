import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-primary/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1
            className="text-2xl font-bold tracking-wider cursor-pointer"
            style={{ fontFamily: "Orbitron, sans-serif" }}
            onClick={() => scrollToSection("hero")}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">XO DRYFT</span>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("music")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Music
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("tour")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Tour
            </button>
            <button
              onClick={() => scrollToSection("connect")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("music")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Music
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("tour")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Tour
              </button>
              <button
                onClick={() => scrollToSection("connect")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
