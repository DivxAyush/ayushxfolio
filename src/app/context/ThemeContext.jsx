"use client";

import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  mode: "dark",
  toggleColorMode: () => {},
});

export function useAppTheme() {
  return useContext(ThemeContext);
}
