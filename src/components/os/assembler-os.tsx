"use client";

import { useState } from "react";
import { Cli } from "./cli";
import { SystemStatus } from "./system-status";
import { BootSequence } from "./boot-sequence";
import { Terminal } from "lucide-react";

export function AssemblerOs() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = () => {
    setBooted(true);
  };

  if (!booted) {
    return <BootSequence onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-background p-2 sm:p-4 gap-4">
      <div className="flex flex-col flex-grow bg-card border border-border rounded-lg shadow-lg overflow-hidden h-full">
        <header className="flex items-center gap-2 p-3 bg-secondary/80 text-secondary-foreground border-b border-border flex-shrink-0">
          <Terminal className="w-5 h-5" />
          <h1 className="text-base sm:text-lg font-semibold font-headline">
            AssemblerOS - CLI
          </h1>
        </header>
        <Cli />
      </div>
      <aside className="w-full lg:w-80 flex-shrink-0">
        <SystemStatus />
      </aside>
    </div>
  );
}
