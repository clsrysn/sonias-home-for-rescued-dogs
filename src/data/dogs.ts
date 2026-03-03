import kool from "@/assets/dogs/kool.jpg";
import mapua from "@/assets/dogs/mapua.jpg";
import poypoy from "@/assets/dogs/poypoy.jpg";
import maxx from "@/assets/dogs/maxx.jpg";

export interface Dog {
  id: string;
  image: string;
  name: string;
  age: string;
  description: string;
  adopted?: boolean;
  category?: string;
  photos: string[];
}

export const allDogs = [
  {
    id: "kool",
    image: kool,
    name: "Kool",
    age: "[Adult]",
    description: "A sweet and playful pup.",
    category: "Puppies",
    photos: [kool, mapua, poypoy, maxx],
    background: "Kool was found wandering near a local market. He is a very sweet boy looking for his forever home.",
    personality: "High energy, loves to play fetch, and gets along well with other dogs.",
    medical: "Fully vaccinated and dewormed. Not yet neutered.",
    adoptionDetails: "Standard adoption fee applies. Home check required."
  },
  {
    id: "mapua",
    image: mapua,
    name: "Mapua",
    age: "[Adult]",
    description: "A calm and gentle adult dog.",
    category: "Adults",
    photos: [mapua, kool, maxx],
    background: "Mapua is a rescue from near Mapua Malayan College Matina. Witnesses reported the dog fell from a pick-up vehicle in the early hours of the morning. Despite posting regarding the lost dog for 6 months, no one claimed her. It is suspected that the fall was intentional abandonment as no one ever looked for her.",
    personality: "A resilient soul who has overcome abandonment. She is calm and looking for loyalty.",
    medical: "General check-up completed. Vaccinated and dewormed.",
    adoptionDetails: "Standard adoption fee applies. Needs a secure home."
  },
  {
    id: "poypoy",
    image: poypoy,
    name: "Poypoy",
    age: "[Adult]", // Changed to Adult based on 2019 timeline
    description: "A resilient survivor.",
    category: "Adults",
    photos: [poypoy, kool, mapua],
    background: "Poypoy was rescued from Lubogan Toril in 2019. His previous owner sought help due to a massive lump on his neck. After being brought to the vet, it was diagnosed as a Lipoma Tumor. He was operated on by Doc Nielsen Donato of the 'Born to Be Wild' GMA TV Program, removing a tumor weighing almost 4 kls. After the surgery, his owner surrendered him as they could no longer care for him.",
    personality: "Incredibly brave and patient despite his medical history.",
    medical: "Fully recovered from Lipoma Tumor surgery. Up to date on all shots.",
    adoptionDetails: "Standard adoption fee applies. Home check required."
  },
  {
    id: "maxx",
    image: maxx,
    name: "Maxx",
    age: "[Adult]",
    description: "A loyal companion.",
    category: "Adults",
    photos: [maxx, kool, mapua, poypoy],
    background: "Maxx is a rescue from in front of Maxx Hardware Maa branch. He was found lying in an alley, starving, and extremely thin with almost no hair. Upon rescue, he was diagnosed with a kidney problem and Mange (skin disease).",
    personality: "His energy and spirit have returned. He is grateful and lively.",
    medical: "Treated for kidney problems and Mange for 2 months. He has fully recovered, gained weight, and his hair has grown back.",
    adoptionDetails: "Standard adoption fee applies. Home check required."
  },
];