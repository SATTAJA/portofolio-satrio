"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  img: string;
}

const allSkills: Skill[] = [
  { name: "HTML", img: "/html.png" },
  { name: "CSS", img: "/css.png" },
  { name: "JavaScript", img: "/javascript.png" },
  { name: "TypeScript", img: "/typescript.png" },
  { name: "Python", img: "/python.png" },
  { name: "React", img: "/reactjs.png" },
  { name: "Next.js", img: "/nextjs.png" },
  { name: "Node.js", img: "/nodejs.png" },
  { name: "Tailwind CSS", img: "/tailwind.svg" },
  { name: "Bootstrap", img: "/bootstrap.png" },
  { name: "PostgreSQL", img: "/postgresql.png" },
  { name: "Supabase", img: "/supabase.png" },
  { name: "Prisma", img: "/prisma.png" },
  { name: "Git", img: "/git.png" },
  { name: "GitHub", img: "/github.png" },
  { name: "Vercel", img: "/vercel.png" },
  { name: "VS Code", img: "/vscode.png" },
  { name: "Windows", img: "/windows.png" },
  { name: "Android Studio", img: "/android-studio.png" },
];

const marqueeRow = [...allSkills, ...allSkills];

export default function SkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = containerRef.current?.querySelectorAll(".marquee-track");
      if (marquee) {
        gsap.fromTo(
          marquee,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="marquee-track relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <div className="marquee flex w-max gap-4">
          {marqueeRow.map((skill, i) => (
            <div
              key={`${skill.name}-m-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm"
            >
              <Image
                src={skill.img}
                alt={skill.name}
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
              <span className="font-mono text-xs font-medium text-gray-400">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
