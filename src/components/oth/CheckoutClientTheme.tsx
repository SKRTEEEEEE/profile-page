"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const CheckoutClientTheme = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Establecer el tema a "dark-soft" cada vez que se renderiza este componente
    setTheme("dark-soft");
  }, [setTheme]);

  return null; // Este componente no necesita renderizar nada
};

export default CheckoutClientTheme; 