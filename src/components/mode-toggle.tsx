"use client";

import { cn } from "@/lib/utils";
import { Moon, Paintbrush, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  DropdownContent,
  DropdownHeader,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "./ui/dropdown-themes";
import { DropdownProvider } from "./dropdown-provider";

type ThemeType = {
  light: { name: string; color: string }[];
  dark: { name: string; color: string }[];
};

const themes: ThemeType = {
  light: [
    { name: "grays", color: "bg-zinc-100" },
    { name: "gold", color: "bg-yellow-300" },
    { name: "neon", color: "bg-pink-500" },
    { name: "sky", color: "bg-purple-400" },
    { name: "soft", color: "bg-gray-800" },
  ],
  dark: [
    { name: "grays", color: "bg-zinc-950" },
    { name: "gold", color: "bg-yellow-700" },
    { name: "neon", color: "bg-pink-600" },
    { name: "sky", color: "bg-purple-600" },
    { name: "soft", color: "bg-gray-300" },
  ],
};

export default function ModeToggle() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "";
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const handleModeChange = (newMode: "light" | "dark") => {
    const selectedTheme = theme?.split("-")[1];
    const newTheme = `${newMode}-${selectedTheme}`;
    setMode(newMode);
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <DropdownProvider>
      <DropdownTrigger className="border-border border-2 hover:border-4 px-2 py-3 hover:rounded-sm hover:bg-accent-foreground ">
        <Paintbrush className="text-accent " />
      </DropdownTrigger>
      <DropdownContent side="right" align="top">
        <DropdownHeader>Customize Theme</DropdownHeader>
        <DropdownLabel>Mode</DropdownLabel>
        <DropdownItem>
          <button
            className={cn(
              "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
              mode === "light" && "border-2 border-border"
            )}
            onClick={() => handleModeChange("light")}
          >
            <Sun className="w-5 h-5 shrink-0" />
            Light
          </button>
          <button
            className={cn(
              "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
              mode === "dark" && "border-2 border-border"
            )}
            onClick={() => handleModeChange("dark")}
          >
            <Moon className="w-5 h-5 shrink-0" />
            Dark
          </button>
        </DropdownItem>
        <DropdownLabel>Colors</DropdownLabel>
        <DropdownItem>
          {themes[mode as keyof ThemeType]?.map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => setTheme(mode + "-" + themeOption.name)}
              className={cn(
                "flex items-center gap-x-2 border border-muted py-1 px-2 rounded-md text-sm text-foreground hover:bg-background transition ease-in",

                theme === mode + "-" + themeOption.name &&
                  "border-2 border-border"
              )}
            >
              <div
                className={`w-4 h-4 rounded-full border shrink-0 ${themeOption.color}`}
              />
              {themeOption.name}
            </button>
          ))}
        </DropdownItem>
      </DropdownContent>
    </DropdownProvider>
  );
}