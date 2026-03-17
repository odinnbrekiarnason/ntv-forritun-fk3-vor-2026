<<<<<<< HEAD
import type { LinksFunction } from "@remix-run/node";
import {Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import appStyles from "./app.css?url";
import { createContext, useContext, useState } from "react";

export type Theme = 'light' | 'dark';
export const ThemeContext = createContext<Theme>('dark')
=======
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
export const ThemeContext = createContext<Theme | null>(null);

import appStyles from './app.css?url';
>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStyles },
];

export function meta() {
  return [
    { title: 'Remix Theme App' },
    {
      name: 'description',
      content: 'Simple Remix app with light and dark theme',
    },
  ];
}

export default function App() {
<<<<<<< HEAD
    const [theme, setTheme] = useState<Theme>('light')
=======
  const [theme, setTheme] = useState<Theme>('light');
>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f
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
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
