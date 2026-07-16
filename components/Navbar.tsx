"use client";

import { useState } from "react";

function Navbar() {
  const navItems = ["HOME", "ABOUT", "PROJECT", "CONTACT"];
  const [active, setActive] = useState("HOME");

  return (
    <nav className="fixed inset-x-0 top-0 z-[9999]">
      <div className="flex justify-center py-6">
        <div className="flex items-center gap-16 rounded-full border border-white/10 bg-black/40 px-10 py-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`group relative pb-2 font-orbitron text-sm font-medium tracking-widest transition-colors duration-300 ${
                active === item
                  ? "text-purple-400"
                  : "text-white hover:text-purple-400"
              }`}
            >
              {item}

              {/* Hover Border */}
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-purple-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />

              {/* Active Border */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-purple-500 transition-opacity duration-300 ${
                  active === item ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;