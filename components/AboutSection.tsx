import React from "react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollRevealProps";
import SkillsGrid from "./SkillsGrid";

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 text-white sm:px-6 sm:py-24">
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
      <div className="mx-auto mb-16 max-w-7xl font-mono text-base leading-8 text-gray-300 sm:mb-20 sm:text-lg sm:leading-9">
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
        >
          I'm Satrio Aji Kusumo, a Software Engineering student and a
          frontend-focused Full Stack Developer from Indonesia. I enjoy
          building modern web and mobile applications that combine clean
          design, intuitive user experiences, and scalable solutions. I believe
          great software is more than just writing code—it's about solving
          real-world problems and creating meaningful experiences for users.
          I'm constantly learning new technologies and challenging myself
          through real-world projects to grow as a developer.
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
