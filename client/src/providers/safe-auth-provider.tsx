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

  // Always render children, just with safe auth context
  return (
    <SafeAuthContext.Provider value={{ user: null, loading: !mounted }}>
      {children}
    </SafeAuthContext.Provider>
  );
}

export function useSafeAuth() {
  return useContext(SafeAuthContext);
}