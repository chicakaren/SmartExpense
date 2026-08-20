import { useState } from "react";
import { Calendar, Plus, Search, ChevronDown, Filter } from "lucide-react";

export default function Header({ onOpenModal, selectedPeriod, setSelectedPeriod }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periods = [
    { id: "aug", label: "Este mes (Ago 2026)" },
    { id: "jul", label: "Mes anterior (Jul 2026)" },
    { id: "q3", label: "Tercer Trimestre (Q3)" },
    { id: "y2026", label: "Año 2026" },
  ];

  const currentPeriodLabel = periods.find((p) => p.id === selectedPeriod)?.label || "Este mes (Ago 2026)";

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-slate-200/80 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Hola
          </h1>
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full">
            Actualizado hoy
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
          Resumen ejecutivo de flujo de caja, gastos y salud financiera.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        {/* Search Bar / Quick Filter */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Buscar movimiento..."
            className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:border-slate-400 text-slate-800 placeholder-slate-400 w-44 transition-all shadow-2xs"
          />
        </div>

        {/* Date Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
            <span>{currentPeriodLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" strokeWidth={1.75} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 divide-y divide-slate-100">
              <div className="py-1">
                {periods.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (setSelectedPeriod) setSelectedPeriod(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedPeriod === p.id
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{p.label}</span>
                    {selectedPeriod === p.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA */}
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          <span>Nuevo Movimiento</span>
        </button>
      </div>
    </header>
  );
}
