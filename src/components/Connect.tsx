import { useState } from "react";
import { Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Connect = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing! 🎵",
        description: "You'll be the first to know about new releases and shows.",
      });
      setEmail("");
    }
  };

  const socials = [
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: "https://www.instagram.com/reel/DOUPAy6kmS2/?utm_source=ig_web_copy_link",
      color: "hover:text-[#E4405F]",
    },
    {
      name: "TikTok",
      icon: <span className="text-2xl">📱</span>,
      url: "https://www.tiktok.com/@xodrft_",
      color: "hover:text-[#00f2ea]",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      url: "https://www.youtube.com/channel/UCEU1O3UeUtpb_AbPF5pdR4Q",
      color: "hover:text-[#FF0000]",
    },
    {
      name: "Spotify",
      icon: <span className="text-2xl">🎵</span>,
      url: "https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg",
      color: "hover:text-[#1DB954]",
    },
    {
      name: "Apple Music",
      icon: <span className="text-2xl">🎧</span>,
      url: "https://music.apple.com/us/artist/xo-dryft/1794011466",
      color: "hover:text-[#FA243C]",
    },
  ];

  return (
    <section id="connect" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Mail className="w-8 h-8 text-accent" />
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Stay Connected
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the movement and never miss a beat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Newsletter */}
          <Card className="bg-card/50 backdrop-blur-lg border border-accent/20 p-8 hover:shadow-glow-accent transition-all duration-300">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Newsletter
              </span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Get exclusive updates, behind-the-scenes content, and early access to new releases
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
                required
              />
              <Button type="submit" variant="hero" className="w-full">
                Subscribe Now
              </Button>
            </form>
          </Card>

          {/* Social Media */}
          <Card className="bg-card/50 backdrop-blur-lg border border-primary/20 p-8 hover:shadow-glow-primary transition-all duration-300">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Follow the Journey
              </span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect on social media for daily updates and exclusive content
            </p>
            <div className="space-y-4">
              {socials.map((social) => (
                <Button
                  key={social.name}
                  variant="glass"
                  className="w-full justify-start text-lg group"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${social.color} transition-colors`}
                  >
                    {social.icon}
                    <span>Follow on {social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-primary p-12 text-center border-0">
          <h3
            className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Ready to Experience the Sound?
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Stream XO DRYFT now and become part of the story
          </p>
          <Button
            variant="glass"
            size="lg"
            className="text-lg px-12 py-6 bg-background text-foreground hover:bg-background/90"
            onClick={() => document.getElementById("music")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Listening
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default Connect;
