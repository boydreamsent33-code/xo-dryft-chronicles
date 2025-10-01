import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <User className="w-8 h-8 text-accent" />
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                The Story
              </span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card className="bg-card/50 backdrop-blur-lg border border-accent/20 p-8 hover:shadow-glow-accent transition-all duration-300">
            <div className="space-y-6">
              <h3
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Meet XO DRYFT
                </span>
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Born from the streets and raised on raw emotion, XO DRYFT is redefining melodic rap 
                for a new generation. With influences ranging from Juice WRLD's introspective lyricism 
                to Rod Wave's soulful delivery and Future's innovative production, XO DRYFT crafts 
                stories that resonate with anyone who's felt deeply.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Every track is a journey through pain, triumph, love, and loss—delivered with 
                unfiltered honesty and melodic precision. This isn't just music; it's a movement.
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card/30 backdrop-blur-lg border border-primary/20 p-6 hover:border-primary/40 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3 text-primary">🎤 The Sound</h4>
              <p className="text-foreground/80">
                A unique blend of melodic flows, emotional depth, and hard-hitting beats that 
                capture the complexity of modern life.
              </p>
            </Card>

            <Card className="bg-card/30 backdrop-blur-lg border border-secondary/20 p-6 hover:border-secondary/40 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3 text-secondary">💎 The Vision</h4>
              <p className="text-foreground/80">
                To create music that connects, heals, and inspires—building a community of 
                real ones who aren't afraid to feel.
              </p>
            </Card>

            <Card className="bg-card/30 backdrop-blur-lg border border-accent/20 p-6 hover:border-accent/40 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3 text-accent">🚀 The Journey</h4>
              <p className="text-foreground/80">
                From bedroom recordings to making waves in the scene, every step is documented 
                through music that tells the truth.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
