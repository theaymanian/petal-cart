import { useState, useCallback, useEffect, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const isUpdating = useRef(false);

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === key && !isUpdating.current) {
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
      isUpdating.current = true;
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('local-storage-change', { detail: { key } }));
        isUpdating.current = false;
      }, 0);
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue] as const;
}
