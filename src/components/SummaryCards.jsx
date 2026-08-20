import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank, CreditCard, TrendingUp } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const totalBalance = summary.totalBalance ?? 12450.00;
  const monthlyIncome = summary.monthlyIncome ?? 5400.00;
  const totalExpenses = summary.totalExpenses ?? 2180.50;
  const estimatedSavings = summary.estimatedSavings ?? (monthlyIncome - totalExpenses);
  const savingsRate = summary.savingsRate ?? ((estimatedSavings / monthlyIncome) * 100).toFixed(1);

  const cards = [
    {
      title: "Balance Total",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      badgeText: "+8.4%",
      isPositive: true,
      subtitle: "vs mes anterior",
      accentColor: "text-slate-900",
      bgIcon: "bg-slate-100 text-slate-700"
    },
    {
      title: "Ingresos del Mes",
      value: formatCurrency(monthlyIncome),
      icon: ArrowUpRight,
      badgeText: "+4.2%",
      isPositive: true,
      subtitle: "vs mes anterior",
      accentColor: "text-emerald-700",
      bgIcon: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Gastos del Mes",
      value: formatCurrency(totalExpenses),
      icon: CreditCard,
      badgeText: "-2.1%",
      isPositive: true, // gastos bajaron es positivo
      subtitle: "reducido este mes",
      accentColor: "text-slate-900",
      bgIcon: "bg-rose-50 text-rose-600"
    },
    {
      title: "Ahorro Estimado",
      value: formatCurrency(estimatedSavings),
      icon: PiggyBank,
      badgeText: `${savingsRate}% tasa`,
      isPositive: true,
      subtitle: "meta mensual superada",
      accentColor: "text-emerald-700",
      bgIcon: "bg-emerald-50 text-emerald-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${card.bgIcon} transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </div>
              </div>

              <div className={`text-2xl font-bold ${card.accentColor} tracking-tight tabular-nums`}>
                {card.value}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-normal">{card.subtitle}</span>
              <span
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  card.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-rose-50 text-rose-700 border border-rose-200/60"
                }`}
              >
                {card.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-emerald-600" strokeWidth={2} />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-rose-600" strokeWidth={2} />
                )}
                {card.badgeText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}