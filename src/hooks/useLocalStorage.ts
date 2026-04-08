import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Listen for changes from other components using the same key
  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === key) {
        try {
          const item = window.localStorage.getItem(key);
          if (item) setStoredValue(JSON.parse(item));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('local-storage-change', handleStorageChange);
    return () => window.removeEventListener('local-storage-change', handleStorageChange);
  }, [key]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Notify other components using the same key
      window.dispatchEvent(new CustomEvent('local-storage-change', { detail: { key } }));
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue] as const;
}
