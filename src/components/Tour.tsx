import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BookingModal from "./BookingModal";
import { useState } from "react";

const Tour = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const shows = [
    {
      date: "Coming Soon",
      venue: "Stay Tuned",
      location: "TBA",
      status: "Announced Soon",
    },
  ];

  return (
    <section id="tour" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-secondary" />
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Tour Dates
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the energy live—catch XO DRYFT on tour
          </p>
        </div>

        <div className="space-y-4">
          {shows.map((show, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-lg border border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow-secondary animate-slide-in"
            >
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-bold text-lg">{show.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:col-span-2">
                    <MapPin className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-bold text-lg">{show.venue}</p>
                      <p className="text-sm text-muted-foreground">{show.location}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="secondary" disabled className="w-full md:w-auto">
                      <Ticket className="mr-2" />
                      {show.status}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-secondary p-8 text-center border-0">
          <h3 className="text-2xl font-bold mb-4 text-secondary-foreground">
            Want to bring XO DRYFT to your city?
          </h3>
          <p className="text-secondary-foreground/80 mb-6">
            Booking inquiries and show requests welcomed
          </p>
          <Button 
            variant="glass" 
            size="lg"
            onClick={() => setBookingOpen(true)}
          >
            Contact for Booking
          </Button>
        </Card>
      </div>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
};

export default Tour;
