import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CalendarHeart, Dog, X } from "lucide-react";
import { useState, useEffect } from "react";
import { allDogs } from "@/data/dogs";

// Manual imports for where money goes images
import img1 from "@/assets/where_money_goes/1.jpg";
import img2 from "@/assets/where_money_goes/2.jpg";
import img3 from "@/assets/where_money_goes/3.jpg";
import img4 from "@/assets/where_money_goes/4.jpg";
import img5 from "@/assets/where_money_goes/5.jpg";

const donationOptions = [
  { icon: Heart, title: "[One-Time Donation]", description: "[Description placeholder for one-time donation option.]" },
  { icon: CalendarHeart, title: "[Monthly Support]", description: "[Description placeholder for recurring monthly support.]" },
  { icon: Dog, title: "[Sponsor a Dog]", description: "[Description placeholder for sponsoring a specific rescue dog.]" },
];

const amounts = ["$10", "$25", "$50", "$100"];

// Base images array - add new imports here as needed
const baseImages = [img1, img2, img3, img4, img5];

// Function to generate image objects with order
const generateWhereMoneyGoesImages = () => {
  return baseImages.map((src, index) => ({
    src,
    order: index + 1,
    filename: `${index + 1}`
  }));
};

const Donate = () => {
  const [showGcashModal, setShowGcashModal] = useState(false);
  const [showDogGallery, setShowDogGallery] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [showDogDonationModal, setShowDogDonationModal] = useState(false);
  const [whereMoneyGoesImages, setWhereMoneyGoesImages] = useState(generateWhereMoneyGoesImages());

  const handleOneTimeDonation = () => {
    setShowGcashModal(true);
  };

  const handleMonthlySupport = () => {
    setShowGcashModal(true);
  };

  const handleSponsorDog = () => {
    setShowDogGallery(true);
  };

  const handleDogSelect = (dog) => {
    setSelectedDog(dog);
    setShowDogGallery(false);
    setShowDogDonationModal(true);
  };

  return (
    <>
    <Layout>
      {/* Hero */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center space-y-3">
          <h1 className="font-display text-4xl text-primary-foreground">[Make a Difference]</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            [Emotional statement placeholder – Your support helps us rescue, rehabilitate, and rehome dogs in need.]
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Donation Options */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {donationOptions.map((opt, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-secondary">
                <opt.icon className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-display text-xl text-foreground">{opt.title}</h3>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
                <Button 
                  variant="cta" 
                  className="w-full"
                  onClick={i === 0 ? handleOneTimeDonation : i === 1 ? handleMonthlySupport : handleSponsorDog}
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
          <h2 className="font-display text-3xl text-foreground mb-10">[Where Your Money Goes]</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {whereMoneyGoesImages.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={img.src} 
                  alt={`Where money goes ${img.filename}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>

    {/* GCash Modal */}
    {showGcashModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl text-foreground">Donate via GCash</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowGcashModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4 text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">QR Code Placeholder</span>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Phone Number:</p>
              <p className="text-lg text-primary">+63 912 345 6789</p>
            </div>
            <p className="text-sm text-muted-foreground">Scan the QR code or send payment to the number above</p>
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
        <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl text-foreground">Donate to {selectedDog.name}</h3>
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
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="space-y-2 text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">QR Code Placeholder</span>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Phone Number:</p>
                <p className="text-lg text-primary">+63 912 345 6789</p>
              </div>
              <p className="text-sm text-muted-foreground">Your donation will help {selectedDog.name} get the care they need</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Donate;
