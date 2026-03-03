import Layout from "@/components/layout/Layout";
import { Heart, Target, Users } from "lucide-react";
import rescueTeam from "@/assets/rescue-team.png";
import kool from "@/assets/kool.jpg";
import mapua from "@/assets/mapua.jpg";
import poypoy from "@/assets/poypoy.jpg";

const milestones = [
  { year: "2009", label: "Founded" },
  { year: "2020", label: "100 Dogs Rescued" },
  { year: "2023", label: "New Shelter Opened" },
  { year: "2025", label: "500+ Adoptions" },
];

// const team = [
//   { image: kool, name: "[Team Member 1]", role: "[Role Placeholder]" },
//   { image: mapua, name: "[Team Member 2]", role: "[Role Placeholder]" },
//   { image: poypoy, name: "[Team Member 3]", role: "[Role Placeholder]" },
// ];

const values = [
  { icon: Heart, title: "[Compassion]", text: "[Value description placeholder]" },
  { icon: Target, title: "[Dedication]", text: "[Value description placeholder]" },
  { icon: Users, title: "[Community]", text: "[Value description placeholder]" },
];

const About = () => {
  return (
    <Layout>
      {/* Banner */}
      <section className="bg-primary-deepest py-14">
        <div className="container text-center">
          <h1 className="font-display text-4xl text-primary-foreground">[About Us]</h1>
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
            <h2 className="font-display text-3xl text-foreground">[Our Story]</h2>
            <p className="text-muted-foreground leading-relaxed">
              [Story placeholder paragraph 1 – How the organization was founded and its early days of rescuing dogs.]
            </p>
            <p className="text-muted-foreground leading-relaxed">
              [Story placeholder paragraph 2 – Growth, achievements, and current operations.]
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-foreground mb-10">[Our Journey]</h2>
          <div className="relative">
            {/* Line */}
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
      </section>  

      {/* Values */}
      <section className="bg-primary-deepest py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-center text-primary-foreground mb-10">[Vision & Values]</h2>
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
