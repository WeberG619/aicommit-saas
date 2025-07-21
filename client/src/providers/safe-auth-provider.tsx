'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SafeAuthContextType {
  user: any | null;
  loading: boolean;
}

const SafeAuthContext = createContext<SafeAuthContextType>({
  user: null,
  loading: false
});

export function SafeAuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render children until client-side mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <SafeAuthContext.Provider value={{ user: null, loading: false }}>
      {children}
    </SafeAuthContext.Provider>
  );
}

export function useSafeAuth() {
  return useContext(SafeAuthContext);
}