import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let _isMobile: boolean | null = null;
export function isMobile(): boolean {
  if (_isMobile !== null) return _isMobile;
  if (typeof window === "undefined") return false;
  _isMobile = window.innerWidth < 768 || "ontouchstart" in window;
  return _isMobile;
}
