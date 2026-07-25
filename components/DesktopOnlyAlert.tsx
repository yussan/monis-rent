"use client";

import { useEffect, useState } from "react";

export default function DesktopOnlyAlert() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isSmallScreen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 text-white flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
      <div className="max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-5 text-amber-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-white">Only Support for Desktop</h2>
        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
          This application is optimized for desktop displays. Please expand your browser or open on a device with a screen width of at least <span className="font-semibold text-white">1100px</span>.
        </p>
        <div className="px-3 py-1.5 bg-neutral-800 rounded-md border border-neutral-700 text-xs text-neutral-300 font-mono">
          Screen width &lt; 1100px
        </div>
      </div>
    </div>
  );
}
