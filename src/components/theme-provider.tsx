"use client"
// se usa en el layout
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function CThemeProvider({children, ...props }:ThemeProviderProps){
    return <ThemeProvider {...props}>
        {children}
    </ThemeProvider>
}