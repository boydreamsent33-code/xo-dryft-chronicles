import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import About from "@/components/About";
import Tour from "@/components/Tour";
import Store from "@/components/Store";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Music />
        <About />
        <Tour />
        <Store />
        <Connect />
      </main>
      <Footer />
      <BackgroundMusic />
      <Chatbot />
    </div>
  );
};

export default Index;
