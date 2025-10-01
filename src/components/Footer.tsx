const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-primary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} XO DRYFT. All rights reserved.
          </p>
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Where Emotion Meets Art
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
