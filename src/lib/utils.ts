import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// In development, use the proxy
export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? '/api' 
  : "https://jiran-webapi.onrender.com";

export type User = {
  userId: number;
  userLogin: string;
  password: string;
  name: string;
  titleId: number | null;
  nric: string;
  unitNumberId: number | null;
  email: string | null;
  mobileNo: string;
  homeNo: string | null;
  status: string;
  createdById: number | null;
  createdDate: string | null;
  roleId: number | null;
  role: string | null;
  systemId: number | null;
  system: string | null;
  title: string | null;
  unitNumber: string | null;
}; 