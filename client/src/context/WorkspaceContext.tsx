import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  kind: "incident" | "dispatch" | "system" | "ai";
};

export type AppSettings = {
  soundAlerts: boolean;
  autoDispatchSuggest: boolean;
  mapClustering: boolean;
  darkCommandTheme: boolean;
  refreshIntervalSec: number;
  operatorCallsign: string;
};

type WorkspaceContextType = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  notifications: AppNotification[];
  unreadCount: number;
  pushNotification: (
    title: string,
    message: string,
    kind?: AppNotification["kind"]
  ) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  settings: AppSettings;
  updateSettings: (patch: Partial<AppSettings>) => void;
};

const SETTINGS_KEY = "crisisiq.settings";

const defaultSettings: AppSettings = {
  soundAlerts: true,
  autoDispatchSuggest: true,
  mapClustering: false,
  darkCommandTheme: true,
  refreshIntervalSec: 5,
  operatorCallsign: "Admin",
};

const WorkspaceContext = createContext<
  WorkspaceContextType | undefined
>(undefined);

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "n1",
      title: "Critical Incident",
      message: "Industrial Fire reported in Hyderabad",
      time: "2 mins ago",
      read: false,
      kind: "incident",
    },
    {
      id: "n2",
      title: "AI Triage Complete",
      message: "Priority 98 assigned with 97% confidence",
      time: "4 mins ago",
      read: false,
      kind: "ai",
    },
    {
      id: "n3",
      title: "System Online",
      message: "CrisisIQ command center synchronized",
      time: "12 mins ago",
      read: true,
      kind: "system",
    },
  ]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const pushNotification = (
    title: string,
    message: string,
    kind: AppNotification["kind"] = "system"
  ) => {
    setNotifications((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        message,
        time: "Just now",
        read: false,
        kind,
      },
      ...prev,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <WorkspaceContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        notifications,
        unreadCount,
        pushNotification,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        settings,
        updateSettings,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside WorkspaceProvider"
    );
  }

  return context;
}
