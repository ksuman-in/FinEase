import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: Date) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}
