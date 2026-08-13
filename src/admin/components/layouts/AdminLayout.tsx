import { useState } from "react";
import { Outlet } from "react-router-dom";

import { AdminSidebar } from "./AdminSideBar";
import { AdminTopBar } from "./AdminTopBar";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {/* Overlay */}
        <div
          onClick={() => setSidebarOpen(false)}
          className={`
            fixed inset-0 z-40 bg-black/40
            transition-opacity duration-300
            ${
              sidebarOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        />

        {/* Sidebar */}
        <div
          className={`
            fixed left-0 top-0 z-50 h-screen
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopBar toggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 py-5  md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
