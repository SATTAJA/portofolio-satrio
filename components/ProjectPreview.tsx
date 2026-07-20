"use client";

import { useState, useCallback } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import type { Project } from "@/lib/projects";

interface ProjectPreviewProps {
  project: Project;
  className?: string;
  size?: "large" | "small";
}

export default function ProjectPreview({
  project,
  className = "",
  size = "small",
}: ProjectPreviewProps) {
  const [iframeFailed, setIframeFailed] = useState(false);

  const handleIframeError = useCallback(() => {
    setIframeFailed(true);
  }, []);

  const showIframe = project.previewUrl && !iframeFailed;
  const hasLive = project.liveUrl && project.liveUrl !== "#";
  const hasGithub = project.githubUrl && project.githubUrl !== "#";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient background (always rendered, behind iframe) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:20px_20px]" />

      {/* Orb */}
      <div
        className="absolute right-1/4 bottom-1/4 rounded-full opacity-20 blur-[70px] transition-all duration-1000 group-hover:scale-150 group-hover:opacity-30"
        style={{
          backgroundColor: project.orbColor,
          width: size === "large" ? "200px" : "140px",
          height: size === "large" ? "200px" : "140px",
        }}
      />

      {/* Number watermark */}
      <div
        className={`absolute top-3 right-4 font-orbitron font-black text-white/[0.04] leading-none select-none ${
          size === "large" ? "text-8xl lg:text-9xl" : "text-7xl"
        }`}
      >
        {project.number}
      </div>

      {/* Iframe preview */}
      {showIframe && (
        <>
          {/* Browser chrome */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 bg-white/[0.06] px-3 py-2 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
              <span className="h-2 w-2 rounded-full bg-green-400/60" />
            </div>
            <div className="flex-1 truncate rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] text-gray-400">
              {project.previewUrl}
            </div>
          </div>

          {/* Iframe */}
          <iframe
            src={project.previewUrl}
            title={project.title}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            onError={handleIframeError}
            className="absolute inset-0 h-full w-full border-0"
            style={{
              top: "32px",
              height: "calc(100% - 32px)",
              pointerEvents: "none",
              transform: "scale(1)",
              transformOrigin: "top left",
            }}
          />
        </>
      )}

      {/* Fallback when no previewUrl or iframe failed */}
      {(!project.previewUrl || iframeFailed) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className={`mb-2 transition-transform duration-700 group-hover:scale-110 ${
              size === "large" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
            }`}
          >
          </span>
          <span className="font-orbitron text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
            {project.category}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
        {hasLive && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-[11px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={13} />
            Live Demo
          </a>
        )}
        {hasGithub && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-[11px] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubLogo size={13} />
            Source
          </a>
        )}
      </div>
    </div>
  );
}
