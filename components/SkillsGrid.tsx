"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileHtml,
  FileCss,
  FileJs,
  FileTs,
  FilePy,
  FileTsx,
  PaintBrush,
  Lightning,
  Database,
  GitBranch,
  GithubLogo,
  Cloud,
  Code,
  Cylinder,
  WindowsLogo,
  AndroidLogo,
  Terminal,
  type IconProps,
} from "@phosphor-icons/react";
import type { FunctionComponent, MouseEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: FunctionComponent<IconProps>;
  color: string;
  featured?: boolean;
  span?: string;
}

const allSkills: Skill[] = [
  { name: "HTML", icon: FileHtml, color: "#E34F26" },
  { name: "CSS", icon: FileCss, color: "#1572B6" },
  { name: "JavaScript", icon: FileJs, color: "#F7DF1E", featured: true, span: "col-span-1 row-span-1 md:col-span-2 md:row-span-2" },
  { name: "TypeScript", icon: FileTs, color: "#3178C6", featured: true, span: "col-span-1 row-span-1 md:col-span-2" },
  { name: "Python", icon: FilePy, color: "#3776AB" },
  { name: "React", icon: FileTsx, color: "#61DAFB", featured: true, span: "col-span-1 row-span-1 md:col-span-2 md:row-span-2" },
  { name: "Next.js", icon: Lightning, color: "#FFFFFF", featured: true, span: "col-span-1 row-span-1 md:col-span-2" },
  { name: "Node.js", icon: Terminal, color: "#339933" },
  { name: "Tailwind CSS", icon: PaintBrush, color: "#06B6D4" },
  { name: "Bootstrap", icon: PaintBrush, color: "#7952B3" },
  { name: "PostgreSQL", icon: Database, color: "#4169E1" },
  { name: "Supabase", icon: Cloud, color: "#3ECF8E" },
  { name: "Prisma", icon: Cylinder, color: "#A855F7" },
  { name: "Git", icon: GitBranch, color: "#F05032" },
  { name: "GitHub", icon: GithubLogo, color: "#FFFFFF" },
  { name: "Vercel", icon: Cloud, color: "#FFFFFF" },
  { name: "VS Code", icon: Code, color: "#007ACC" },
  { name: "Windows", icon: WindowsLogo, color: "#00ADEF" },
  { name: "Android Studio", icon: AndroidLogo, color: "#3DDC84" },
];

const marqueeRow = [...allSkills, ...allSkills];

export default function SkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = tiltRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(168,85,247,0.15), transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback((_e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = tiltRefs.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) glow.style.background = "transparent";
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = bentoRef.current?.querySelectorAll(".bento-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.92, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: { each: 0.06, from: "start" },
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

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
    <div ref={containerRef} className="space-y-12">
      {/* ── Marquee ─────────────────────────────── */}
      <div className="marquee-track relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <div className="marquee flex w-max gap-4">
          {marqueeRow.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={`${skill.name}-m-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 backdrop-blur-sm"
              >
                <Icon size={18} weight="duotone" style={{ color: skill.color }} />
                <span className="font-mono text-xs font-medium text-gray-400">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      
    </div>
  );
}
