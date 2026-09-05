"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, duration: 1.5 }}>
      {/* Bypass the React 19 type clash */}
      {children as any}
    </ReactLenis>
  );
}