import AboutSection from "@/components/AboutSection";
import AnimatedContent from "@/components/AnimatedContent";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-hidden overflow-x-hidden bg-black">
      {/* Navbar */}
      <Navbar />

        <HeroSection />

        <AboutSection />

    </main>
  );
}