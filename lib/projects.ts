export interface Project {
  number: string;
  title: string;
  description: string;
  tech: { name: string; color: string }[];
  /** URL website live, kosongkan jika belum ada */
  liveUrl?: string;
  /** URL repository GitHub, kosongkan jika belum ada */
  githubUrl?: string;
  /** URL untuk preview iframe, kosongkan jika tidak ada */
  previewUrl?: string;
  gradient: string;
  orbColor: string;
  status: "LIVE" | "IN PROGRESS" | "COMING SOON";
  category: string;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Sinergi Laundry",
    description:
      "SinergiLaundry is a modern laundry service website that enables customers to browse services, view transparent pricing, book laundry pickups online by whatsaap.",
    tech: [
      { name: "Next.js", color: "#FFFFFF" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind", color: "#06B6D4" },
    ],
    liveUrl: "https://sinergilaundry.strio.my.id/",
    githubUrl: "https://github.com/SATTAJA/SinergiLaundry",
    previewUrl: "https://sinergilaundry.strio.my.id/",
    gradient: "from-violet-600/40 via-purple-600/20 to-fuchsia-600/10",
    orbColor: "#8B5CF6",
    status: "LIVE",
    category: "Website",
  },
  {
    number: "02",
    title: "Cashify Mobile App",
    description:
      "Cashify is a mobile personal finance management application designed to simplify expense tracking and budgeting. Developed with React Native, Expo, TypeScript, NativeWind, and Supabase, focusing on performance, scalability, and user experience.",
    tech: [
      { name: "React Native", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Node.js", color: "#339933" },
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Tailwind", color: "#06B6D4" },
    ],
    liveUrl: "",
    githubUrl: "https://github.com/example/taskapp",
    previewUrl: "",
    gradient: "from-cyan-600/40 via-emerald-600/20 to-teal-600/10",
    orbColor: "#06B6D4",
    status: "LIVE",
    category: "Mobile App",
  },
];
