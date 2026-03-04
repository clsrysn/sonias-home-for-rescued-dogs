import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getDogById } from "@/firebase/database";
import { allDogs as staticDogs } from "@/data/dogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const DogProfile = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const dogData = await getDogById(id);
        setDog(dogData);
      } catch (err) {
        // Fallback to static data if Firebase fails
        console.warn("Firebase not configured, using static data:", err);
        const staticDog = staticDogs.find(d => d.id === id);
        setDog(staticDog);
      }
    };
    fetchDog();
  }, [id]);

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [dogPhotos, setDogPhotos] = useState([]);

  // Scroll to top when component mounts or dog changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load images dynamically from dog's folder
  useEffect(() => {
    const loadDogPhotos = async () => {
      if (!dog) return;
      
      try {
        let photos = [];
        
        console.log('Loading photos for dog:', dog.name);
        console.log('GalleryImages field:', dog.galleryImages);
        console.log('All dog fields:', Object.keys(dog));
        
        // Handle both galleryImages (no space) and galleryImages (with space)
        const galleryField = dog.galleryImages || dog['galleryImages '];
        console.log('Gallery field found:', galleryField);
        
        // Use galleryImages field if available, otherwise fallback to original method
        if (galleryField) {
          // galleryImages is a directory name, load all images from that directory
          const imageModules = import.meta.glob("@/assets/dogs/*/*.{jpg,jpeg,png,gif,webp,svg}");
          console.log('All available image paths:', Object.keys(imageModules));
          
          for (const path in imageModules) {
            // Check if the image is in the correct dog gallery folder
            if (path.includes(`/dogs/${galleryField}/`)) {
              console.log('Found image in gallery folder:', path);
              const module = await imageModules[path]() as any;
              photos.push(module.default as string);
            }
          }
        } else {
          // Fallback to original method
          const imageModules = import.meta.glob("@/assets/dogs/*/*.{jpg,jpeg,png,gif,webp,svg}");
          for (const path in imageModules) {
            // Check if the image is in the correct dog folder
            if (path.includes(`/dogs/${dog.id}/`)) {
              const module = await imageModules[path]() as any;
              photos.push(module.default as string);
            }
          }
        }
        
        console.log('Photos found:', photos);
        
        // Sort photos alphabetically by filename for consistency
        photos.sort((a, b) => {
          const getFilename = (url) => url.split('/').pop().split('.')[0];
          return getFilename(a).localeCompare(getFilename(b));
        });
        
        setDogPhotos(photos.length > 0 ? photos : [dog.image]); // Fallback to main image if no photos found
      } catch (error) {
        console.error('Error loading dog photos:', error);
        setDogPhotos([dog.image]); // Fallback to main image
      }
    };
    
    loadDogPhotos();
  }, [dog]);

  if (!dog) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Dog Not Found</h1>
          <Link to="/gallery">
            <Button variant="default">Back to Gallery</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const prevPhoto = () => setCurrentPhoto((p) => (p === 0 ? dogPhotos.length - 1 : p - 1));
  const nextPhoto = () => setCurrentPhoto((p) => (p === dogPhotos.length - 1 ? 0 : p + 1));

  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary-deepest py-14">
        <div className="container">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl text-primary-foreground">{dog.name}</h1>
            {dog.adopted && (
              <Badge className="bg-success text-success-foreground border-0 font-bold">Adopted</Badge>
            )}
          </div>
          <p className="text-primary-foreground/70 mt-1">{dog.age}</p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Profile Content */}
      <section className="bg-background py-12">
        <div className="container grid gap-10 md:grid-cols-2">
          {/* Main Photo */}
          <div className="rounded-lg overflow-hidden border border-border shadow-md">
            <img src={dog.image} alt={dog.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            
            {/* Dynamic Background */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Background & Story</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {dog.backgroundStory || "Story coming soon."}
              </p>
            </div>

            {/* Dynamic Personality */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">Personality</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {dog.personality || "Personality details coming soon."}
              </p>
            </div>

            {/* Dynamic Medical Info */}
            <div>
              <h3 className="font-display text-xl text-foreground mb-2">Medical Information</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {dog.medicalInformation || "Medical records are being updated."}
              </p>
            </div>

            {/* Dynamic Adoption Info (Only shows if NOT adopted) */}
            {!dog.adopted && (
              <div>
                <h3 className="font-display text-xl text-foreground mb-2">Adoption Details</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                  {dog.adoptionDetails || "Contact us for adoption requirements."}
                </p>
                <Link to="/donate">
                  <Button variant="cta" size="lg">Support {dog.name}'s Care</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="font-display text-2xl text-foreground text-center mb-8">Photo Gallery</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-md">
              <img
                src={dogPhotos[currentPhoto]}
                alt={`${dog.name} photo ${currentPhoto + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors shadow"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors shadow"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {dogPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhoto(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${i === currentPhoto ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DogProfile;