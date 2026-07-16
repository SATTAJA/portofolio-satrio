import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div>
      <div className="flex justify-center gap-20 p-7 font-orbitron text-medium z-100">
        <button
          className="relative pb-2 hover:cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          <h1>HOME</h1>
        </button>
        <button className="relative pb-2 hover:cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
          <h1>ABOUT</h1>
        </button>
        <button className="relative pb-2 hover:cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
          <h1>PROJECT</h1>
        </button>
        <button className="relative pb-2 hover:cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100">
          <h1>CONTACT</h1>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
