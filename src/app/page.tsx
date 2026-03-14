"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useStarkzap } from "@/providers/StarkzapProvider";
import { ArrowRight, Cpu, Layers, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { connect, isConnecting, address } = useStarkzap();
  const router = useRouter();
  
  // Custom cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (address) {
      router.push("/onboard");
    }
  }, [address, router]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "transparent",
      mixBlendMode: "difference" as any,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "white",
      mixBlendMode: "difference" as any,
    }
  };

  return (
    <main className="bg-black text-white min-h-screen cursor-none selection:bg-white selection:text-black font-sans">
      
      {/* Custom Cursor */}
      <motion.div
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 flex items-center justify-center"
      >
        {isHovering && <span className="text-[10px] text-black font-bold">CLICK</span>}
      </motion.div>

      {/* Grid Pattern overlay for tech feel */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full border border-white/5 opacity-50 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-white/10 opacity-30" />

        <div className="z-10 flex flex-col items-center text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter leading-none mb-6">
              STARK<span className="text-zinc-500">RAGE</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8 hidden md:block"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xl md:text-3xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto mb-16 leading-relaxed">
              Monetize computational latency. <br className="hidden md:block" />
              <span className="text-white">Make money overnight.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={connect}
              disabled={isConnecting}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative overflow-hidden bg-white text-black px-10 py-5 rounded-none font-medium text-lg tracking-widest uppercase transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-wait"
            >
              <span className="relative z-10 flex items-center gap-4">
                {isConnecting ? "Initializing Node..." : "Initialize Node"}
                {!isConnecting && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-zinc-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            </button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 font-mono text-xs uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
        </motion.div>
      </section>

      {/* Feature Section Architecture */}
      <section className="min-h-screen py-32 px-6 md:px-20 relative border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex items-baseline gap-6 border-b border-white/20 pb-8">
            <span className="text-zinc-600 font-mono text-xl">01</span>
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight">System Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
            {[
              {
                number: "001",
                title: "Hardware Agnostic",
                icon: Cpu,
                desc: "Protocol detects logical cores, memory, and local GPU renderer dynamically through pure web environments."
              },
              {
                number: "002",
                title: "Sandboxed Computation",
                icon: Layers,
                desc: "Workloads deploy inside WebAssembly & microVM containers ensuring absolute safety of the host machine."
              },
              {
                number: "003",
                title: "Micro-payment Settlement",
                icon: Zap,
                desc: "Leveraging Starknet Layer 2 rollups via StarkZap to settle sub-cent latency computations globally."
              }
            ].map((ft, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-none text-left"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                 <div className="flex border-t-2 border-transparent group-hover:border-white transition-colors duration-500 pt-6">
                    <span className="text-zinc-600 font-mono text-sm mr-auto">{ft.number}</span>
                    <ft.icon className="w-6 h-6 text-white" strokeWidth={1} />
                 </div>
                 <h3 className="text-2xl font-light mt-8 mb-4 tracking-wide">{ft.title}</h3>
                 <p className="text-zinc-400 leading-relaxed font-light text-sm">{ft.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
