import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = "eurasian-scroll-positions";

function readPositions() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Save the current page's scroll position using its history key.
  useEffect(() => {
    const savePosition = () => {
      const positions = readPositions();

      positions[location.key] = window.scrollY;

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
      } catch {
        // Ignore storage errors.
      }
    };

    window.addEventListener("scroll", savePosition, { passive: true });
    window.addEventListener("pagehide", savePosition);

    return () => {
      savePosition();
      window.removeEventListener("scroll", savePosition);
      window.removeEventListener("pagehide", savePosition);
    };
  }, [location.key]);

  // New navigation starts at the top; Back/Forward restores the old position.
  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const positions = readPositions();
      const savedY = positions[location.key];

      window.scrollTo(0, typeof savedY === "number" ? savedY : 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, navigationType]);

  // Prevent the browser from competing with our scroll restoration.
  useEffect(() => {
    const previousSetting = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousSetting;
    };
  }, []);

  return null;
}