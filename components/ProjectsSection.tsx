"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import ScrollFloat from "./ScrollFloat";
import ProjectPreview from "./ProjectPreview";
import { projects, type Project } from "@/lib/projects";
import type { MouseEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

const statusColor: Record<Project["status"], string> = {
  LIVE: "bg-emerald-500",
  "IN PROGRESS": "bg-amber-500",
  "COMING SOON": "bg-gray-500",
};

interface ProjectsSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function ProjectsSection({
  limit,
  showViewAll = false,
}: ProjectsSectionProps) {
  const displayed = useMemo(
    () => (limit ? projects.slice(0, limit) : projects),
    [limit],
  );

  const hasMore = limit ? projects.length > limit : false;

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
        glow.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(168,85,247,0.12), transparent)`;
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
        { opacity: 0, y: 100, rotateX: 8, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: 0.15, from: "start" },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project"
      className="mx-auto max-w-7xl px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      {/* ── Heading ──────────────────────────────── */}
      <div className="mb-12 text-center sm:mb-16">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          My Projects
        </ScrollFloat>
        <p className="mx-auto mt-4 max-w-md font-mono text-sm text-gray-500">
          A selection of projects I&apos;ve built — from full-stack apps to
          AI-powered tools.
        </p>
      </div>

      {/* ── Projects ─────────────────────────────── */}
      <div ref={gridRef} className="space-y-6">
        {displayed.map((project, i) => {
          const isFeatured = i === 0;
          return (
            <div
              key={project.title}
              ref={(el) => {
                tiltRefs.current[i] = el;
              }}
              className="project-card group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015]"
              style={{ transformStyle: "preserve-3d" }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={(e) => handleMouseLeave(e, i)}
            >
              {/* Cursor glow */}
              <div className="cursor-glow pointer-events-none absolute inset-0 z-0" />

              {/* Animated gradient border on hover */}
              <div className="absolute -top-px -left-px -right-px h-[1px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              <div className="relative z-10 flex flex-col lg:flex-row">
                {/* ── Preview Panel ──────────────────── */}
                <ProjectPreview
                  project={project}
                  size={isFeatured ? "large" : "small"}
                  className={`relative ${
                    isFeatured
                      ? "aspect-video lg:aspect-auto lg:w-3/5"
                      : "aspect-video lg:aspect-auto lg:w-2/5"
                  }`}
                />

                {/* ── Info Panel ─────────────────────── */}
                <div
                  className={`flex flex-col justify-between p-6 sm:p-8 ${
                    isFeatured ? "lg:w-2/5" : "lg:w-3/5"
                  }`}
                >
                  <div>
                    {/* Top row: number + status */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-orbitron text-sm font-bold text-white/20">
                        {project.number}
                      </span>
                      <span className="h-px flex-1 bg-white/[0.06]" />
                      <span className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusColor[project.status]}`}
                        />
                        <span className="text-gray-400">{project.status}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-orbitron text-xl font-bold text-white transition-colors duration-300 group-hover:text-purple-300 sm:text-2xl">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 max-w-lg font-mono text-sm leading-relaxed text-gray-400">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t.name}
                          className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] font-medium text-gray-300 transition-all duration-300 hover:border-white/[0.15] hover:text-white"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom action row */}
                  <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-5">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-xs font-medium text-gray-400 transition-colors duration-300 hover:text-purple-400"
                      >
                        <ArrowUpRight size={14} />
                        View Live
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-mono text-xs font-medium text-gray-400 transition-colors duration-300 hover:text-purple-400"
                      >
                        <GithubLogo size={14} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── View All Link ────────────────────────── */}
      {showViewAll && hasMore && (
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="group/link inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-3.5 font-orbitron text-sm font-medium text-gray-300 transition-all duration-500 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
