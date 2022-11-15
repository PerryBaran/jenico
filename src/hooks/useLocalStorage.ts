import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, fallBackValue: any) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) return fallBackValue;
    if (typeof fallBackValue === "number") return Number(JSON.parse(item));
    return JSON.parse(item)
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
