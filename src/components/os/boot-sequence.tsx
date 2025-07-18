"use client";

import { useState, useEffect } from "react";

const bootMessages = [
  "AssemblerOS Bootloader v0.1 starting...",
  "Reading boot sector...",
  "Loading kernel 'kernel.sys' into memory at 0x7C00...",
  "Kernel loaded successfully.",
  "Initializing memory manager...",
  "Detecting hardware:",
  "  - CPU: Emulated x86_64",
  "  - Memory: 64MB Simulated RAM",
  "  - Display: Virtual Console",
  "  - Keyboard: Standard PS/2 Emulated",
  "Initializing Interrupt Descriptor Table (IDT)...",
  "Setting up interrupt handlers...",
  "  - IRQ1: Keyboard",
  "  - IRQ0: Timer",
  "Starting task scheduler...",
  "Mounting virtual file system...",
  "Starting core services:",
  "  - dev_driver.sys",
  "  - mem_manager.dll",
  "  - task_scheduler.exe",
  "Launching command interface 'cli.exe'...",
  "Boot sequence complete. Welcome to AssemblerOS.",
];

export function BootSequence({
  onBootComplete,
}: {
  onBootComplete: () => void;
}) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setVisibleMessages((prev) => [...prev, bootMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onBootComplete();
        }, 700);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="font-mono text-sm p-4 text-green-400 bg-black h-screen w-full fixed inset-0 z-50 overflow-y-auto">
      {visibleMessages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
      <div className="w-2 h-4 bg-green-400 animate-pulse ml-1 inline-block" />
    </div>
  );
}
