import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToEnum<T>(
  value: string,
  enumObj: T
): T[keyof T] | undefined {
  const enumValues = Object.values(enumObj as never);
  if (enumValues.includes(value)) {
    return value as T[keyof T];
  }
  return undefined;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
