"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const noop = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

let darkListeners: Array<() => void> = [];

function subscribeToDark(callback: () => void) {
  darkListeners.push(callback);
  return () => {
    darkListeners = darkListeners.filter((l) => l !== callback);
  };
}

function getDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getDarkServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const mounted = useIsMounted();
  const dark = useSyncExternalStore(
    subscribeToDark,
    getDarkSnapshot,
    getDarkServerSnapshot,
  );

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    darkListeners.forEach((listener) => listener());
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/5"
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-foreground/5"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
