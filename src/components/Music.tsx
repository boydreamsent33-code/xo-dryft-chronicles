import { Music2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import spotifyReleases from "@/assets/spotify-releases.png";
import spotifyProfile from "@/assets/spotify-profile.png";

const Music = () => {
  const platforms = [
    {
      name: "Spotify",
      icon: "🎵",
      url: "https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg",
      color: "from-[#1DB954] to-[#1ed760]",
    },
    {
      name: "Apple Music",
      icon: "🎧",
      url: "https://music.apple.com/us/artist/xo-dryft/1794011466",
      color: "from-[#FA243C] to-[#fc3c4d]",
    },
    {
      name: "YouTube Music",
      icon: "▶️",
      url: "https://www.youtube.com/channel/UCEU1O3UeUtpb_AbPF5pdR4Q",
      color: "from-[#FF0000] to-[#ff1a1a]",
    },
  ];

  return (
    <section id="music" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Music2 className="w-8 h-8 text-primary" />
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Listen Now
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stream the latest tracks across all major platforms
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <Card
              key={platform.name}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-lg border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8 text-center">
                <div
                  className={`text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {platform.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {platform.name}
                </h3>
                <Button
                  variant="glass"
                  className="w-full group-hover:bg-gradient-primary group-hover:text-primary-foreground"
                  asChild
                >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Stream on {platform.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </Card>
          ))}
        </div>

        {/* Latest Release Section */}
        <div className="mt-16">
          <Card className="bg-card/30 backdrop-blur-lg border border-primary/20 p-8">
            <h3
              className="text-2xl font-bold mb-6 text-center"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Latest Release
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Spotify Profile Image */}
              <div className="bg-card/50 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all">
                <img 
                  src={spotifyProfile} 
                  alt="XO Dryft Spotify Profile" 
                  className="w-full rounded-lg mb-4"
                />
                <Button variant="hero" className="w-full" asChild>
                  <a
                    href="https://open.spotify.com/artist/0MPKNQoL73e87pPn9ruL7D?si=v-1KohdxTEK0qeOYiZsaeg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen on Spotify
                  </a>
                </Button>
              </div>

              {/* Spotify Releases Image */}
              <div className="bg-card/50 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all">
                <img 
                  src={spotifyReleases} 
                  alt="XO Dryft Popular Releases" 
                  className="w-full rounded-lg mb-4"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="glass" size="sm" asChild>
                    <a
                      href="https://music.apple.com/us/artist/xo-dryft/1794011466"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apple Music
                    </a>
                  </Button>
                  <Button variant="glass" size="sm" asChild>
                    <a
                      href="https://www.youtube.com/channel/UCEU1O3UeUtpb_AbPF5pdR4Q"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YouTube
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Music;
