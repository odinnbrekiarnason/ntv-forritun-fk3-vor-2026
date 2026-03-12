import type { LinksFunction } from "@remix-run/node";
import {Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import appStyles from "./app.css?url";
import { createContext, useContext, useState } from "react";

export type Theme = 'light' | 'dark';
export const ThemeContext = createContext<Theme>('dark')

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
];

export function meta() {
  return [
    { title: "Remix Theme App" },
    { name: "description", content: "Simple Remix app with light and dark theme" },
  ];
}

export default function App() {
    const [theme, setTheme] = useState<Theme>('light')
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeContext.Provider value={theme}>
        <Meta />
        </ThemeContext.Provider>
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
