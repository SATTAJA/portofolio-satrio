"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GithubLogo, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import ProjectPreview from "@/components/ProjectPreview";
import { projects, type Project } from "@/lib/projects";
import type { MouseEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

const statusColor: Record<Project["status"], string> = {
  LIVE: "bg-emerald-500",
  "IN PROGRESS": "bg-amber-500",
  "COMING SOON": "bg-gray-500",
};

export default function ProjectsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>, index: number) => {
      const card = tiltRefs.current[index];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
      });

      const glow = card.querySelector(".cursor-glow") as HTMLElement;
      if (glow) {
        glow.style.background = `radial-gradient(circle 250px at ${x}px ${y}px, rgba(168,85,247,0.12), transparent)`;
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (_e: MouseEvent<HTMLDivElement>, index: number) => {
      const card = tiltRefs.current[index];
      if (!card) return;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      const glow = card.querySelector(".cursor-glow") as HTMLElement;
      if (glow) glow.style.background = "transparent";
    },
    [],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-20 text-white sm:px-6 sm:pt-32">
        {/* ── Header ────────────────────────────── */}
        <div className="mb-12 sm:mb-16">
          <Link
            href="/#project"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-xs text-gray-400 transition-all duration-300 hover:border-purple-500/30 hover:text-white"
          >
            <ArrowLeft size={13} />
            Back
          </Link>

          <h1 className="mt-6 font-orbitron text-3xl font-bold sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-3 max-w-md font-mono text-sm text-gray-500">
            {projects.length} projects — built with passion and modern tech.
          </p>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from(new Set(projects.map((p) => p.category))).map(
              (cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] font-medium text-gray-400"
                >
                  {cat}
                </span>
              ),
            )}
          </div>
        </div>

        {/* ── Grid ──────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                tiltRefs.current[i] = el;
              }}
              className="project-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015]"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={(e) => handleMouseLeave(e, i)}
            >
              {/* Cursor glow */}
              <div className="cursor-glow pointer-events-none absolute inset-0 z-0" />

              {/* Animated gradient border */}
              <div className="absolute -top-px -left-px -right-px h-[1px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              <div className="relative z-10">
                {/* ── Preview ─────────────────── */}
                <ProjectPreview
                  project={project}
                  className="aspect-[16/10]"
                />

                {/* ── Info ────────────────────── */}
                <div className="p-5 sm:p-6">
                  {/* Status row */}
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusColor[project.status]}`}
                    />
                    <span className="font-mono text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-orbitron text-base font-bold text-white transition-colors duration-300 group-hover:text-purple-300 sm:text-lg">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 font-mono text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-medium text-gray-400"
                      >
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: t.color }}
                        />
                        {t.name}
                      </span>
                    ))}
                  </div>

                  {/* Bottom links */}
                  <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-3.5">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400"
                      >
                        <ArrowUpRight size={12} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-gray-500 transition-colors duration-300 hover:text-purple-400"
                      >
                        <GithubLogo size={12} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
