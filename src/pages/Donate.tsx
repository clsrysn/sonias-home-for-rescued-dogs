import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CalendarHeart, Dog } from "lucide-react";

const donationOptions = [
  { icon: Heart, title: "[One-Time Donation]", description: "[Description placeholder for one-time donation option.]" },
  { icon: CalendarHeart, title: "[Monthly Support]", description: "[Description placeholder for recurring monthly support.]" },
  { icon: Dog, title: "[Sponsor a Dog]", description: "[Description placeholder for sponsoring a specific rescue dog.]" },
];

const amounts = ["$10", "$25", "$50", "$100"];

const Donate = () => {
  return (
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
                <Button variant="cta" className="w-full">Choose</Button>
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

      {/* Transparency */}
      <section className="bg-background py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-foreground mb-10">[Where Your Money Goes]</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {["[Medical Care – 40%]", "[Food & Shelter – 30%]", "[Rescue Operations – 20%]", "[Admin – 10%]"].map((item, i) => (
              <div key={i} className="rounded-lg bg-primary-deepest p-6 text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <span className="font-display text-2xl text-secondary">{(i + 1) * 10}%</span>
                </div>
                <p className="text-sm text-primary-foreground font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
