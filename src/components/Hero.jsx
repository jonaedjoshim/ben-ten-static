import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Hero = () => {
  const aliens = [
    "/images/alien1.png",
    "/images/alien2.png",
    "/images/alien3.png",
    "/images/alien4.png",
    "/images/alien5.png",
    "/images/alien6.png",
  ];

  // Slider-ke infinite feel deyar jonno images repeat kora hoyeche
  const repeatedAliens = [...aliens, ...aliens, ...aliens, ...aliens];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#04703d] to-black overflow-hidden flex flex-col items-center justify-center font-orbitron">
      {/* Navbar-ta eikhane bose jabe */}
      <Navbar />

      {/* Main Slider Container */}
      <div className="w-full overflow-visible flex items-center justify-center mt-20">
        <motion.div
          className="flex gap-10 md:gap-20 cursor-grab active:cursor-grabbing px-10"
          drag="x"
          // Boundary set kora jate slider ta hariye na jay
          dragConstraints={{ left: -4000, right: 0 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {repeatedAliens.map((src, i) => (
            <motion.div
              key={i}
              className="group relative min-w-[250px] h-[350px] md:min-w-[350px] md:h-[500px] flex items-center justify-center shrink-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              {/* Background Glow Effect - UX Touch */}
              <div className="absolute inset-0 bg-[#00ff88]/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>

              {/* Alien Image with Framer Motion Hover */}
              <motion.img
                src={src}
                alt={`Alien ${i + 1}`}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,255,136,0.3)] z-10"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -2, 2, 0], // Choto ekta shake animation
                  filter: "brightness(1.2) drop-shadow(0 0 25px #00ff88)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
