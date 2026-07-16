import AboutSection from "@/components/AboutSection";
import AnimatedContent from "@/components/AnimatedContent";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-hidden bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse
        duration={2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0}
      >
        <HeroSection />
      </AnimatedContent>

        <AboutSection />

    </main>
  );
}