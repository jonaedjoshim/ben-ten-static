import React from "react";

const Navbar = () => {
  const navItems = ["Home", "Aliens", "Episodes", "Games", "About"];

  return (
    // Glassmorphism layer with DaisyUI navbar class
    <div className="navbar fixed top-0 z-[1000] px-4 md:px-12 backdrop-blur-md bg-black/20 font-['Orbitron']">
      {/* Navbar Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-[#00ff88]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black/90 rounded-box w-52 text-white border border-white/10 uppercase"
          >
            {navItems.map((item) => (
              <li key={item}>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className="w-24 md:w-32 cursor-pointer">
          <img src="/images/logo.png" alt="Ben 10 Logo" className="w-full" />
        </a>
      </div>

      {/* Navbar Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white gap-4 text-sm tracking-widest uppercase">
          {navItems.map((item) => (
            <li key={item}>
              <a className="hover:text-[#00ff88] transition-all focus:text-[#00ff88]">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End: Buttons */}
      <div className="navbar-end gap-3">
        <button className="btn btn-outline btn-sm md:btn-md rounded-full text-white border-white hover:bg-white hover:text-black font-bold border-2">
          LOGIN
        </button>
        <button className="btn btn-sm md:btn-md rounded-full bg-[#00ff88] border-[#00ff88] text-black hover:bg-transparent hover:text-[#00ff88] font-bold border-2">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Navbar;
