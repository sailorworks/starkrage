import type { Metadata } from "next";
import { Space_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { StarkzapProvider } from "@/providers/StarkzapProvider";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "STARKRAGE | Decentralized Private Cloud",
  description: "Monetize computational latency. Make money overnight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${space.variable} ${robotoMono.variable} font-sans bg-black text-white antialiased min-h-screen selection:bg-white selection:text-black flex flex-col`}>
        <StarkzapProvider>
          <div className="flex-grow">
            {children}
          </div>
          <footer className="w-full border-t border-white/10 py-8 px-6 mt-auto">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                   <span>StarkRage Network v1.0.0</span>
                </div>
                <div>
                   Decentralized Infrastructure Protocol
                </div>
                <div className="flex gap-6">
                   <a href="#" className="hover:text-white transition-colors">Documentation</a>
                   <a href="#" className="hover:text-white transition-colors">Terms</a>
                   <a href="#" className="hover:text-white transition-colors">Privacy</a>
                </div>
             </div>
          </footer>
        </StarkzapProvider>
      </body>
    </html>
  );
}
