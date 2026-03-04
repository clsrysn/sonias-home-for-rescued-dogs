import Layout from "@/components/layout/Layout";
import DogCard from "@/components/DogCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDogs } from "@/hooks/useDogs";

const filters = ["All", "Puppies", "Adults", "Adopted"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const { dogs: allDogs, loading, error } = useDogs();

  const filtered = active === "All"
    ? allDogs
    : allDogs.filter((d) => d.category === active);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading dogs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center space-y-3">
          <h1 className="font-display text-4xl text-primary-foreground">[Our Dogs]</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            [Intro text placeholder – Browse our wonderful rescues waiting for their forever homes.]
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
