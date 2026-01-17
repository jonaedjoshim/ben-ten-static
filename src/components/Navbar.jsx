import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Icons gulo install na thakle 'npm i react-icons' koro

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Home", "Aliens", "Episodes", "Games", "About"];

  return (
    <nav className="absolute top-0 left-0 w-full z-[1000] px-6 py-4 md:px-12 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* 1. Logo (Left) */}
        <div className="flex-shrink-0 z-[1001]">
          <a href="/" className="cursor-pointer">
            <img src="/images/logo.png" alt="Ben 10 Logo" className="w-24 md:w-32 drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]" />
          </a>
        </div>

        {/* 2. Desktop Menu (Center - Balanced) */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex items-center gap-10 text-white font-['Orbitron'] text-[12px] tracking-[4px] uppercase font-bold">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-[#00ff88] transition-all duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#00ff88] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#00ff88]"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Desktop Auth (Right) */}
        <div className="hidden lg:flex items-center gap-6 font-['Orbitron']">
          <button className="text-white hover:text-[#00ff88] tracking-widest text-sm transition-all">LOGIN</button>
          <button className="px-8 py-2.5 rounded-full bg-[#00ff88] text-black font-black tracking-widest text-sm shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:scale-110 active:scale-95 transition-all">
            SIGN UP
          </button>
        </div>

        {/* 4. Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#00ff88] z-[1001] p-2"
        >
          {isOpen ? <HiX size={32} /> : <HiMenuAlt3 size={32} />}
        </button>
      </div>

      {/* 5. Mobile Menu Overlay (UX Focus) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80vw] max-w-[400px] bg-[#050505] border-l border-[#00ff88]/20 p-12 flex flex-col justify-center lg:hidden"
            >
              <ul className="flex flex-col items-center gap-8 text-center font-['Orbitron'] uppercase">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a 
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl text-white hover:text-[#00ff88] tracking-[6px] font-black"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent my-4" />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-4 w-full"
                >
                  <button className="py-4 border border-white/20 rounded-full text-white tracking-widest hover:border-[#00ff88]">LOGIN</button>
                  <button className="py-4 bg-[#00ff88] rounded-full text-black font-black tracking-widest shadow-[0_0_20px_rgba(0,255,136,0.3)]">SIGN UP</button>
                </motion.div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;