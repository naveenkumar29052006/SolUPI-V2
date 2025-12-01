'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  user: any;
  setUser: (user: any) => void;
  orders: any[];
  setOrders: (orders: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, orders, setOrders, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
