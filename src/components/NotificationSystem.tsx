import { motion, AnimatePresence } from 'motion/react';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

const icons = {
  info: <Info className="w-5 h-5 text-blue-400" />,
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
};

export default function NotificationSystem({ notifications, removeNotification }: NotificationSystemProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="glass p-4 rounded-lg shadow-xl flex items-center gap-3 min-w-[280px] max-w-md"
          >
            {icons[notif.type]}
            <p className="flex-1 text-sm font-medium">{notif.message}</p>
            <button
              onClick={() => removeNotification(notif.id)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 opacity-50 hover:opacity-100" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
