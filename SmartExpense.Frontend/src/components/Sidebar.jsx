import { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
  Menu,
  X,
  UserCheck
} from "lucide-react";

export default function Sidebar({ activeTab = "dashboard", setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transacciones", icon: Receipt },
    { id: "budgets", label: "Presupuestos", icon: PieChart },
    { id: "reports", label: "Reportes", icon: BarChart3 },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bar Top Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <TrendingUp className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">SmartExpense</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" strokeWidth={1.75} /> : <Menu className="w-6 h-6" strokeWidth={1.75} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Drawer Mobile */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200/80 z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              
              </div>
              <div>
                <span className="font-bold text-slate-900 text-lg tracking-tight block leading-none">SmartExpense</span>
                <span className="text-[11px] font-medium text-slate-400">Finance Manager</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
              Menu Principal
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (setActiveTab) setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-emerald-400" : "text-slate-400"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
              AM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">Usuario</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <UserCheck className="w-3 h-3 text-emerald-600" strokeWidth={2} />
                <span>Plan Pro</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
            <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
              <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Soporte</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-rose-600 transition-colors">
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
