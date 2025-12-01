'use client'; 

import { createContext, useContext, useState } from 'react';


const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [orders, setOrders] = useState([]);
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