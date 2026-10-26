import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MenuContext = createContext(null);

/**
 * Loads /menu.json once for the whole app.
 * status: "loading" | "ready" | "error"
 */
export function MenuProvider({ children }) {
  const [state, setState] = useState({ status: "loading", data: null, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      setState({ status: "loading", data: null, error: "" });
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}menu.json`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`The menu file could not be loaded (status ${response.status}).`);
        }
        const data = await response.json();
        if (!data || !Array.isArray(data.items)) {
          throw new Error("The menu file is not in the expected format.");
        }
        setState({ status: "ready", data, error: "" });
      } catch (err) {
        if (err.name === "AbortError") return;
        setState({
          status: "error",
          data: null,
          error: err.message || "Something went wrong while loading the menu.",
        });
      }
    }

    loadMenu();
    return () => controller.abort();
  }, [attempt]);

  const value = useMemo(
    () => ({
      status: state.status,
      error: state.error,
      items: state.data?.items ?? [],
      currency: state.data?.currency ?? "Rs",
      canteen: state.data?.canteen ?? "Campus Canteen",
      retry: () => setAttempt((n) => n + 1),
    }),
    [state]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside <MenuProvider>");
  return ctx;
}
