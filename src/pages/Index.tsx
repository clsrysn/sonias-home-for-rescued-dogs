import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import DogCard from "@/components/DogCard";
import { Heart, Home as HomeIcon, Shield, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDogs } from "@/hooks/useDogs";
import logo from "@/assets/logo.png";

const missionCards = [
  { icon: Heart, title: "[Rescue]", text: "[Mission card text placeholder]" }, // TO DO
  { icon: HomeIcon, title: "[Rehabilitate]", text: "[Mission card text placeholder]" }, // TO DO
  { icon: Shield, title: "[Rehome]", text: "[Mission card text placeholder]" }, // TO DO
];

const Index = () => {
  const { dogs: allDogs, loading } = useDogs();
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [featuredDogs, setFeaturedDogs] = useState([]);
  const [heroDogs, setHeroDogs] = useState([]);

  // Randomly select 3 dogs for featured section
  useEffect(() => {
    if (allDogs.length > 0) {
      const shuffled = [...allDogs].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setFeaturedDogs(selected);
    }
  }, [allDogs]);

  // Hero section uses ALL dogs
  useEffect(() => {
    setHeroDogs(allDogs);
  }, [allDogs]);

  const prevDog = () => {
    if (isAnimating || heroDogs.length === 0) return;
    setIsAnimating(true);
    setCurrentDogIndex((i) => (i === 0 ? heroDogs.length - 1 : i - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextDog = () => {
    if (isAnimating || heroDogs.length === 0) return;
    setIsAnimating(true);
    setCurrentDogIndex((i) => (i === heroDogs.length - 1 ? 0 : i + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deepest">
        <div className="container relative z-10 grid gap-8 py-16 md:grid-cols-2 md:py-24 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Sonia's Home of Animal Rescue (S.H.A.R.E.)
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
              [Subtext placeholder – Emotional tagline about rescuing dogs and giving them a second chance at life.]
            </p> {/* TO DO */}
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button variant="hero" size="xl">About Us</Button>
              </Link>
              <Link to="/donate">
                <Button variant="heroCta" size="xl">Donate Now</Button>
              </Link>
            </div>
          </div>
          {/* Hero Dog Carousel */}
          <div className="relative flex justify-center">
            {heroDogs.length > 0 ? (
              <>
                {/* Geometric yellow accent */}
                <div className="absolute -right-4 -top-4 h-[110%] w-[90%] bg-secondary/20 geometric-accent-reverse rounded" />
                <div className="absolute -left-4 -bottom-4 h-24 w-24 bg-secondary rotate-12" />
                <div className="relative z-10 w-full max-w-md">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-border transition-opacity duration-300" 
                       style={{ opacity: isAnimating ? 0.7 : 1 }}>
                    <img
                      src={heroDogs[currentDogIndex].image}
                      alt={heroDogs[currentDogIndex].name}
                      className="w-full h-full object-cover"
                      style={{ 
                        objectFit: 'contain',
                        backgroundColor: '#f3f4f5'
                      }}
                    />
                  </div>
                  <button
                    onClick={prevDog}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-all duration-200 shadow hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5 text-foreground transition-transform duration-200" />
                  </button>
                  <button
                    onClick={nextDog}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-all duration-200 shadow hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5 text-foreground transition-transform duration-200" />
                  </button>
                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {heroDogs.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentDogIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${i === currentDogIndex ? "bg-primary" : "bg-border"}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="relative z-10 w-full max-w-md">
                <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dogs...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Yellow divider */}
      <div className="section-divider" />

      {/* Mission Snapshot */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-foreground mb-6">
              [Our Mission]
            </h2> {/* TO DO */}
            <img 
              src={logo} 
              alt="Sonia's Home Animal Rescue Logo" 
              className="w-full max-w-md h-auto mx-auto mb-12 object-contain"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {missionCards.map((card, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 shadow-sm border-t-4 border-t-secondary hover:shadow-md transition-shadow"
              >
                <card.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dogs */}
      <section className="bg-muted py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-foreground mb-10">
            Featured Dogs
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide justify-center">
            {featuredDogs.map((dog, i) => (
              <div key={dog.id} className="min-w-[320px] max-w-[400px] snap-start flex-shrink-0">
                <DogCard {...dog} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/gallery">
              <Button variant="outline" size="lg">View All Dogs →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-background py-16">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/k_fdGuQU_kQ"
              title="Rescue Story Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-foreground"> This is Sonia's Home of Rescued Dogs </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sonia’s Home for Rescued Dogs, also known as the Davao Animal Rescue Volunteers (DARV), is a non-profit animal welfare organization in Davao City founded in 2009 to rescue and care for stray, abandoned, and abused dogs. This organization is devoted to providing a safe shelter, medical care, and daily support for rescued animals through the help of dedicated volunteers and partners. Today, DARV cares for 142 rescued dogs in its permanent shelter in Purok 7, Alambre, Toril, Davao City, strengthening its mission to uphold the dignity, compassion, and protection that every animal deserves.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground">
            [Call to Action Heading]
          </h2> {/* TO DO */}
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            [Placeholder supporting text for the call to action section.]
          </p> {/* TO DO */}
          <Link to="/donate">
            <Button variant="heroCta" size="xl">Support Our Rescue</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
