"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

function Navbar() {
  const navItems = ["HOME", "ABOUT", "PROJECT", "CONTACT"];
  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[9999]">
      {/* Desktop Navbar - lg and up */}
      <div className="hidden justify-center py-6 lg:flex">
        <div className="flex items-center gap-16 rounded-full border border-white/10 bg-black/40 px-10 py-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`group relative pb-2 font-orbitron text-sm font-medium tracking-widest transition-colors duration-300 hover:cursor-pointer ${
                active === item
                  ? "text-purple-500"
                  : "text-white hover:text-purple-500"
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

      {/* Mobile Navbar - below lg */}
      <div className="flex items-center justify-between px-4 py-4 lg:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition-colors hover:text-purple-500"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <List size={20} />}
        </button>

        {/* Mobile Logo/Brand */}
        <span className="font-orbitron text-sm font-medium tracking-widest text-white">
          PORTFOLIO
        </span>

        {/* Spacer for symmetry */}
        <div className="w-10" />
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActive(item);
                setMobileOpen(false);
              }}
              className={`rounded-xl px-4 py-3 text-left font-orbitron text-sm font-medium tracking-widest transition-colors duration-300 hover:cursor-pointer ${
                active === item
                  ? "bg-purple-500/10 text-purple-500"
                  : "text-white hover:bg-white/5 hover:text-purple-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
