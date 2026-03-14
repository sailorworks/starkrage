# StarkRage 🛰️
**Decentralized Private Infrastructure Protocol**

StarkRage is a next-generation decentralized compute provider portal built on bare-metal logic and Starknet Layer 2 rollups. It allows anyone to monetize their idle computational latency by transforming local hardware into a trusted "decentralized private cloud" node—earning $STRK overnight.

## ✨ Core Features

- **Zero-Setup Hardware Audit**: Instantly auto-detects logical thread concurrency (CPU), available memory limits (RAM), and WebGL proxy renderer data (GPU) straight through the browser environment.
- **Frictionless Web3 Auth (Cartridge)**: Integrated with the `Starkzap` SDK utilizing `OnboardStrategy.Cartridge` for social login and passkeys, abstracting away complex wallet popups via session key policies.
- **Sandboxed Telemetry Dashboard**: A full mission-control data-center UI. Stream real-time synthetic daemon logs in a custom terminal, monitor active system utilization tracking (CPU/Memory/VRAM), and watch fractional STRK yield generate line-by-line.
- **Brutalist Monochromatic Aesthetic**: Built completely free of bloated drop-shadows or gradients. Exclusively utilizes sharp minimal borders, global Framer Motion tracking cursors, and raw typographic hierarchies (`Space Grotesk` & `Roboto Mono`).

## 🛠️ Architecture Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18)
- **Styling**: [Tailwind CSS v3/v4](https://tailwindcss.com/)
- **Animations Engine**: [Framer Motion](https://www.framer.com/motion/)
- **Wallet Provider Context**: [Starkzap SDK](https://docs.starknet.io/build/starkzap)
- **Iconography**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sailorworks/starkrage.git
cd starkrage
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the development build:
```bash
npm run dev
```

4. Launch the interface: Open [http://localhost:3000](http://localhost:3000).

## 🚦 Browser Security Warnings (Cartridge Network)
Due to advanced tracking protections established in secure browsers (Brave, Firefox Strict Mode), the Cartridge session controller may throw initialization errors due to third-party iframe cookie blocking.

**Developer Fix:** Disable "Strict Tracking Protection" or drop the Brave "Shields" for `localhost` / your deployment URL to allow the wallet to execute.
*Note: The repository ships with a mock fallback catch block. If strict tracking permanently prevents Cartridge initialization, the frontend gracefully handles the bypass so frontend evaluation can continue unhindered.*

## 📂 Project Structure

- `src/app/page.tsx`: Hero splash context
- `src/app/onboard/page.tsx`: The hardware scanning mechanism
- `src/app/dashboard/page.tsx`: Provider telemetry, diagnostics array, yield generation
- `src/providers/StarkzapProvider.tsx`: Global execution wrapper managing Starknet state

## 📜 Legal
Distributed under the MIT License.
