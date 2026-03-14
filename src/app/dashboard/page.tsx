"use client";

import { useEffect, useState } from "react";
import { useStarkzap } from "@/providers/StarkzapProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, ActivitySquare } from "lucide-react";

export default function DashboardPage() {
  const { address } = useStarkzap();
  const router = useRouter();
  
  const [earnedStrk, setEarnedStrk] = useState(0.0000000);
  const [logs, setLogs] = useState<{id: number, text: string, time: string}[]>([]);
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
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  useEffect(() => {
    if (!address) return;

    const earnInterval = setInterval(() => {
      setEarnedStrk((prev) => prev + (Math.random() * 0.00005));
    }, 1200);

    let logId = 0;
    const logInterval = setInterval(() => {
      const messages = [
        "EXEC :: Worker #42 assigned payload",
        "SYNC :: Verifying execution proof on Layer 2...",
        "MEM :: Flushed allocated VM block",
        "NET :: Heartbeat OK. Latency 12ms",
        "EXEC :: Sandboxed compute cycle 90% complete"
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, { 
          id: logId++, 
          text: randomMsg, 
          time: new Date().toISOString().split('T')[1].slice(0, 11)
        }];
        return newLogs.slice(-6); 
      });
    }, 2500);

    return () => {
      clearInterval(earnInterval);
      clearInterval(logInterval);
    };
  }, [address]);

  return (
    <main className="min-h-[85vh] p-6 lg:p-12 relative bg-black cursor-none">
      <motion.div
        variants={variants}
        animate="default"
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 flex items-center justify-center"
      />
      
      <div className="absolute inset-0 tech-pattern -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-white/20 pb-6 gap-4">
           <div>
             <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tighter">Control Center</h1>
             <p className="text-zinc-500 font-mono text-sm mt-2">Active Node Runtime Diagnostics</p>
           </div>
           
           <div className="border border-white/20 px-4 py-2 flex items-center gap-4 bg-zinc-950">
             <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-none bg-white animate-pulse" />
               <span className="text-xs font-mono uppercase tracking-widest text-white">Online</span>
             </div>
             <div className="w-px h-4 bg-white/20" />
             <span className="text-xs text-zinc-400 font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
           {/* Earning Card */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-black border border-white/20 p-8 lg:col-span-2 flex flex-col justify-between"
           >
              <div className="flex justify-between items-start mb-12">
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <ActivitySquare className="w-4 h-4 text-white" />
                  Yield Generated
                </h2>
                <div className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Live</div>
              </div>
              
              <div className="flex items-baseline gap-4">
                 <span className="text-6xl md:text-8xl font-display tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {earnedStrk.toFixed(6)}
                 </span>
                 <span className="text-xl md:text-3xl font-mono text-zinc-600">STRK</span>
              </div>
           </motion.div>

           {/* Hardware Status */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-black border border-white/20 p-8 flex flex-col justify-between"
           >
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-8 border-b border-white/10 pb-4">
                  Telemetry
                </h2>
                
                <div className="space-y-6 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-600">CPU Usage</span>
                      <span className="text-white">64.2%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-px">
                      <div className="bg-white h-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-600">Memory</span>
                      <span className="text-white">82.1%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-px">
                      <div className="bg-zinc-400 h-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-600">VRAM</span>
                      <span className="text-white">14.0%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-px">
                      <div className="bg-zinc-600 h-full" style={{ width: '14%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
           </motion.div>

           {/* Terminal Window */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-zinc-950 border border-white/20 lg:col-span-3 mt-6"
           >
              <div className="border-b border-white/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-zinc-600" />
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">daemon-stdout.log</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-zinc-800" />
                  <div className="w-2 h-2 bg-zinc-700" />
                  <div className="w-2 h-2 bg-zinc-600" />
                </div>
              </div>
              <div className="p-4 font-mono text-xs space-y-2 h-48 flex flex-col justify-end bg-black/50">
                {logs.map((log) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={log.id} 
                    className="flex"
                  >
                    <span className="text-zinc-600 mr-4 w-28 shrink-0">[{log.time}]</span>
                    <span className="text-zinc-300">{log.text}</span>
                  </motion.div>
                ))}
                <div className="flex text-zinc-600 animate-pulse mt-2">
                  <span className="mr-4 w-28 shrink-0">[{new Date().toISOString().split('T')[1].slice(0, 11)}]</span>
                  <span>waiting for dispatch _</span>
                </div>
              </div>
           </motion.div>
        </div>
      </div>
    </main>
  );
}
