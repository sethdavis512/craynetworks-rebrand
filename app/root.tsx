import type { CSSProperties } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { readTheme } from "./theme/theme-cookie.server";
import { DEFAULT_THEME_STATE, type ThemeState } from "./theme/theme-state";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeDrawer } from "./components/controls/ThemeDrawer";

export function loader({ request }: Route.LoaderArgs) {
  return { theme: readTheme(request) };
}

function channelStyle(theme: ThemeState): CSSProperties {
  return {
    "--primary-l": theme.accent.l,
    "--primary-c": theme.accent.c,
    "--primary-h": theme.accent.h,
    "--radius-base": `${theme.radius}rem`,
    "--spacing": `${theme.density}rem`,
  } as CSSProperties;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const theme = data?.theme ?? DEFAULT_THEME_STATE;
  return (
    <html lang="en" className={theme.mode === "dark" ? "dark" : undefined} style={channelStyle(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ThemeProvider initialState={loaderData.theme}>
      <Outlet />
      <ThemeDrawer />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1 className="text-2xl font-semibold text-ink">{message}</h1>
      <p className="mt-2 text-muted">{details}</p>
      {stack ? (
        <pre className="mt-4 w-full overflow-x-auto rounded-md border border-border bg-surface-2 p-4 font-mono text-sm">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
