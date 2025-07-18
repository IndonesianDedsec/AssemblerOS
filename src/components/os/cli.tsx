"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Input } from "../ui/input";

type HistoryItem = {
  type: "input" | "output" | "error";
  content: string;
};

export function Cli() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: "output",
      content: "Welcome to AssemblerOS. Type 'help' for a list of commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = (command: string): HistoryItem => {
    const [cmd, ...args] = command.trim().split(" ");
    switch (cmd.toLowerCase()) {
      case "help":
        return {
          type: "output",
          content:
            "Available commands: help, clear, date, echo [text], whoami, ls, memstat, ps",
        };
      case "date":
        return { type: "output", content: new Date().toString() };
      case "echo":
        return { type: "output", content: args.join(" ") || "" };
      case "whoami":
        return { type: "output", content: "guest" };
      case "ls":
        return { type: "output", content: "core/\nservices/\ndrivers/" };
      case "memstat":
        return {
          type: "output",
          content: "Memory Usage: 12.3 / 64.0 MB (19.2%)",
        };
      case "ps":
        return {
          type: "output",
          content:
            "PID\tPROCESS\n1\tkernel.sys\n2\tcli.exe\n3\tdev_driver.sys\n4\tmem_manager.dll\n5\ttask_scheduler.exe",
        };
      case "":
        return { type: "output", content: "" };
      default:
        return { type: "error", content: `command not found: ${cmd}` };
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim();

      if (command.toLowerCase() === "clear") {
        setHistory([]);
      } else {
        const newHistory: HistoryItem[] = [
          ...history,
          { type: "input", content: command },
        ];
        const output = processCommand(command);
        if (output.content) {
          newHistory.push(output);
        }
        setHistory(newHistory);
      }

      setInput("");
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="h-full flex-grow p-4 font-mono text-sm overflow-y-auto"
      onClick={handleClick}
      ref={historyRef}
    >
      <div className="flex flex-col">
        {history.map((item, index) => (
          <div key={index}>
            {item.type === "input" && (
              <div>
                <span className="text-accent">~$&nbsp;</span>
                <span>{item.content}</span>
              </div>
            )}
            {item.type === "output" && (
              <pre className="whitespace-pre-wrap text-foreground">
                {item.content}
              </pre>
            )}
            {item.type === "error" && (
              <p className="text-destructive">{item.content}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-accent">~$&nbsp;</span>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto flex-grow"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
