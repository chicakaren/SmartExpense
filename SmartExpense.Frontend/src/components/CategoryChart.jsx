import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart as PieIcon, Layers } from "lucide-react";

const COLORS = [
  "#10b981",
  "#4f46e5",
  "#06b6d4",
  "#f59e0b",
  "#ec4899",
  "#64748b",
];

const categoryNames = {
  1: "Alimentación",
  2: "Transporte",
  3: "Servicios",
  4: "Entretenimiento",
  5: "Salud",
  6: "Educación",
  7: "Compras",
  8: "Otros",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CategoryChart({ data = [] }) {
  const chartData = data.map((item, index) => {
    const name =
      item.category ||
      categoryNames[item.categoryId] ||
      `Categoría ${index + 1}`;

    const value = item.total || 0;

    return {
      name,
      value,
      color: item.color || COLORS[index % COLORS.length],
    };
  });

  const totalAmount = chartData.reduce(
    (acc, cur) => acc + cur.value,
    0
  );

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Gastos por Categoría
          </h2>

          <p className="text-[11px] text-slate-500 mt-0.5">
            Distribución del período
          </p>
        </div>

        <div className="p-1.5 bg-slate-50 text-slate-500 rounded-lg border border-slate-200/60">
          <Layers className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
      </div>

      {chartData.length === 0 || totalAmount === 0 ? (

        /* Empty State */
        <div className="flex flex-col items-center justify-center h-48 text-center p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
            <PieIcon className="w-5 h-5" strokeWidth={1.5} />
          </div>

          <p className="text-xs font-semibold text-slate-700">
            Sin datos de categorías
          </p>

          <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
            Registra gastos con categorías para visualizar la distribución.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">

          {/* Donut Chart */}
          <div className="sm:col-span-6 h-44 relative flex items-center justify-center">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={62}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(val) => formatCurrency(val)}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />

              </PieChart>
            </ResponsiveContainer>

            {/* Donut Inner Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">

              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                Total
              </span>

              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {formatCurrency(totalAmount)}
              </span>

            </div>
          </div>

          {/* Breakdown List */}
          <div className="sm:col-span-6 space-y-1.5 max-h-44 overflow-y-auto pr-1">

            {chartData.map((cat, idx) => {
              const pct =
                totalAmount > 0
                  ? ((cat.value / totalAmount) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[11px] px-1.5 py-1 rounded-md hover:bg-slate-50 transition-colors"
                >

                  <div className="flex items-center gap-1.5 min-w-0">

                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />

                    <span className="font-medium text-slate-700 truncate">
                      {cat.name}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 shrink-0">

                    <span className="text-slate-400">
                      {pct}%
                    </span>

                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(cat.value)}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}
    </div>
  );
}