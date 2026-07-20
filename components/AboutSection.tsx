import React from "react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollRevealProps";
import SkillsGrid from "./SkillsGrid";

function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      {/* Heading */}
      <div className="mb-8 text-center font-orbitron text-2xl font-bold sm:text-4xl">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          About Me
        </ScrollFloat>
      </div>

      {/* About */}
      <div className="mx-auto mb-16 font-mono text-base leading-8 text-gray-300 sm:mb-20 sm:text-lg sm:leading-9">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
        >
          I'm Satrio Aji Kusumo, a Software and Game Development (PPLG) student
          at SMKN 8 Semarang, Indonesia, with a strong passion for software
          development. I am currently seeking an internship (PKL) to gain
          hands-on industry experience, improve my technical skills, and learn
          how professional software development teams build real-world
          applications. My primary focus is web development, where I enjoy
          creating modern, responsive, and user-friendly applications. I am
          continuously learning new technologies, building personal projects,
          and improving my problem-solving abilities to become a better
          developer every day. My goal is to grow into a professional Software
          Developer who creates reliable, scalable, and impactful digital
          solutions while continuously adapting to new technologies and industry
          best practices.
        </ScrollReveal>
      </div>

      {/* Skills */}
      <div>
        <div className="mb-10 text-center font-orbitron text-2xl font-semibold sm:mb-12 sm:text-3xl">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Skills & Tools
          </ScrollFloat>
        </div>

        <SkillsGrid />
      </div>
    </section>
  );
}

export default AboutSection;
