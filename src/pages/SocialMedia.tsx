import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Facebook, Instagram } from "lucide-react";

const SocialMedia = () => {
  const socialMediaAccounts = [
    {
      name: "Davao Animal Rescue Volunteers (DARV)",
      url: "https://www.facebook.com/davaoanimalrescuevolunteers",
      description: "Official DARV Facebook page - Main organization updates and rescue stories",
      type: "facebook"
    },
    {
      name: "Tata Geli",
      url: "https://www.facebook.com/tata.geli",
      description: "Personal Facebook page with additional rescue updates and stories",
      type: "facebook"
    },
    {
      name: "Sonia's Home Animal Rescue",
      url: "https://www.instagram.com/soniahomeanimalrescue/",
      description: "Instagram page with rescue stories, adoption updates, and daily shelter life",
      type: "instagram"
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center space-y-3">
          <h1 className="font-display text-4xl text-primary-foreground">Latest Updates</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            Follow our rescue journey through our social media channels for real-time updates, rescue stories, and heartwarming adoption tales.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Social Media Links */}
      <section className="bg-background py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">Follow Our Rescue Work</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {socialMediaAccounts.map((account, index) => (
              <div key={index} className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    account.type === 'instagram' ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-blue-100'
                  }`}>
                    {account.type === 'instagram' ? (
                      <Instagram className="h-6 w-6 text-pink-600" />
                    ) : (
                      <Facebook className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-display text-xl text-foreground">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.description}</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => window.open(account.url, '_blank', 'noopener,noreferrer')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit {account.type === 'instagram' ? 'Instagram' : 'Facebook'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Social Media Feeds */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">Recent Posts</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {socialMediaAccounts.map((account, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-display text-xl text-foreground text-center">{account.name}</h3>
                <div className="bg-card rounded-lg border border-border p-4 min-h-[500px] shadow-lg">
                  {account.type === 'instagram' ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <Instagram className="h-16 w-16 text-pink-600" />
                      <p className="text-center text-muted-foreground">
                        Visit our Instagram for the latest rescue stories and daily updates!
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => window.open(account.url, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Instagram
                      </Button>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(account.url)}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                      width="100%"
                      height="500"
                      style={{ border: 'none', overflow: 'hidden', borderRadius: '8px' }}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title={`${account.name} Facebook Feed`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground">
            Stay Connected
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">
            Your support helps us continue our rescue mission. Follow us on social media and consider making a donation to help more dogs in need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="heroCta" 
              size="xl"
              onClick={() => window.open('/donate', '_self')}
            >
              Make a Donation
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialMedia;
