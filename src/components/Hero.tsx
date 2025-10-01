import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/background-1.jpg";

const Hero = () => {
  const handleStreamClick = () => {
    document.getElementById("music")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="XO DRYFT"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-slide-in">
          <h2
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              XO DRYFT
            </span>
          </h2>
          <p className="text-xl md:text-3xl mb-4 text-foreground/90 font-light">
            Where Melodic Rap Meets Emotional Storytelling
          </p>
          <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
            Experience the fusion of raw emotion and intricate wordplay
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6 animate-glow"
              onClick={handleStreamClick}
            >
              <Play className="mr-2" />
              Stream Now
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
