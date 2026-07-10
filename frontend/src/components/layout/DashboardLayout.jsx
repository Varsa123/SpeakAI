import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 z-50 h-full">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white"
          >
            <Menu size={28} />
          </button>

          <h2 className="text-lg font-bold text-white">
            🎤 SpeakAI
          </h2>

          {/* Empty div keeps title centered */}
          <div className="w-7"></div>
        </div>

        {/* Desktop Topbar */}
        <div className="hidden md:block">
          <Topbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;