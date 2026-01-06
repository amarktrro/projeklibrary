"use client";

import React from "react";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f8fafc] text-slate-900 m-0 p-0">
        {/* Removed all margin-left and fixed widths to ensure full screen usage */}
        <div className="min-h-screen w-full">
          <main className="w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}