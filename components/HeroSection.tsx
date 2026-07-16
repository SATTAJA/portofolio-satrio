import Image from "next/image";
import React from "react";
import ScrambledText from "./ScrambledText";

function HeroSection() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="mt-50 ml-50">
          <div className="flex gap-3">
            <h1 className="text-xl font-semibold font-mono bg-purple-500 px-2 shadow-md transition-all duration-300 rounded h-full shadow-purple-700">
              Hello World!
            </h1>
            <h1 className="text-xl font-mono">My name is</h1>
          </div>
          <h1 className="text-6xl mt-2 font-semibold font-sans">Satrio Aji Kusumo</h1>

  
<ScrambledText
  className="scrambled-text-demo"
  radius={50}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:"
>
Frontend-Focused Full Stack Developer
</ScrambledText>
          
        </div>
        <div className="mr-50 mt-1 grayscale-75 hover:grayscale-0 transition-all duration-300 z-0">
          <Image
            src="/ganteng.png"
            alt="Deskripsi Gambar"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
