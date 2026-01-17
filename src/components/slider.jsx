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
    },
    {
      name: "Humungousaur",
      img: "/images/slider6.png",
      description:
        "A giant dinosaur-like alien with immense strength and durability. He can increase his body size up to nearly 60 feet.",
      background: "from-[#1a0f0f] to-[#4d1a1a]",
    },
    {
      name: "Big Chill",
      img: "/images/slider1.png",
      description:
        "A moth-like alien with the power of intangibility and ice breath. Big Chill can phase through solid objects.",
      background: "from-[#0a0f2c] to-[#1e3c72]",
    },
    // ... baki gulo thakbe
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + aliens.length) % aliens.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % aliens.length);
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center transition-all duration-700 bg-gradient-to-br ${aliens[index].background} font-orbitron overflow-hidden px-6 lg:px-20`}
    >
      {/* 1. Left Side: Images Section */}
      <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[600px] flex justify-center items-center order-2 lg:order-1 mt-10 lg:mt-0">
        <AnimatePresence margin={false}>
          {aliens.map((alien, i) => {
            const offset = (i - index + aliens.length) % aliens.length;

            // Logics for 3D effect
            if (offset > 1 && offset < aliens.length - 1) return null;

            return (
              <motion.img
                key={i}
                src={alien.img}
                alt={alien.name}
                className="absolute w-64 lg:w-[450px] drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                initial={false}
                animate={{
                  x: offset === 0 ? 0 : offset === 1 ? 200 : -200,
                  y: offset === 0 ? 0 : offset === 1 ? -50 : 50,
                  scale: offset === 0 ? 1.2 : 0.7,
                  opacity: offset === 0 ? 1 : 0.4,
                  filter: offset === 0 ? "blur(0px)" : "blur(4px)",
                  zIndex: offset === 0 ? 20 : 10,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* 2. Right Side: Info Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-7xl font-black text-[#00ff88] mb-6 drop-shadow-lg uppercase tracking-tighter">
              {aliens[index].name}
            </h1>
            <p className="text-gray-300 text-sm lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {aliens[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 3. Navigation Buttons (DaisyUI styled) */}
        <div className="flex gap-4 mt-10 justify-center lg:justify-start">
          <button
            onClick={handlePrev}
            className="btn btn-circle btn-outline border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:border-[#00ff88] hover:text-black"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="btn btn-circle bg-[#00ff88] border-[#00ff88] text-black hover:bg-transparent hover:text-[#00ff88] hover:border-[#00ff88]"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Decorative Background Text (UX Touch) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.03] select-none pointer-events-none uppercase">
        {aliens[index].name}
      </div>
    </div>
  );
};

export default Slider;
