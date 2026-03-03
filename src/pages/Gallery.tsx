import Layout from "@/components/layout/Layout";
import DogCard from "@/components/DogCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { allDogs } from "@/data/dogs";

const filters = ["All", "Puppies", "Adults", "Adopted"];

const Gallery = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? allDogs
    : allDogs.filter((d) => d.category === active);

  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center space-y-3">
          <h1 className="font-display text-4xl text-primary-foreground">[Our Dogs]</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            [Intro text placeholder – Browse our lovable rescues waiting for their forever homes.]
          </p> {/* TO DO */}
        </div>
      </section>

      <div className="section-divider" />

      {/* Filter Bar */}
      <section className="bg-background py-6 border-b border-border">
        <div className="container flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <Button
              key={f}
              variant={active === f ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(f)}
              className={f === "Adopted" && active === f ? "bg-success hover:bg-success/90 text-success-foreground" : ""}
            >
              {f}
            </Button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((dog) => (
              <DogCard key={dog.id} id={dog.id} image={dog.image} name={dog.name} age={dog.age} description={dog.description} adopted={dog.adopted} />
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
