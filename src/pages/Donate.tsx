import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Dog, X, Smartphone, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useDogs } from "@/hooks/useDogs";
import { addDonation } from "@/firebase/database";

const donationOptions = [
  { icon: Heart, title: "One-Time Donation", description: "Make a single donation to support our rescue dogs." },
  { icon: Dog, title: "Sponsor a Dog", description: "Sponsor a specific rescue dog with monthly support." }
];

const amounts = ["$10", "$25", "$50", "$100"];

const Donate = () => {
  const { dogs: allDogs } = useDogs();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showDogGallery, setShowDogGallery] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showDogDonationModal, setShowDogDonationModal] = useState(false);
  const [whereMoneyGoesImages, setWhereMoneyGoesImages] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });

  const handleOneTimeDonation = () => {
    setShowDonationModal(true);
  };

  const handleSponsorDog = () => {
    setShowDogGallery(true);
  };

  const handleDogSelect = (dog) => {
    setSelectedDog(dog);
    setShowDogGallery(false);
    setShowDogDonationModal(true);
  };

  const handleImageClick = (img) => {
    setExpandedImage(img);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  // Load images dynamically from where money goes folder
  useEffect(() => {
    const loadWhereMoneyGoesImages = async () => {
      try {
        const imageModules = import.meta.glob("@/assets/where_money_goes/*.{jpg,jpeg,png,gif,webp,svg}");
        const images = [];
        
        for (const path in imageModules) {
          const module = await imageModules[path]() as any;
          images.push({
            src: module.default as string,
            filename: path.split('/').pop().split('.')[0]
          });
        }
        
        // Sort images alphabetically by filename for consistency
        images.sort((a, b) => {
          return a.filename.localeCompare(b.filename);
        });
        
        setWhereMoneyGoesImages(images);
      } catch (error) {
        console.error('Error loading where money goes images:', error);
      }
    };
    
    loadWhereMoneyGoesImages();
  }, []);

  return (
    <>
    <Layout>
      {/* Hero */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center space-y-3">
          <h1 className="font-display text-4xl text-primary-foreground">Support Our Cause</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            Support SHARE's campaign on rescuing, rehabilitating, and providing animals proper home through monetary and food donations. Your help is highly appreciated!
          </p> 
        </div>
      </section>

      <div className="section-divider" />

      {/* Donation Options */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {donationOptions.map((opt, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-secondary">
                <opt.icon className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-display text-xl text-foreground">{opt.title}</h3>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={i === 0 ? handleOneTimeDonation : handleSponsorDog}
                >
                  Choose
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      {/* <section className="bg-muted py-16">
        <div className="container max-w-xl">
          <h2 className="font-display text-3xl text-center text-foreground mb-8">[Donation Form]</h2>
          <form className="space-y-4 bg-card rounded-lg p-8 shadow-sm border border-border" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">[Name]</label>
              <Input placeholder="[Your name]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">[Email]</label>
              <Input type="email" placeholder="[your@email.com]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">[Amount]</label>
              <div className="flex gap-2 flex-wrap">
                {amounts.map((a) => (
                  <Button key={a} variant="outline" size="sm" type="button">{a}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">[Message]</label>
              <Textarea placeholder="[Optional message placeholder]" />
            </div>
            <Button variant="cta" size="xl" className="w-full" type="submit">
              Submit Donation
            </Button>
          </form>
        </div>
      </section> */}

      {/* Where Your Money Goes Gallery */}
      <section className="bg-background py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-foreground mb-10">Where Your Support Goes</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {whereMoneyGoesImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleImageClick(img)}>
                <img 
                  src={img.src} 
                  alt={`Where money goes ${img.filename}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>

    {/* Donation Modal */}
    {showDonationModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl text-foreground">Choose Payment Method</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDonationModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* GCash Option */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">GCash</h4>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">GCash QR</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Number:</p>
                  <p className="text-lg font-bold text-primary">+63 917 887 6808</p>
                </div>
                <p className="text-xs text-muted-foreground">Scan QR code or send to this number</p>
              </div>
            </div>
            
            {/* BPI Option */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">BPI</h4>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">BPI QR</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Account Number:</p>
                  <p className="text-lg font-bold text-primary">1234-5678-90</p>
                </div>
                <p className="text-xs text-muted-foreground">Scan QR code for direct bank transfer</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Thank you for your generous donation!</p>
          </div>
        </div>
      </div>
    )}

    {/* Dog Gallery Modal */}
    {showDogGallery && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl text-foreground">Choose a Dog to Sponsor</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDogGallery(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allDogs.filter(dog => !dog.adopted).map((dog) => (
              <div 
                key={dog.id} 
                className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleDogSelect(dog)}
              >
                <img 
                  src={dog.image} 
                  alt={dog.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-card">
                  <h4 className="font-semibold text-foreground">{dog.name}</h4>
                  <p className="text-sm text-muted-foreground">{dog.age}</p>
                  <p className="text-sm text-muted-foreground mt-1">{dog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Dog Donation Modal */}
    {showDogDonationModal && selectedDog && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl text-foreground">Sponsor {selectedDog.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDogDonationModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <img 
              src={selectedDog.image} 
              alt={selectedDog.name}
              className="w-full h-128 object-cover rounded-lg"
            />
            <div className="text-center">
              <h4 className="font-semibold text-lg">{selectedDog.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedDog.age}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedDog.description}</p>
            </div>
          </div>
          f
          <div className="grid md:grid-cols-2 gap-6">
            {/* GCash Option */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">GCash</h4>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">GCash QR</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone Number:</p>
                  <p className="text-lg font-bold text-primary">+63 917 887 6808</p>
                </div>
                <p className="text-xs text-muted-foreground">Scan QR code or send to this number</p>
              </div>
            </div>
            
            {/* BPI Option */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-primary" />
                <h4 className="font-semibold text-lg">BPI</h4>
              </div>
              <div className="space-y-3 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">BPI QR</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Account Number:</p>
                  <p className="text-lg font-bold text-primary">1234-5678-90</p>
                </div>
                <p className="text-xs text-muted-foreground">Scan QR code for direct bank transfer</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your sponsorship will help {selectedDog.name} get the care they need!</p>
          </div>
        </div>
      </div>
    )}

    {/* Expanded Image Modal */}
    {expandedImage && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeExpandedImage}>
        <div className="relative max-w-4xl max-h-[90vh]">
          <img
            src={expandedImage.src}
            alt={`Expanded image ${expandedImage.filename}`}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            onClick={closeExpandedImage}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-gray-800" />
          </button>
        </div>
      </div>
    )}
  </>
  );
};

export default Donate;
