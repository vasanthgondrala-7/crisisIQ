import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#07111f] text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto bg-[var(--background)] px-8 py-6">

          <div className="mx-auto w-full max-w-[1600px]">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}

export default AppLayout;