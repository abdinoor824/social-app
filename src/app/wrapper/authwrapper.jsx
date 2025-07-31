"use client";

import { SessionProvider } from "next-auth/react";

export function AuthWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
