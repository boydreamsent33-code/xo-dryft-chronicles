import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import About from "@/components/About";
import Tour from "@/components/Tour";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Music />
        <About />
        <Tour />
        <Connect />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
