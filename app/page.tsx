import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <SmoothScroll />

      <Navbar />

      <HeroSection />

      <AboutSection />
    </main>
  );
}