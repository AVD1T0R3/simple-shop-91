import React, { createContext, useContext, ReactNode } from 'react';
import { useStore } from '@/hooks/useStore';

// Create context with store hook return type
type StoreContextType = ReturnType<typeof useStore>;

const StoreContext = createContext<StoreContextType | null>(null);

// Provider component wraps app with store state
export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access store context
export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within StoreProvider');
  }
  return context;
}
