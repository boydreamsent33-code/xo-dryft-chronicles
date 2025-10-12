import { Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import coverDryfting from "@/assets/cover-dryfting-new.jpg";
import coverAllOfMe from "@/assets/cover-all-of-me.jpg";
import coverHeartInMotion from "@/assets/cover-heart-in-motion.jpg";
import coverWithoutYou from "@/assets/cover-without-you.jpg";
const Music = () => {
  return <section id="music" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Music2 className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-6xl font-bold" style={{
            fontFamily: "Orbitron, sans-serif"
          }}>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Latest Releases
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stream the latest tracks across all major platforms
          </p>
        </div>

        {/* Latest Release Section */}
        <div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Featured Album - Dryfting */}
            <Card className="bg-card/50 backdrop-blur-lg border border-primary/20 p-6 hover:border-primary/40 transition-all hover:shadow-glow-primary">
              <div className="aspect-square rounded-lg mb-4 overflow-hidden">
                <img src={coverDryfting} alt="Dryfting Album Cover" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{
              fontFamily: "Orbitron, sans-serif"
            }}>
                Dryfting
              </h3>
              <p className="text-muted-foreground mb-4">Album • 2025</p>
              <div className="space-y-2 text-sm mb-4">
                <p className="text-foreground/80 font-semibold">Popular Tracks:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">1.</span> 3AM
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">2.</span> Come On
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">3.</span> All Of Me
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">4.</span> Summer Love
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">5.</span> Cardio
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="hero" size="sm" asChild>
                  <a href="https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg" target="_blank" rel="noopener noreferrer">
                    Spotify
                  </a>
                </Button>
                <Button variant="glass" size="sm" asChild>
                  <a href="https://music.apple.com/us/artist/xo-dryft/1794011466" target="_blank" rel="noopener noreferrer">
                    Apple Music
                  </a>
                </Button>
              </div>
            </Card>

            {/* Other Releases */}
            <div className="space-y-4">
              {/* All OF ME */}
              <Card className="bg-card/50 backdrop-blur-lg border border-primary/20 p-4 hover:border-primary/40 transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img src={coverAllOfMe} alt="All OF ME Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">All OF ME</h4>
                    <p className="text-sm text-muted-foreground mb-3">Single • 2025</p>
                    <div className="flex gap-2">
                      <Button variant="glass" size="sm" asChild>
                        <a href="https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg" target="_blank" rel="noopener noreferrer">
                          Stream
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Heart In Motion */}
              <Card className="bg-card/50 backdrop-blur-lg border border-secondary/20 p-4 hover:border-secondary/40 transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img src={coverHeartInMotion} alt="Heart In Motion Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">Heart In Motion</h4>
                    <p className="text-sm text-muted-foreground mb-3">EP • 2025</p>
                    <div className="flex gap-2">
                      <Button variant="glass" size="sm" asChild>
                        <a href="https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg" target="_blank" rel="noopener noreferrer">
                          Stream
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Without You */}
              <Card className="bg-card/50 backdrop-blur-lg border border-primary/20 p-4 hover:border-primary/40 transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img src={coverWithoutYou} alt="Without You Cover" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">Without You</h4>
                    <p className="text-sm text-muted-foreground mb-3">Single • 2025</p>
                    <div className="flex gap-2">
                      <Button variant="glass" size="sm" asChild>
                        <a href="https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg" target="_blank" rel="noopener noreferrer">
                          Stream
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Music;