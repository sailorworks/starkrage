"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStarkzap } from "@/providers/StarkzapProvider";
import { Cpu, HardDrive, Monitor, Loader2, Check, TerminalSquare } from "lucide-react";

export default function OnboardPage() {
  const { address } = useStarkzap();
  const router = useRouter();
  
  const [isScanning, setIsScanning] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specs, setSpecs] = useState({
    cpuCores: "",
    ram: "",
    gpu: "",
    storage: "500",
  });

  // Custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
       if (!address) router.push("/");
    }, 1000);
    return () => clearTimeout(timer);
  }, [address, router]);

  useEffect(() => {
    const scanHardware = async () => {
      let cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "Unknown";
      let ram = (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB+` : "Unknown";
      let gpu = "Generic Default Graphics";

      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            gpu = renderer.replace(/ANGLE \(|\)|\sDirect3D.*/g, '').trim();
          }
        }
      } catch (e) {
        console.warn("GPU WebGL scan failed", e);
      }

      setSpecs((prev) => ({ ...prev, cpuCores: cores, ram, gpu }));
      setTimeout(() => setIsScanning(false), 2500);
    };

    scanHardware();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-6 relative bg-black cursor-none">
      <motion.div
        variants={variants}
        animate="default"
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 flex items-center justify-center"
      />
      
      <div className="absolute inset-0 tech-pattern -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl minimal-panel p-8 relative border-white/20"
      >
        {isScanning ? (
          <div className="flex flex-col py-12">
            <div className="flex items-center gap-4 mb-8">
               <TerminalSquare className="w-8 h-8 text-white animate-pulse" />
               <h2 className="text-xl font-display uppercase tracking-widest text-white">Hardware Audit</h2>
            </div>
            
            <div className="font-mono text-sm text-zinc-500 mb-6 space-y-2">
               <p>&gt; Scanning local environment bounds...</p>
               <p>&gt; Evaluating WebGL Context...</p>
               <p>&gt; Estimating Thread Concurrency...</p>
               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 0.5 }}>_</motion.p>
            </div>
            
            <div className="w-full bg-zinc-900 h-1 mt-4 overflow-hidden relative">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.3, ease: "linear" }}
                 className="h-full bg-white absolute top-0 left-0"
               />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
               <div>
                  <h2 className="text-xl font-display uppercase tracking-widest">Node Provisioning</h2>
                  <p className="text-zinc-500 text-xs font-mono mt-1">Audit Complete. Confirm specs.</p>
               </div>
               <div className="h-8 w-8 border border-white flex items-center justify-center">
                 <Check className="h-4 w-4 text-white" />
               </div>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-px bg-white/10 border border-white/10">
                  <div className="bg-black p-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-500 uppercase flex items-center gap-2">
                       <Cpu className="w-4 h-4 text-white" /> Threads
                    </span>
                    <span className="text-sm font-medium text-white">{specs.cpuCores}</span>
                  </div>
                  
                  <div className="bg-black p-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-500 uppercase flex items-center gap-2">
                       <MemoryIcon className="w-4 h-4 text-white" /> Memory
                    </span>
                    <span className="text-sm font-medium text-white">{specs.ram}</span>
                  </div>
                  
                  <div className="bg-black p-4 flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-500 uppercase flex items-center gap-2">
                       <Monitor className="w-4 h-4 text-white" /> Graphics
                    </span>
                    <span className="text-sm font-medium text-white truncate max-w-[200px] text-right">{specs.gpu}</span>
                  </div>
                </div>

                <div className="pt-6">
                   <label className="block text-xs font-mono text-zinc-500 uppercase mb-3 flex items-center gap-2">
                     <HardDrive className="h-4 w-4 text-white" /> Allocated Storage (GB)
                   </label>
                   <input 
                     type="number" 
                     value={specs.storage}
                     onChange={(e) => setSpecs({...specs, storage: e.target.value})}
                     className="w-full bg-black border border-white/20 focus:border-white p-4 text-white font-mono text-lg outline-none transition-colors rounded-none"
                     required
                   />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold font-mono uppercase tracking-widest py-4 transition-all disabled:opacity-50 disabled:cursor-wait hover:bg-zinc-200 mt-6"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Node"}
                </button>
             </form>
          </div>
        )}
      </motion.div>
    </main>
  );
}

function MemoryIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M6 18h12v-10h-12v10z"/><path d="M2 10h2"/><path d="M2 14h2"/><path d="M20 10h2"/><path d="M20 14h2"/></svg>
  );
}
