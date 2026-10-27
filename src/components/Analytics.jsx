import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  initGA,
  trackPageView,
  trackVisitorEvent,
} from "../lib/analytics";

export default function Analytics() {
  const location = useLocation();
  const previousPage = useRef(null);
  const pageEnteredAt = useRef(Date.now());

  const path =
    location.pathname +
    location.search +
    location.hash;

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    // Do not record admin navigation as customer activity.
    if (
      location.pathname === "/admin" ||
      location.pathname.startsWith("/admin/")
    ) {
      previousPage.current = null;
      pageEnteredAt.current = Date.now();
      return;
    }

    const now = Date.now();
    const previous = previousPage.current;

    if (previous && previous.path !== path) {
      trackVisitorEvent(
        "page_exit",
        {
          timeSpentSeconds: Math.max(
            0,
            Math.round((now - pageEnteredAt.current) / 1000)
          ),
        },
        previous.path
      );
    }

    trackPageView(path);

    // Track only when the page path changes.
    if (!previous || previous.path !== path) {
      trackVisitorEvent(
        "page_view",
        {},
        location.pathname + location.search
      );

      previousPage.current = { path };
      pageEnteredAt.current = now;
    }
  }, [path, location.pathname]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const previous = previousPage.current;

        if (previous) {
          const elapsedSeconds = Math.max(
            0,
            Math.round((Date.now() - pageEnteredAt.current) / 1000)
          );

          trackVisitorEvent(
            "page_exit",
            { timeSpentSeconds: elapsedSeconds },
            previous.path
          );

          // Prevent the same page from being counted repeatedly
          // when the tab becomes hidden multiple times.
          pageEnteredAt.current = Date.now();
        }
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return null;
}