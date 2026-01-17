import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "./Navbar";

const Hero = () => {
  const baseAliens = [
    "/images/alien1.png", "/images/alien2.png", "/images/alien3.png",
    "/images/alien4.png", "/images/alien5.png", "/images/alien6.png",
  ];

  const sliderRef = useRef(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  
  const [isMobile, setIsMobile] = useState(false);
  const [constraints, setConstraints] = useState(0);

  // Desktop-e loop-er jonno array boro kora, Mobile-e shudhu original list
  const aliens = isMobile ? baseAliens : [...baseAliens, ...baseAliens, ...baseAliens];
  const cardWidth = 400; // Keyboard movement er jonno base width

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (sliderRef.current) {
        // Mobile constraints calculate kora
        setConstraints(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
      }

      if (mobile) {
        x.set(0); // Mobile view-te slider reset
      } else {
        x.set(-baseAliens.length * cardWidth); // Desktop view-te center reset
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleKeyDown = (e) => {
      if (window.innerWidth < 768) return; // Mobile-e arrow keys off
      if (e.key === "ArrowRight") x.set(x.get() - cardWidth);
      if (e.key === "ArrowLeft") x.set(x.get() + cardWidth);
    };

    // Loop Reset Logic - Only for Desktop
    const unsubscribe = x.on("change", (latest) => {
      if (window.innerWidth < 768) return; 
      const resetPoint = baseAliens.length * cardWidth;
      if (latest <= -resetPoint * 2) {
        x.set(latest + resetPoint);
      } else if (latest >= 0) {
        x.set(latest - resetPoint);
      }
    });

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      unsubscribe();
    };
  }, [isMobile, constraints]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#04703d] to-black overflow-hidden flex flex-col items-center justify-center font-orbitron">
      <Navbar />

      <div className="w-full overflow-visible mt-20">
        <motion.div
          ref={sliderRef}
          style={{ x: smoothX }}
          drag="x"
          // Small device-e loop bondho korar jonno constraints deya holo
          dragConstraints={isMobile ? { right: 0, left: -constraints } : false}
          dragElastic={0.05}
          className="flex gap-10 md:gap-24 cursor-grab active:cursor-grabbing items-center px-10"
        >
          {aliens.map((src, i) => (
            <motion.div
              key={i}
              className="group relative min-w-[280px] h-[400px] md:min-w-[450px] md:h-[650px] flex items-center justify-center shrink-0"
            >
              <div className="absolute inset-0 bg-[#00ff88]/5 blur-[150px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000"></div>

              <motion.img
                src={src}
                alt="Alien DNA"
                className="w-full h-full object-contain drop-shadow-[0_20px_80px_rgba(0,0,0,0.9)] z-10"
                whileHover={{
                  scale: 1.1,
                  filter: "brightness(1.3) drop-shadow(0 0 50px #00ff88)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;