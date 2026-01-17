import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Slider = () => {
  const aliens = [
    {
      name: "Swampfire",
      img: "/images/slider4.png",
      description:
        "A methane-based alien with plant powers and the ability to ignite flames. Swampfire is covered with a tough, bark-like skin that makes him resistant to physical damage.",
      background: "from-[#0a0f2c] to-[#0d3b1f]",
      accent: "#00ff88", // Green
    },
    {
      name: "Humungousaur",
      img: "/images/slider6.png",
      description:
        "A giant dinosaur-like alien with immense strength and durability. He can increase his body size up to nearly 60 feet.",
      background: "from-[#1a0f0f] to-[#4d1a1a]",
      accent: "#ff6600", // Orange/Brown
    },
    {
      name: "Big Chill",
      img: "/images/slider1.png",
      description:
        "A moth-like alien with the power of intangibility and ice breath. Big Chill can phase through solid objects.",
      background: "from-[#0a0f2c] to-[#1e3c72]",
      accent: "#00ccff", // Blue
    },
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + aliens.length) % aliens.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % aliens.length);
  };

  // Common Button Component for Dynamic Colors
  const NavButtons = ({ className }) => (
    <div className={`flex gap-6 z-50 ${className}`}>
      <button
        onClick={handlePrev}
        style={{
          borderColor: aliens[index].accent,
          color: aliens[index].accent,
        }}
        className="btn btn-circle btn-outline hover:bg-white hover:text-black transition-all duration-300"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        style={{
          backgroundColor: aliens[index].accent,
          borderColor: aliens[index].accent,
        }}
        className="btn btn-circle text-black hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center transition-all duration-1000 bg-gradient-to-br ${aliens[index].background} font-orbitron overflow-hidden px-6 lg:px-20`}
    >
      {/* 1. Left Side: Image Container */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center order-2 lg:order-1 mt-10 lg:mt-0">
        <div className="relative w-full h-[350px] lg:h-[600px] flex justify-center items-center">
          <AnimatePresence>
            {aliens.map((alien, i) => {
              const offset = (i - index + aliens.length) % aliens.length;
              if (offset > 1 && offset < aliens.length - 1) return null;

              return (
                <motion.img
                  key={i}
                  src={alien.img}
                  alt={alien.name}
                  className="absolute w-60 lg:w-[500px] drop-shadow-[0_0_60px_rgba(0,0,0,0.6)] object-contain"
                  initial={false}
                  animate={{
                    x: offset === 0 ? 0 : offset === 1 ? 250 : -250,
                    y: offset === 0 ? 0 : offset === 1 ? -40 : 40,
                    scale: offset === 0 ? 1.25 : 0.6,
                    opacity: offset === 0 ? 1 : 0.3,
                    filter: offset === 0 ? "blur(0px)" : "blur(6px)",
                    zIndex: offset === 0 ? 20 : 10,
                  }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile View Buttons (Image-er niche) */}
        <NavButtons className="lg:hidden mt-10" />
      </div>

      {/* 2. Right Side: Info Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2 z-30 pt-20 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1
              style={{ color: aliens[index].accent }}
              className="text-5xl lg:text-8xl font-black mb-6 drop-shadow-2xl uppercase tracking-tighter italic"
            >
              {aliens[index].name}
            </h1>
            <p className="text-gray-300 text-sm lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {aliens[index].description}
            </p>

            {/* Desktop View Buttons (Description-er niche) */}
            <NavButtons className="hidden lg:flex mt-12" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] lg:text-[18rem] font-black text-white/[0.02] select-none pointer-events-none uppercase italic">
        {aliens[index].name}
      </div>
    </div>
  );
};

export default Slider;
