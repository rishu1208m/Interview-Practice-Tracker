import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved === null) return initialValue;

      const parsed = JSON.parse(saved);

      return isValid(parsed) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
