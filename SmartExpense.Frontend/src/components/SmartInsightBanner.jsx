import { useState } from "react";
import { Sparkles, ArrowRight, X, TrendingUp } from "lucide-react";

export default function SmartInsightBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-8 shadow-sm border border-slate-800">
      {/* Background Accent Subtle Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shrink-0">
            <Sparkles className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800 uppercase">
                <TrendingUp className="w-3 h-3" strokeWidth={2} />
                Insight Inteligente
              </span>
              <span className="text-slate-400 text-xs font-normal">IA Financiera</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
              Has gastado un <strong className="font-semibold text-white">15% más en suscripciones</strong> respecto al mes anterior. Podrías optimizar aprox. <strong className="font-semibold text-emerald-300">$45.00/mes</strong> desactivando servicios recurrentes sin uso.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer"
            onClick={() => alert("Mostrando recomendaciones detalladas de optimización de suscripciones.")}
          >
            <span>Optimizar</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Descartar aviso"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
