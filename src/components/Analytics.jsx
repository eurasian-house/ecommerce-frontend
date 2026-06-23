import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "../lib/analytics";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(
      location.pathname +
        location.search +
        location.hash
    );
  }, [location]);

  return null;
}