import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, CheckCheck, Trash2 } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";

function Topbar() {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    settings,
  } = useWorkspace();

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/incidents?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-8">
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search incidents..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />
      </form>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm font-semibold text-red-400">LIVE</span>
        </div>

        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            className="relative rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition hover:border-blue-500/50"
            aria-label="Open notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {panelOpen && (
            <div className="absolute right-0 z-[9999] mt-3 w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#111B2E] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Notifications
                  </p>
                  <p className="text-xs text-slate-400">
                    {unreadCount} unread
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    title="Mark all read"
                  >
                    <CheckCheck size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={clearNotifications}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    title="Clear all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        markNotificationRead(item.id);
                        if (
                          item.kind === "incident" ||
                          item.kind === "dispatch"
                        ) {
                          navigate("/incidents");
                          setPanelOpen(false);
                        } else if (item.kind === "ai") {
                          navigate("/ai-decisions");
                          setPanelOpen(false);
                        }
                      }}
                      className={`block w-full border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5 ${
                        item.read ? "opacity-70" : "bg-blue-500/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {item.message}
                          </p>
                        </div>
                        {!item.read && (
                          <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500">
                        {item.time}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold">
            {settings.operatorCallsign.charAt(0).toUpperCase()}
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">{settings.operatorCallsign}</p>
            <p className="text-xs text-slate-400">{today}</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
