import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import DogCard from "@/components/DogCard";
import { Heart, Home as HomeIcon, Shield, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroDog from "@/assets/hero-dog.png";
import { allDogs } from "@/data/dogs";

const missionCards = [
  { icon: Heart, title: "[Rescue]", text: "[Mission card text placeholder]" },
  { icon: HomeIcon, title: "[Rehabilitate]", text: "[Mission card text placeholder]" },
  { icon: Shield, title: "[Rehome]", text: "[Mission card text placeholder]" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deepest">
        <div className="container relative z-10 grid gap-8 py-16 md:grid-cols-2 md:py-24 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
              Sonia's Home of Animal Rescue (SHARE)
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
              [Subtext placeholder – Emotional tagline about rescuing dogs and giving them a second chance at life.]
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button variant="hero" size="xl">About Us</Button>
              </Link>
              <Link to="/donate">
                <Button variant="heroCta" size="xl">Donate Now</Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            {/* Geometric yellow accent */}
            <div className="absolute -right-4 -top-4 h-[110%] w-[90%] bg-secondary/20 geometric-accent-reverse rounded" />
            <div className="absolute -left-4 -bottom-4 h-24 w-24 bg-secondary rotate-12" />
            <img
              src={heroDog}
              alt="Rescue dog"
              className="relative z-10 w-full max-w-md rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Yellow divider */}
      <div className="section-divider" />

      {/* Mission Snapshot */}
      <section className="bg-background py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">
            [Our Mission]
          </h2>
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
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">
            Featured Dogs
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {allDogs.map((dog, i) => (
              <div key={i} className="min-w-[280px] max-w-[320px] snap-start flex-shrink-0">
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
          <div className="aspect-video rounded-lg bg-primary-deepest/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Play className="h-16 w-16 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">[Video Placeholder]</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-foreground">[Rescue Story Title]</h2>
            <p className="text-muted-foreground leading-relaxed">
              [Placeholder text explaining the rescue story. This section will feature an emotional video about the organization's rescue efforts.]
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground">
            [Call to Action Heading]
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            [Placeholder supporting text for the call to action section.]
          </p>
          <Link to="/donate">
            <Button variant="heroCta" size="xl">Support Our Rescue</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
