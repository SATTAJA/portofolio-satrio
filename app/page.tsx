import AnimatedContent from "@/components/AnimatedContent";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SideRays from "@/components/SideRays";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <SideRays
          rayColor1="#7C3AED"
          rayColor2="#a87ef1"
          origin="top-right"
          speed={2.5}
          intensity={2}
          spread={10}
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>

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
        <div className="relative z-10 text-white">
          <Navbar />
        </div>
      </AnimatedContent>

      <HeroSection />
    </main>
  );
}
