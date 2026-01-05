import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchElementSets() {
  const res = await fetch("/api/element-sets");
  if (!res.ok) {
    throw new Error("Failed to fetch element sets");
  }
  return res.json();
}
