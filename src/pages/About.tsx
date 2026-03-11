import Layout from "@/components/layout/Layout";
import { Heart, Target, Users } from "lucide-react";
import rescueTeam from "@/assets/rescue-team.jpg";

// const milestones = [
//   { year: "2009", label: "Founded" },
//   { year: "2020", label: "100 Dogs Rescued" }, // TO DO
//   { year: "2023", label: "New Shelter Opened" }, // TO DO
//   { year: "2025", label: "3000+ Adoptions" }, 
// ];

// const team = [
//   { image: kool, name: "[Team Member 1]", role: "[Role Placeholder]" },
//   { image: mapua, name: "[Team Member 2]", role: "[Role Placeholder]" },
//   { image: poypoy, name: "[Team Member 3]", role: "[Role Placeholder]" },
// ];

const values = [
  { icon: Heart, title: "A 'No-Kill' Shelter", text: "Through the promotion of spaying/neuter services, we strives to ensure animals are saved, treating every life as important." },
  { icon: Target, title: "Rehabillitation", text: "We provide a nurturing environment for abused and abandoned animals." },
  { icon: Users, title: "Community", text: "We hope to serve as many stray, abandoned, and abused animals within Davao City and involve as many Dabawenyos to open their eyes to be more compassionate and empathetic to the voiceless in need. " },
];

const About = () => {
  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center">
          <h1 className="font-display text-4xl text-primary-foreground">About SHARE</h1>
        </div>
      </section>

      <div className="section-divider" />

      {/* Story */}
      <section className="bg-background py-16">
        <div className="container grid gap-10 md:grid-cols-2 items-center">
          <img
            src={rescueTeam}
            alt="Rescue team"
            className="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
          />
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-foreground">Sonia's Home for Animal Rescue</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sonia's Home for Animal Rescue (SHARE), also known as Davao Animal Rescue Volunteers (DARV), was founded by Sonia Geli in 2009. The shelter began as a simple act of kindness—an act aiming to help find new homes for stray and abandoned dogs. What started as a small gesture, helping a small community, turned to a sustainable advocacy, bringing communities sharing the same values and advocacies together—united by the desire on building a safer home for stray, abandoned, and abused animals. Through years of commitment and volunteer collaboration, DARV is finally recognized as a permanent animal shelter in 2023. Located in Purok 7, Alambre, Toril, Davao City, the shelter stands 6,000-square meter lot, donated by the founder's husband.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Since its founding, the DARV/SHARE has rescued and cared for over 3,000 dogs. As of 2025, 142 rescue dogs are cohabiting in the shelter. To ensure its mission and accountability, the shelter is registered with the Securities and Exchange Commission (SEC). From 2009, Sonia's Home for Animal Rescue has made its way from providing temporary homes to animals in distress, to advocating the movement at a large audience at the present moment. What started as small acts of kindness became a campaign for a bigger issue that still prevails today.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">SHARE's Journey]</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2" />
            <div className="grid gap-6 md:grid-cols-4">
              {milestones.map((m, i) => (
                <div key={i} className="relative text-center space-y-2">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm relative z-10">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg text-foreground">{m.year}</h3>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>   */}

      {/* Values */}
      <section className="bg-primary-deepest py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-primary-foreground mb-10">Vision & Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={i} className="rounded-lg bg-primary p-6 text-center space-y-3">
                <v.icon className="h-10 w-10 text-secondary mx-auto" />
                <h3 className="font-display text-xl text-primary-foreground">{v.title}</h3>
                <p className="text-sm text-primary-foreground/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
