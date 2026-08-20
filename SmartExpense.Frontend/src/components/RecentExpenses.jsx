import { useState } from "react";
import {
  Utensils,
  Car,
  Wifi,
  ShoppingBag,
  Activity,
  Briefcase,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
  Filter
} from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

const categoryIconMap = {
  Alimentación: Utensils,
  Transporte: Car,
  Servicios: Wifi,
  Compras: ShoppingBag,
  Salud: Activity,
  Ingresos: Briefcase,
  Otros: Receipt,
};

export default function RecentExpenses({ expenses = [] }) {
  const [filter, setFilter] = useState("all"); // 'all' | 'expense' | 'income'

  const filteredExpenses = expenses.filter((item) => {
    if (filter === "expense") return item.type === "expense" || !item.type;
    if (filter === "income") return item.type === "income";
    return true;
  });

  const recentList = [...filteredExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Transacciones Recientes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Historial detallado de movimientos</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-100/80 rounded-xl text-xs font-medium text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "all" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "hover:text-slate-900"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("expense")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "expense" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "hover:text-slate-900"
            }`}
          >
            Gastos
          </button>
          <button
            onClick={() => setFilter("income")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "income" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "hover:text-slate-900"
            }`}
          >
            Ingresos
          </button>
        </div>
      </div>

      {recentList.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Inbox className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-slate-700">No hay transacciones registradas</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            No se encontraron movimientos para el filtro seleccionado.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recentList.map((item) => {
            const isIncome = item.type === "income" || item.amount < 0;
            const IconComponent = categoryIconMap[item.category] || Receipt;
            const formattedDate = item.date
              ? new Date(item.date).toLocaleDateString("es-CO", { day: "numeric", month: "short" })
              : "Reciente";

            return (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50/70 px-2 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Category Circle Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                        : "bg-slate-100 text-slate-700 border-slate-200/60"
                    }`}
                  >
                    {item.merchantLogo ? (
                      <span className="text-base">{item.merchantLogo}</span>
                    ) : (
                      <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-slate-500">{item.category || "General"}</span>
                      <span className="text-slate-300 text-xs">•</span>
                      <span className="text-xs text-slate-400">{formattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Amount Right Aligned */}
                <div className="text-right shrink-0">
                  <div
                    className={`text-sm font-bold tabular-nums ${
                      isIncome ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {isIncome ? `+${formatCurrency(Math.abs(item.amount))}` : `-${formatCurrency(Math.abs(item.amount))}`}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                    {item.status || "Completado"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}