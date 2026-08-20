import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-lg border border-slate-800 space-y-1">
        <p className="font-semibold text-slate-300 border-b border-slate-800 pb-1 mb-1">{label}</p>
        <div className="flex items-center justify-between gap-4 text-emerald-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ingresos:
          </span>
          <span className="font-bold tabular-nums">{formatCurrency(payload[0].value)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-200">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Gastos:
          </span>
          <span className="font-bold tabular-nums">{formatCurrency(payload[1].value)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function CashFlowChart({ data }) {
  const chartData = data && data.length > 0 ? data : [
    { month: "Mar", ingresos: 4800, gastos: 2100 },
    { month: "Abr", ingresos: 5100, gastos: 2400 },
    { month: "May", ingresos: 4900, gastos: 1950 },
    { month: "Jun", ingresos: 5300, gastos: 2600 },
    { month: "Jul", ingresos: 5200, gastos: 2300 },
    { month: "Ago", ingresos: 5400, gastos: 2180 },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Flujo de Caja</h2>
          <p className="text-xs text-slate-500 mt-0.5">Comparativa mensual de ingresos y gastos</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Ingresos</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>Gastos</span>
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="#059669"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIngresos)"
            />

            <Area
              type="monotone"
              dataKey="gastos"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorGastos)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
