import { useCallback, useEffect, useRef, useState } from 'react';
import { Notification } from '../types';

const AUTO_DISMISS_MS = 4000;

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addNotification = useCallback(
    (message: string, type: Notification['type'] = 'info') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setNotifications((prev) => [...prev, { id, message, type }]);
      const timer = setTimeout(() => removeNotification(id), AUTO_DISMISS_MS);
      timersRef.current.set(id, timer);
    },
    [removeNotification],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return { notifications, addNotification, removeNotification };
}
