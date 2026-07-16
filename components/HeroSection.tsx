import Image from "next/image";
import ScrambledText from "./ScrambledText";
import SideRays from "./SideRays";

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Hero */}
      <div className="absolute inset-0 -z-10">
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

      {/* Content */}
      <div className="container mx-auto flex min-h-screen items-center justify-between px-10 lg:px-24">
        {/* Left */}
        <div className="max-w-2xl text-white">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded bg-purple-600 px-3 py-1 font-mono text-sm shadow-lg shadow-purple-600/40">
              Hello World!
            </span>

            <span className="font-mono text-lg text-gray-300">
              My name is
            </span>
          </div>

          <h1 className="mb-4 text-6xl font-bold leading-tight lg:text-7xl">
            Satrio Aji Kusumo
          </h1>

          <div className="mb-6 text-2xl font-medium text-purple-300">
            <ScrambledText
              radius={60}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:"
            >
              Frontend-Focused Full Stack Developer
            </ScrambledText>
          </div>


        </div>

        {/* Right */}
        <div className="hidden lg:block">
          <Image
            src="/ganteng.png"
            alt="Satrio Aji Kusumo"
            width={480}
            height={600}
            priority
            className="transition duration-500 grayscale mt-30 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;